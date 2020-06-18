<template>
  <div class="app-container">
    <div class="content">
      <div class="left">
        <div class="add-folder">
          <el-button icon="el-icon-folder-add" type="text" @click="handleAddFolder">新建目录</el-button>
          <div v-show="showAdd" class="add-folder-content">
            <el-input
              v-model="title"
              v-focus
              @blur="handleBlurFolder"
              @keyup.enter.native="handleConfirm"
            />
          </div>
        </div>
        <div class="menu-list">
          <el-aside width="200px">
            <el-menu :default-openeds="openedIndex">
              <el-submenu
                v-for="(item, index) in menuData"
                :key="index"
                v-contextmenu:contextmenu
                :index="index.toString()"
                :class="{'no-data': !item.children.length}"
                @click.native="handleSubMenu(index)"
              >
                <div v-show="item.isAdd" class="add-document">
                  <el-input
                    ref="documentInput"
                    v-model="doucmentTitle"
                    v-focus
                    @blur="handleChangeDocument(index)"
                    @keyup.enter.native="handleChangeDocument(index)"
                  />
                </div>
                <template slot="title"><i class="el-icon-folder" />{{ item.title }}</template>
                <el-menu-item
                  v-for="(option, i) in item.children"
                  :key="i"
                  v-contextmenu:contextmenu2
                  :index="index.toString() + '-' + i.toString()"
                >
                  <i class="el-icon-document" />
                  {{ option.title }}.md
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
        </div>
      </div>
      <div class="right">
        <Editor />
      </div>
    </div>
    <el-dialog
      title="修改名称"
      :visible.sync="dialogVisible"
      width="350px"
    >
      <div class="dialog-body">
        <el-input v-model="resetTitle" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleUpadteTitle">确 定</el-button>
      </span>
    </el-dialog>
    <!--  contextmenu start -->
    <contextmenu ref="contextmenu" @contextmenu="contextmenuShow">
      <contextmenu-item
        v-for="(item, index) in contextmenuList"
        :key="index"
        @click="handleOperat(item.type)"
      >
        <i :class="'el-icon-' + item.icon" />
        {{ item.title }}
      </contextmenu-item>
    </contextmenu>
    <contextmenu ref="contextmenu2" @contextmenu="contextmenuShow2">
      <contextmenu-item
        v-for="(item, index) in contextmenuItemList"
        :key="index"
        @click="handleOperat(item.type)"
      >
        <i :class="'el-icon-' + item.icon" />
        {{ item.title }}
      </contextmenu-item>
    </contextmenu>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import {
  directive,
  Contextmenu,
  ContextmenuItem
} from 'v-contextmenu'
import MixinData from './Mixin'
export default {
  components: { Editor, Contextmenu, ContextmenuItem },
  directives: {
    contextmenu: directive,
    focus: {
      update: function(el) {
        el.querySelector('input').focus()
      }

    }
  },
  mixins: [MixinData],
  data() {
    return {
      list: null,
      left: 0,
      top: 0,
      openedIndex: ['0'],
      dialogVisible: false,
      resetTitle: '',
      menuData: [{
        title: 'Vue笔记',
        isAdd: false,
        children: [{
          title: 'watch'
        }, {
          title: 'mixin'
        }]
      }],
      listLoading: true,
      title: '',
      doucmentTitle: '',
      showAdd: false,
      showDocumentAdd: false,
      isFolder: true // 是否是一级菜单
    }
  },
  methods: {
    handleBlurFolder() {
      this.title = ''
      this.showAdd = false
    },
    handleSubMenu(index) {
      this.openedIndex = [index.toString()]
    },
    contextmenuShow(e) {
      this.isFolder = true
      event.preventDefault()
      event.cancelBubble = true
      this.contextmenuIndex = e.data.key
    },
    contextmenuShow2(e) {
      this.isFolder = false
      event.preventDefault()
      event.cancelBubble = true
      this.contextmenuItemIndex = e.data.key
    },
    handleAddFolder() {
      this.showAdd = true
    },
    handleConfirm() {
      if (this.title) {
        this.menuData.unshift({ title: this.title, isAdd: false, children: [] })
        this.title = ''
        this.showAdd = false
      }
    },
    handleCancel() {
      this.showAdd = false
      this.title = ''
    },
    handleChangeDocument(index) {
      if (this.doucmentTitle) {
        this.menuData[index].children.unshift({ title: this.doucmentTitle })
        this.menuData[index].isAdd = false
        this.doucmentTitle = ''
      } else this.menuData[index].isAdd = false
    },
    handleUpadteTitle() {
      this.isFolder
        ? this.menuData[this.contextmenuIndex].title = this.resetTitle
        : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title = this.resetTitle
      this.$message.success('修改成功')
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/article.scss';
</style>
