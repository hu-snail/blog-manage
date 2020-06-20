<!--  -->
<template>
  <div class="search-container">
    <el-input
      v-model="title"
      v-focus
      placeholder="输入文章标题"
      suffix-icon="el-icon-search"
    />
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      update: function(el) {
        console.log(el)
        el.querySelector('input').focus()
      }
    }
  },
  components: {},
  data() {
    return {
      title: ''
    }
  },

  computed: {},

  methods: {}
}
</script>
<style lang='scss' scoped>

</style>
