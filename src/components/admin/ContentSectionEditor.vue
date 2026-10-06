<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <div class="section-editor">
    <header class="topbar">
      <div>
        <h1>{{ schema.label }}</h1>
        <p>{{ schema.singleton ? "Single record shown across your portfolio." : "Manage entries shown on your public portfolio." }}</p>
      </div>

      <div class="topbar-actions">
        <button
          v-if="!schema.singleton && !items.length && !loading && schema.legacyImport"
          class="ghost-btn"
          :disabled="importing"
          @click="importLegacy"
        >
          <i class="fas" :class="importing ? 'fa-spinner fa-spin' : 'fa-file-import'"></i>
          <span>{{ importing ? "Importing..." : "Import Existing Data" }}</span>
        </button>

        <button v-if="!schema.singleton" class="primary-btn" @click="openCreateForm">
          <i class="fas fa-plus"></i>
          Add Entry
        </button>
      </div>
    </header>

    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    <p v-if="statusMessage" class="status-text">{{ statusMessage }}</p>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      Loading...
    </div>

    <!-- Singleton form (e.g. Profile) -->
    <div v-else-if="schema.singleton" class="entry-form singleton-form">
      <FieldRenderer
        v-for="field in schema.fields"
        :key="field.key"
        :field="field"
        :model-value="form[field.key]"
        :list-input="listInputs[field.key]"
        @update:model-value="(value) => (form[field.key] = value)"
        @update:list-input="(value) => (listInputs[field.key] = value)"
      />

      <div class="modal-actions">
        <button class="primary-btn" :disabled="saving" @click="saveSingleton">
          <i v-if="saving" class="fas fa-spinner fa-spin"></i>
          <span>{{ saving ? "Saving..." : "Save Changes" }}</span>
        </button>
      </div>
    </div>

    <template v-else>
      <div v-if="!items.length" class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>No entries yet. Add your first one.</p>
      </div>

      <div v-else class="entry-list">
        <article
          v-for="(item, index) in items"
          :key="item.id"
          class="entry-row"
          draggable="true"
          :class="{ dragging: dragIndex === index }"
          @dragstart="onDragStart(index)"
          @dragover.prevent="onDragOver(index)"
          @drop.prevent="onDrop"
          @dragend="onDragEnd"
        >
          <div class="drag-handle">
            <i class="fas fa-grip-vertical"></i>
          </div>

          <div class="entry-meta">
            <h3>
              <i v-if="item.icon" :class="item.icon" class="entry-icon"></i>
              {{ entryTitle(item) || "Untitled" }}
            </h3>
            <p>{{ entrySubtext(item) }}</p>
          </div>

          <div class="entry-actions">
            <button class="icon-btn" title="Edit" @click="openEditForm(item)">
              <i class="fas fa-pen"></i>
            </button>

            <button class="icon-btn danger" title="Delete" @click="confirmDelete(item)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </article>
      </div>
    </template>

    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal-box">
        <div class="modal-head">
          <h2>{{ editingId ? "Edit Entry" : "New Entry" }}</h2>
          <button class="icon-btn" @click="closeForm">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="entry-form">
          <FieldRenderer
            v-for="field in schema.fields"
            :key="field.key"
            :field="field"
            :model-value="form[field.key]"
            :list-input="listInputs[field.key]"
            @update:model-value="(value) => (form[field.key] = value)"
            @update:list-input="(value) => (listInputs[field.key] = value)"
          />

          <p v-if="formError" class="error-text">{{ formError }}</p>

          <div class="modal-actions">
            <button type="button" class="ghost-btn" @click="closeForm">Cancel</button>
            <button type="button" class="primary-btn" :disabled="saving" @click="saveEntry">
              <i v-if="saving" class="fas fa-spinner fa-spin"></i>
              <span>{{ saving ? "Saving..." : "Save Entry" }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSectionSchema } from "@/config/contentSchemas";
import {
  subscribeToCollection,
  subscribeToDoc,
  createItem,
  updateItem,
  deleteItem,
  reorderItems,
  setSingletonDoc
} from "@/services/contentService";
import FieldRenderer from "./FieldRenderer.vue";

function buildEmptyForm(fields) {
  const form = {};

  fields.forEach((field) => {
    form[field.key] = field.type === "select" ? (field.options?.[0] || "") : "";
  });

  return form;
}

