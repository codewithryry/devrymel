// Resizable / reorderable tiles (mobile homepage), like iOS / One UI quick settings:
// press and hold the grid (or tap Edit) to enter edit mode, tap a tile's handle
// to cycle its size (round icon → small → wide → tall → large).
//
// Changes are kept in memory while editing and saved when editing ends (Done).
// Visitors must follow on TikTok or Instagram once before their layout saves
// (honor system: the tap is trusted). The admin is never asked.
//
// Persistence (component sets `tileLayoutDocId`):
//  - Everyone can edit. A visitor's layout is saved on their own device only.
//  - The site admin's edits are saved to Firestore `layout/<id>` as the shared
//    default every visitor starts from (Firestore rules: admin-only writes).
//  - A visitor's own layout (if any) wins over the shared default.
// Without `tileLayoutDocId`, sizes are stored in this browser only.
//
// Edit mode lives on the root App ($root.tileEditMode) so the "Done" bar and
// every grid share it.
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { subscribeToDoc } from "@/services/contentService";

const SIZE_ORDER = ["icon", "sm", "wide", "tall", "lg"];
const FOLLOW_KEY = "tileFollowUnlocked";
const HOLD_MS = 500;

export default {
  data() {
    return {
      tileSizes: {},
      sharedTileLayout: null, // admin default from Firestore
      localTileLayout: null // this visitor's own layout (device only)
    };
  },

  computed: {
    tileEditing() {
      return !!this.$root.tileEditMode;
    },

    // Anyone can edit (visitors save on their device, the admin saves the shared default)
    canEditTiles() {
      return true;
    },

    localTileKey() {
      return `tileLayout:${this.tileLayoutDocId}`;
    }
  },

  created() {
    if (this.tileLayoutDocId) {
      try {
        const saved = JSON.parse(localStorage.getItem(this.localTileKey) || "null");
        if (saved && typeof saved === "object") this.localTileLayout = saved;
      } catch (e) {
        this.localTileLayout = null;
      }
      this.applyTileLayout();

      this.unsubscribeTileLayout = subscribeToDoc("layout", this.tileLayoutDocId, (data) => {
        this.sharedTileLayout = data || null;
        this.applyTileLayout();
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

  watch: {
    tileEditing(on) {
      if (!on) this.commitTileLayout();
    }
  },

  mounted() {
    window.addEventListener("tiles-reset", this.resetTileSizes);
    window.addEventListener("tiles-follow-result", this.onFollowGateResult);
  },

  beforeUnmount() {
    window.removeEventListener("tiles-reset", this.resetTileSizes);
    window.removeEventListener("tiles-follow-result", this.onFollowGateResult);
    clearTimeout(this.holdTimer);
    if (this.unsubscribeTileLayout) this.unsubscribeTileLayout();
  },

  methods: {
    // Visitor's own layout first, otherwise the admin's shared default
    applyTileLayout() {
      const source = (!this.$root.isSiteAdmin && this.localTileLayout) || this.sharedTileLayout || {};
      this.tileSizes = source.sizes || {};
      if ("tileOrder" in this.$data) {
        this.tileOrder = Array.isArray(source.order) ? source.order : [];
      }
    },

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
    },

    // Layout currently on screen vs. the saved one (local or shared)
    savedTileSource() {
      return (!this.$root.isSiteAdmin && this.localTileLayout) || this.sharedTileLayout || {};
    },

    tileLayoutChanged() {
      const saved = this.savedTileSource();
      const now = { order: this.tileOrder || [], sizes: this.tileSizes };
      const before = { order: Array.isArray(saved.order) ? saved.order : [], sizes: saved.sizes || {} };
      return JSON.stringify(now) !== JSON.stringify(before);
    },

    // Editing finished: save, or ask a visitor to follow first
    commitTileLayout() {
      if (!this.tileLayoutDocId || !this.tileLayoutChanged()) return;

      if (this.$root.isSiteAdmin) {
        this.saveTileLayout();
        return;
      }

      let unlocked = false;
      try {
        unlocked = localStorage.getItem(FOLLOW_KEY) === "1";
      } catch (e) {
        unlocked = false;
      }

      if (unlocked) {
        this.saveTileLayout();
      } else {
        this.$root.followGateOpen = true;
      }
    },

    // Follow popup answered: save (followed) or throw the changes away (not now)
    onFollowGateResult(e) {
      if (e.detail === "followed") {
        try {
          localStorage.setItem(FOLLOW_KEY, "1");
        } catch (err) {
          // ignore
        }
        this.saveTileLayout();
      } else {
        this.applyTileLayout();
      }
    },

    // Admin: write the shared default to Firestore. Visitors: save on this device.
    async saveTileLayout() {
      if (this.tileLayoutDocId) {
        if (!this.$root.isSiteAdmin) {
          this.localTileLayout = { order: this.tileOrder || [], sizes: this.tileSizes };
          try {
            localStorage.setItem(this.localTileKey, JSON.stringify(this.localTileLayout));
          } catch (e) {
            // Storage blocked: the layout just won't persist on this device
          }
          return;
        }
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
      if (this.tileLayoutDocId) {
        // Visitor: drop their own layout and go back to the shared default
        if (!this.$root.isSiteAdmin) {
          this.localTileLayout = null;
          try {
            localStorage.removeItem(this.localTileKey);
          } catch (e) {
            // ignore
          }
          this.applyTileLayout();
          return;
        }
        // Admin: reset the shared default for everyone
        this.tileSizes = {};
        if ("tileOrder" in this.$data) this.tileOrder = [];
        this.saveTileLayout();
        return;
      }

      this.tileSizes = {};

      try {
        localStorage.removeItem(this.tileStorageKey);
      } catch (e) {
        // ignore
      }
    },

    // Long press anywhere on the grid enters edit mode (anyone)
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
