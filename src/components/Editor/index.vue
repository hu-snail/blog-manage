<template>
  <div id="editor">
    <mavon-editor
      v-model="content"
      style="height: 100%"
      @save="handleSave"
    />
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Editor',
  components: {
    mavonEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.content = val
      }
    }
  },
  methods: {
    handleSave(val, render) {
      this.$emit('input', val)
      this.$emit('on-save', render)
    }
  }
}
</script>
<style>
#editor {
    width: 100%;
    height: 90vh;
}
</style>
