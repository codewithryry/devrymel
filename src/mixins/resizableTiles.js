// Resizable / reorderable tiles (mobile homepage), like iOS / One UI quick settings:
// press and hold the grid to enter edit mode, tap a tile's handle to cycle its
// size (small → wide → tall → large).
//
// Two persistence modes:
//  - Shared (component sets `tileLayoutDocId`): the layout lives in Firestore
//    `layout/<id>`, every visitor sees it, and ONLY the site admin can edit
//    ($root.isSiteAdmin). Firestore rules also block writes from anyone else.
//  - Local (no `tileLayoutDocId`): sizes are stored in this browser only.
//
// Edit mode lives on the root App ($root.tileEditMode) so the "Done" bar and
// every grid share it.
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { subscribeToDoc } from "@/services/contentService";

const SIZE_ORDER = ["sm", "wide", "tall", "lg"];
const HOLD_MS = 500;

export default {
  data() {
    return {
      tileSizes: {}
    };
  },

  computed: {
    tileEditing() {
      return !!this.$root.tileEditMode;
    },

    // Shared layouts can only be edited by the signed-in site admin
    canEditTiles() {
      return this.tileLayoutDocId ? !!this.$root.isSiteAdmin : true;
    }
  },

  created() {
    if (this.tileLayoutDocId) {
      this.unsubscribeTileLayout = subscribeToDoc("layout", this.tileLayoutDocId, (data) => {
        this.tileSizes = (data && data.sizes) || {};
        if ("tileOrder" in this.$data) {
          this.tileOrder = (data && Array.isArray(data.order) && data.order) || [];
        }
      });
      return;
    }

    try {
      const saved = localStorage.getItem(this.tileStorageKey);
      if (saved) this.tileSizes = JSON.parse(saved) || {};
    } catch (e) {
      this.tileSizes = {};
    }
  },

  mounted() {
    window.addEventListener("tiles-reset", this.resetTileSizes);
  },

  beforeUnmount() {
    window.removeEventListener("tiles-reset", this.resetTileSizes);
    clearTimeout(this.holdTimer);
    if (this.unsubscribeTileLayout) this.unsubscribeTileLayout();
  },

  methods: {
    tileSize(id, def) {
      return this.tileSizes[id] || def;
    },

    tileClass(id, def) {
      return ["rt-tile", `rt-${this.tileSize(id, def)}`, { "rt-editing": this.tileEditing }];
    },

    cycleTileSize(id, def) {
      const current = SIZE_ORDER.indexOf(this.tileSize(id, def));
      const next = SIZE_ORDER[(current + 1) % SIZE_ORDER.length];
      this.tileSizes = { ...this.tileSizes, [id]: next };
      this.saveTileLayout();
    },

    // Shared: write the whole layout (order + sizes) to Firestore. Local: browser storage.
    async saveTileLayout() {
      if (this.tileLayoutDocId) {
        if (!this.$root.isSiteAdmin) return;
        try {
          await setDoc(doc(db, "layout", this.tileLayoutDocId), {
            order: this.tileOrder || [],
            sizes: this.tileSizes,
            updatedAt: serverTimestamp()
          });
        } catch (e) {
          console.error("Save tile layout error:", e);
        }
        return;
      }

      try {
        localStorage.setItem(this.tileStorageKey, JSON.stringify(this.tileSizes));
      } catch (e) {
        // Storage blocked (private mode): sizes just won't persist
      }
    },

    resetTileSizes() {
      this.tileSizes = {};
      if ("tileOrder" in this.$data) this.tileOrder = [];

      if (this.tileLayoutDocId) {
        this.saveTileLayout();
        return;
      }

      try {
        localStorage.removeItem(this.tileStorageKey);
      } catch (e) {
        // ignore
      }
    },

    // Long press anywhere on the grid enters edit mode (admin only for shared layouts)
    startTileHold() {
      if (this.tileEditing || !this.canEditTiles) return;
      clearTimeout(this.holdTimer);
      this.holdTimer = setTimeout(() => {
        this.$root.tileEditMode = true;
        this.justEnteredEdit = true;
        if (navigator.vibrate) navigator.vibrate(15);
      }, HOLD_MS);
    },

    cancelTileHold() {
      clearTimeout(this.holdTimer);
    },

    // While editing, taps on tiles don't open links (except the resize handle)
    guardTileClick(e) {
      if (this.justEnteredEdit) {
        this.justEnteredEdit = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (!this.tileEditing) return;
      if (e.target.closest && e.target.closest(".rt-handle")) return;
      e.preventDefault();
      e.stopPropagation();
    }
  }
};
