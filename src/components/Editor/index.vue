<template>
  <div id="editor">
    <mavon-editor v-model="content" style="height: 100%" />
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
  data() {
    return {
      content: ''
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(val) {
        console.log(val)
      }
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
