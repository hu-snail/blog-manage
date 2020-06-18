<!-- 文章新建表单 -->
<template>
  <div class="app-container">
    <Editor />
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {

  components: { Editor },

  data() {
    return {
      form: {},
      rules: {},
      value: ''
    }
  },

  computed: {},

  methods: {}
}
</script>
<style lang='scss' scoped>
.title-input{
    >>> .el-textarea__inner{
        border: none;
        font-weight: bolder;
        font-size: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e4e7ed;
    }
}
</style>