export default {
  name: "ContentSectionEditor",

  components: { FieldRenderer },

  props: {
    sectionKey: { type: String, required: true }
  },

  data() {
    return {
      loading: false,
      items: [],
      unsubscribe: null,

      dragIndex: null,
      importing: false,

      showForm: false,
      editingId: null,
      form: {},
      listInputs: {},
      formError: "",
      saving: false,

      errorMessage: "",
      statusMessage: ""
    };
  },

  computed: {
    schema() {
      return getSectionSchema(this.sectionKey) || { key: this.sectionKey, label: this.sectionKey, fields: [] };
    }
  },

  watch: {
    sectionKey: {
      immediate: true,
      handler() {
        this.reset();
        this.watchSection();
      }
    }
  },

  beforeUnmount() {
    this.stopWatching();
  },

  methods: {
    reset() {
      this.stopWatching();
      this.errorMessage = "";
      this.statusMessage = "";
      this.showForm = false;
      this.items = [];
      this.form = buildEmptyForm(this.schema.fields);
      this.listInputs = {};
    },

    watchSection() {
      this.loading = true;

      if (this.schema.singleton) {
        this.unsubscribe = subscribeToDoc(
          this.schema.key,
          this.schema.docId,
          (data) => {
            this.form = { ...buildEmptyForm(this.schema.fields), ...(data || {}) };
            this.loading = false;
          },
          () => {
            this.errorMessage = "Unable to load this section. Check Firestore rules.";
            this.loading = false;
          }
        );
        return;
      }

      this.unsubscribe = subscribeToCollection(
        this.schema.key,
        (items) => {
          this.items = items;
          this.loading = false;
        },
        () => {
          this.errorMessage = "Unable to load entries. Check Firestore rules.";
          this.loading = false;
        }
      );
    },

    stopWatching() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    },

    flashStatus(message) {
      this.statusMessage = message;
      setTimeout(() => {
        this.statusMessage = "";
      }, 2500);
    },

    textFields() {
      return this.schema.fields.filter((field) => field.key !== "icon");
    },

    entryTitle(item) {
      const firstField = this.textFields()[0];
      return firstField ? item[firstField.key] : "";
    },

    entrySubtext(item) {
      const secondField = this.textFields()[1];
      if (!secondField) return "";

      const value = item[secondField.key];
      if (Array.isArray(value)) return value.join(", ");

      return value || "";
    },

    openCreateForm() {
      this.editingId = null;
      this.form = buildEmptyForm(this.schema.fields);
      this.listInputs = {};
      this.formError = "";
      this.showForm = true;
    },

    openEditForm(item) {
      this.editingId = item.id;
      this.form = { ...buildEmptyForm(this.schema.fields), ...item };
      this.listInputs = {};

      this.schema.fields.forEach((field) => {
        if (field.type === "list") {
          this.listInputs[field.key] = (item[field.key] || []).join(", ");
        }
      });

      this.formError = "";
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
    },

    parseListInput(value) {
      return (value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    },

    buildPayload() {
      const payload = {};

      this.schema.fields.forEach((field) => {
        if (field.type === "list") {
          payload[field.key] = this.parseListInput(this.listInputs[field.key]);
        } else {
          payload[field.key] = this.form[field.key] || "";
        }
      });

      return payload;
    },

    async saveSingleton() {
      this.saving = true;
      this.errorMessage = "";

      try {
        const payload = this.buildPayload();
        await setSingletonDoc(this.schema.key, this.schema.docId, payload);
        this.flashStatus("Saved.");
      } catch (error) {
        console.error("Save singleton error:", error);
        this.errorMessage = "Unable to save. Check Firestore rules.";
      } finally {
        this.saving = false;
      }
    },

    async saveEntry() {
      this.formError = "";
      this.saving = true;

      try {
        const payload = this.buildPayload();

        if (this.editingId) {
          await updateItem(this.schema.key, this.editingId, payload);
        } else {
          const docRef = await createItem(this.schema.key, payload, 0);
          await reorderItems(this.schema.key, [{ id: docRef.id }, ...this.items]);
        }

        this.showForm = false;
        this.flashStatus("Entry saved.");
      } catch (error) {
        console.error("Save entry error:", error);
        this.formError = "Unable to save entry. Check Firestore rules.";
      } finally {
        this.saving = false;
      }
    },

    async confirmDelete(item) {
      const confirmed = window.confirm("Delete this entry? This cannot be undone.");
      if (!confirmed) return;

      try {
        await deleteItem(this.schema.key, item.id);
        this.flashStatus("Entry deleted.");
      } catch (error) {
        console.error("Delete entry error:", error);
        this.errorMessage = "Unable to delete entry.";
      }
    },

    async importLegacy() {
      if (!this.schema.legacyImport) return;

      const confirmed = window.confirm(`Import existing ${this.schema.label} data into Firestore?`);
      if (!confirmed) return;

      this.importing = true;
      this.errorMessage = "";

      try {
        const module = await this.schema.legacyImport();
        const legacyItems = module.default || module;
        const list = Array.isArray(legacyItems) ? legacyItems : [legacyItems];

        for (let index = 0; index < list.length; index += 1) {
          const legacy = list[index];
          const payload = {};

          this.schema.fields.forEach((field) => {
            if (field.type === "list") {
              payload[field.key] = legacy[field.key] || [];
            } else {
              payload[field.key] = legacy[field.key] || "";
            }
          });

          await createItem(this.schema.key, payload, index);
        }

        this.flashStatus("Existing data imported.");
      } catch (error) {
        console.error("Import legacy data error:", error);
        this.errorMessage = "Unable to import existing data.";
      } finally {
        this.importing = false;
      }
    },

    onDragStart(index) {
      this.dragIndex = index;
    },

    onDragOver(index) {
      if (this.dragIndex === null || this.dragIndex === index) return;

      const reordered = [...this.items];
      const [moved] = reordered.splice(this.dragIndex, 1);
      reordered.splice(index, 0, moved);

      this.items = reordered;
      this.dragIndex = index;
    },

    async onDrop() {
      try {
        await reorderItems(this.schema.key, this.items);
      } catch (error) {
        console.error("Reorder items error:", error);
        this.errorMessage = "Unable to save new order.";
      }
    },

    onDragEnd() {
      this.dragIndex = null;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.topbar h1 {
  margin: 0;
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  letter-spacing: -0.02em;
}

.topbar p {
  margin: 6px 0 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.85rem;
}

.topbar-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.primary-btn,
.ghost-btn,
.icon-btn {
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  font-family: inherit;
}

.primary-btn {
  padding: 11px 18px;
  color: var(--bg, #fafaf8);
  background: var(--accent, #1a1a1a);
  font-size: 0.85rem;
}

.primary-btn:hover {
  opacity: 0.85;
}

.entry-icon {
  width: 18px;
  margin-right: 6px;
  color: var(--text-muted, #8a9099);
  font-size: 0.85em;
  text-align: center;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.ghost-btn {
  padding: 11px 16px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  font-size: 0.85rem;
}

.ghost-btn:hover {
  background: var(--surface-hover, #f1f5f9);
}

.ghost-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status-text {
  margin: 0 0 14px;
  padding: 10px 14px;
  border-radius: 12px;
  color: #15803d;
  background: rgba(34, 197, 94, 0.12);
  font-size: 0.85rem;
}

.error-text {
  margin: 0 0 14px;
  color: #dc2626;
  line-height: 1.5;
  font-size: 0.85rem;
}

.loading-state,
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  min-height: 200px;
  padding: 40px 20px;
  color: var(--text-secondary, #64748b);
  font-size: 0.9rem;
  text-align: center;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
}

.empty-state i {
  font-size: 2rem;
  opacity: 0.4;
}

.entry-list {
  display: grid;
  gap: 10px;
}

.entry-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-sm, 0 1px 2px rgb(15 23 42 / 0.06));
  cursor: grab;
}

.entry-row.dragging {
  opacity: 0.5;
}

.drag-handle {
  color: var(--text-muted, #94a3b8);
  text-align: center;
}

.entry-meta {
  min-width: 0;
}

.entry-meta h3 {
  margin: 0 0 4px;
  font-size: 0.95rem;
}

.entry-meta p {
  margin: 0;
  color: var(--text-secondary, #64748b);
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.entry-actions {
  display: flex;
  gap: 6px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--text-secondary, #64748b);
  background: var(--surface-hover, #f1f5f9);
  flex: 0 0 auto;
}

.icon-btn:hover {
  background: var(--border, #e2e8f0);
}

.icon-btn.danger:hover {
  color: #dc2626;
  background: rgba(239, 68, 68, 0.14);
}

.singleton-form {
  max-width: 480px;
  padding: 20px;
  border-radius: 16px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  display: grid;
  gap: 14px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(4px);
}

.modal-box {
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 20px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  box-shadow: var(--shadow-xl, 0 26px 70px rgb(15 23 42 / 0.22));
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.modal-head h2 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
}

.entry-form {
  display: grid;
  gap: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
}

@media (max-width: 560px) {
  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .topbar h1 {
    font-size: 1.4rem;
  }

  .topbar .primary-btn {
    width: 100%;
  }

  .modal-overlay {
    padding: 0;
    align-items: stretch;
  }

  .modal-box {
    max-width: none;
    max-height: none;
    height: 100%;
    border-radius: 0;
    border: none;
    padding: 18px 16px;
  }

  .modal-actions {
    position: sticky;
    bottom: -18px;
    padding: 12px 0 18px;
    background: var(--surface, #ffffff);
  }

  .modal-actions button {
    flex: 1;
  }

  .entry-row {
    grid-template-columns: 20px minmax(0, 1fr);
  }

  .entry-actions {
    grid-column: 1 / -1;
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>
