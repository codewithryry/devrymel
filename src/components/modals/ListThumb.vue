<template>
  <!-- Mini skeleton shape inside a list icon box: portrait page, landscape certificate, or website window -->
  <span class="list-thumb" :class="`list-thumb-${shape}`" aria-hidden="true">
    <span v-if="shape === 'website'" class="lt-bar"><i></i><i></i><i></i></span>
    <span class="lt-line"></span>
    <span class="lt-line lt-short"></span>
    <span v-if="shape !== 'website'" class="lt-line lt-tiny"></span>
  </span>
</template>

<script>
export default {
  name: 'ListThumb',
  props: {
    shape: {
      type: String,
      default: 'landscape',
      validator: (v) => ['portrait', 'landscape', 'website'].includes(v)
    }
  }
}
</script>

<style scoped>
.list-thumb {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 3px;
  border: 1.5px solid currentColor;
  border-radius: 3px;
  box-sizing: border-box;
}

.list-thumb-portrait {
  width: 16px;
  height: 21px;
}

.list-thumb-landscape {
  width: 22px;
  height: 16px;
}

.list-thumb-website {
  justify-content: flex-start;
  width: 22px;
  height: 17px;
  padding: 0 3px 3px;
}

.lt-bar {
  display: flex;
  gap: 1.5px;
  margin: 0 -3px 2px;
  padding: 1.5px 2px;
  border-bottom: 1.5px solid currentColor;
}

.lt-bar i {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: currentColor;
}

.lt-line {
  display: block;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  opacity: 0.85;
}

.lt-short {
  width: 70%;
}

.lt-tiny {
  width: 45%;
}
</style>
