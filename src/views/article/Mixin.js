import { confrim } from '@/utils/element'
export default {
  data() {
    return {
      contextmenuList: [{
        title: '重命名',
        icon: 'edit-outline',
        type: 'edit'
      }, {
        title: '删除目录',
        icon: 'folder-remove',
        type: 'folderRemove'
      }, {
        title: '新建文档',
        icon: 'document-add',
        type: 'documentAdd'
      }],
      contextmenuItemList: [{
        title: '重命名',
        icon: 'edit-outline',
        type: 'edit'
      }, {
        title: '删除文档',
        icon: 'document-remove',
        type: 'documentRemove'
      }],
      contextmenuIndex: 0,
      contextmenuItemIndex: 0
    }
  },
  methods: {
    /**
     *  右侧导航操作
     * @param {*} type 操作类型
     */
    handleOperat(type) {
      if (type === 'edit') this.handleResetTitle()
      if (type === 'documentAdd') {
        this.showDocumentAdd = true
        this.$refs.documentInput.focus
        this.menuData[this.contextmenuIndex].isAdd = true
      }
      if (type === 'documentRemove' || type === 'folderRemove') this.handleDeleteFile()
    },

    handleResetTitle() {
      this.resetTitle = this.isFolder
        ? this.menuData[this.contextmenuIndex].title
        : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title
      this.dialogVisible = true
    },

    handleDeleteFile() {
      const title = this.isFolder
        ? this.menuData[this.contextmenuIndex].title
        : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title
      const name = this.isFolder ? '目录' : '文档'
      confrim(this, { msg: '确认删除' + title + name + '?' }, () => {
        this.isFolder
          ? this.menuData.splice(this.contextmenuIndex, 1)
          : this.menuData[this.contextmenuIndex].children.splice(this.contextmenuItemIndex, 1)
        this.$message.success('删除成功')
      })
    }
  }
}
