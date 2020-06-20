<!-- 右侧面板 -->
<template>
  <div class="right-panel">
    <el-button
      v-show="!drawer"
      type="text"
      class="setting"
      icon="el-icon-setting"
      @click="openDrawer"
    />

    <el-drawer
      size="350px"
      :modal="false"
      title="文章信息配置"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="drawer-body">
        <p class="title">标题</p>
        <el-input v-model="form.name" placeholder="请输入文章标题" />
        <p class="title">摘要</p>
        <el-input
          v-model="form.region"
          placeholder="请输入摘要内容"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10}"
          maxlength="200"
          show-word-limit
        />
        <p class="title">标签</p>
        <div class="tag">
          <el-tag
            v-for="(tag, index) in dynamicTags"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleClose1(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
        </div>
      </div>
      <div class="footer-bottom">
        <el-button type="primary" class="save-btn">保 存</el-button>
      </div>

    </el-drawer>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    drawer: Boolean
  },
  data() {
    return {
      title: '',
      form: {},
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''

    }
  },

  computed: {},

  methods: {
    openDrawer() {
      this.$emit('on-open')
    },
    handleClose() {
      this.$emit('on-close')
    },
    handleClose1(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.setting{
    position: absolute;
    top: 8px;
    right: 210px;
    z-index: 9999;
    height: 26px;
    width: 28px;
    color: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        background-color: #EAEAEA;
        color: #333;
    }
}
.drawer-body{
    padding: 0 15px;
    .title{
        color: #888;
        font-size: 14px;
        padding: 2px 0;
    }

  .input-new-tag {
    width: 90px;
  }
}
.footer-bottom{
    position: absolute;
    bottom: 30px;
    right: 15px;
    left: 15px;
    .save-btn{
        width: 100%;
    }
}
>>> {
    .el-drawer__header{
        height: 60px;
        background-color: #545b63;
        color: #fff;
        align-items: center;
        padding: 0 20px;
        -moz-user-select:none;
                -webkit-user-select:none;
                -ms-user-select:none;
                -khtml-user-select:none;
                user-select:none;
        span, .el-drawer__close-btn{
            outline: none;
        }
    }
    .el-tag{
        margin-right: 5px;
        margin-top: 5px;
    }
    .button-new-tag{
        margin-left: 0!important;
        margin-top: 5px;
    }
    .el-tag+.el-tag{
        margin-left: 0!important;
    }
}
</style>
