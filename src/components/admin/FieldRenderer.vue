<!--
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <label class="field">
    {{ field.label }}

    <input
      v-if="field.type === 'text' || field.type === 'url'"
      :type="field.type"
      :value="modelValue"
      :required="field.required"
      :placeholder="field.placeholder"
      @input="$emit('update:model-value', $event.target.value)"
    />

    <textarea
      v-else-if="field.type === 'textarea'"
      :value="modelValue"
      :required="field.required"
      :placeholder="field.placeholder"
      rows="3"
      @input="$emit('update:model-value', $event.target.value)"
    ></textarea>

    <input
      v-else-if="field.type === 'list'"
      type="text"
      :value="listInput"
      :placeholder="field.placeholder || 'Comma separated values'"
      @input="$emit('update:list-input', $event.target.value)"
    />

    <select
      v-else-if="field.type === 'select'"
      :value="modelValue"
      @change="$emit('update:model-value', $event.target.value)"
    >
      <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
    </select>

    <div v-if="field.type === 'url' && isImagePreview" class="url-preview">
      <img :src="modelValue" alt="Preview" />
    </div>
  </label>
</template>

<script>
export default {
  name: "FieldRenderer",

  props: {
    field: { type: Object, required: true },
    modelValue: { type: [String, Number], default: "" },
    listInput: { type: String, default: "" }
  },

  emits: ["update:model-value", "update:list-input"],

  computed: {
    isImagePreview() {
      return /\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(this.modelValue || "");
    }
  }
};
</script>

<style scoped>
.field {
  display: grid;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-secondary, #64748b);
}

.field input[type="text"],
.field input[type="url"],
.field textarea,
.field select {
  padding: 10px 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  color: var(--text, #0f172a);
  background: var(--surface, #ffffff);
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: var(--accent, #1a1a1a);
}

.field textarea {
  resize: vertical;
}

.url-preview {
  margin-top: 6px;
  max-width: 220px;
  max-height: 140px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border, #e2e8f0);
}

.url-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
