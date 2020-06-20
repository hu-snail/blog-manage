import { confrim } from '@/utils/element'
import {
  getCataLogList,
  addCataLog,
  catalogUpdateTitle,
  subCatalogUpdateTitle,
  catalogDelete,
  subcatalogDelete } from '@/api/catalog'

export default {
  data() {
    return {
      contextmenuList: [{
        title: '新建文档',
        icon: 'document-add',
        type: 'documentAdd',
        isShow: true
      }, {
        title: '重命名',
        icon: 'edit-outline',
        type: 'edit',
        isShow: true
      }, {
        title: '删除目录',
        icon: 'folder-remove',
        type: 'folderRemove',
        isShow: true
      }],
      contextmenuItemList: [{
        title: '重命名',
        icon: 'edit-outline',
        type: 'edit'
      }, {
        title: '删除文档',
        icon: 'document-remove',
        type: 'documentRemove'
      }, {
        title: '文章配置',
        icon: 'setting',
        type: 'Setting'
      }],
      contextmenuIndex: 0,
      contextmenuItemIndex: 0
    }
  },
  created() {
    this.getCataLogList()
  },
  methods: {

    /** 获取文档目录 */
    getCataLogList() {
      getCataLogList().then(res => {
        this.menuData = res.data.list
      })
    },

    /**
     *  右侧导航操作
     * @param {*} type 操作类型
     */
    handleOperat(type) {
      if (type === 'edit') this.handleResetTitle()
      if (type === 'documentAdd') {
        this.$refs['submenu-' + this.contextmenuIndex][0].$parent.open(this.contextmenuIndex)
        this.showDocumentAdd = true
        this.$refs.documentInput.focus
        this.menuData[this.contextmenuIndex].isAdd = true
      }
      if (type === 'documentRemove' || type === 'folderRemove') this.handleDeleteFile()
      if (type === 'Setting') this.drawer = true
    },

    /** 修改文档标题 */
    handleResetTitle() {
      console.log(this.contextmenuIndex, this.contextmenuIndex)
      this.resetTitle = this.isFolder
        ? this.menuData[this.contextmenuIndex].title
        : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title

      this.dialogVisible = true
    },

    /**
     * 删除目录
     * @param {*} isFolder true 一级目录 false 二级目录
     * */
    handleDeleteFile() {
      const title = this.isFolder
        ? this.menuData[this.contextmenuIndex].title
        : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title
      const name = this.isFolder ? '目录' : '文档'
      confrim(this, { msg: '确认删除' + title + name + '?' }, () => {
        this.deleteCatalog()
      })
    },

    deleteCatalog() {
      const _id = this.menuData[this.contextmenuIndex]._id
      let catalogId = ''
      if (!this.isFolder) catalogId = this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].id
      const apiName = this.isFolder ? catalogDelete({ _id }) : subcatalogDelete({ _id, catalogId })
      apiName.then(() => {
        this.isFolder
          ? this.menuData.splice(this.contextmenuIndex, 1)
          : this.menuData[this.contextmenuIndex].children.splice(this.contextmenuItemIndex, 1)
        this.$message.success('删除成功')
      }).catch(() => this.$message.error('删除失败'))
    },

    handleAddFolder() {
      this.showAdd = true
    },

    /** 新增一级目录 */
    handleConfirm() {
      if (this.title) {
        addCataLog({ title: this.title }).then(res => {
          this.getCataLogList()
          this.$message.success('新增成功')
        }).catch(() => this.$message.error('新增失败'))
        this.title = ''
        this.showAdd = false
      }
    },

    handleCancel() {
      this.showAdd = false
      this.title = ''
    },

    /** 新增二级目录 */
    handleChangeDocument(index) {
      if (this.doucmentTitle) {
        addCataLog({ id: this.menuData[index].id, title: this.doucmentTitle, pindex: index }).then(res => {
          this.active = index + '-' + 0
          this.getCataLogList()
          console.log(res.data)
          this.changeCatalogId(res.data)
          this.menuData[index].isAdd = false
          this.$message.success('新增成功')
        }).catch(() => this.$message.error('新增失败'))
        this.doucmentTitle = ''
      } else this.menuData[index].isAdd = false
    },

    /** 修改目录名称 */
    handleUpadteTitle() {
      if (this.isFolder) this.catalogUpdateTitle()
      else this.subCatalogUpdateTitle()
      this.dialogVisible = false
    },

    /** 修改一级目录名称 */
    catalogUpdateTitle() {
      const _id = this.pid
      catalogUpdateTitle({ _id, title: this.resetTitle }).then(res => {
        this.menuData[this.contextmenuIndex].title = this.resetTitle
        this.$message.success('修改成功')
      }).catch(() => this.$message.error('修改失败'))
    },

    /** 修改二级目录名称 */
    subCatalogUpdateTitle() {
      const _id = this.menuData[this.contextmenuIndex]._id
      const catalogId = this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].id
      const title = this.resetTitle
      subCatalogUpdateTitle({ _id, catalogId, title }).then(res => {
        this.isFolder
          ? this.menuData[this.contextmenuIndex].title = this.resetTitle
          : this.menuData[this.contextmenuIndex].children[this.contextmenuItemIndex].title = this.resetTitle
        this.$message.success('修改成功')
      }).catch(() => this.$message.error('修改失败'))
    },

    handleBlurFolder() {
      this.title = ''
      this.showAdd = false
    },

    /**
     * 一级目录右键菜单显示
     * @param {*} e 菜单选项
     */
    contextmenuShow(e) {
      this.isFolder = true
      event.preventDefault()
      event.cancelBubble = true
      this.contextmenuIndex = e.data.key
      this.pid = this.menuData[e.data.key]._id
      if (this.menuData[e.data.key].children.length) this.contextmenuList[2].isShow = false
      else this.contextmenuList[2].isShow = true
    },

    /**
     * 二级目录右键菜单显示
     * @param {*} e 菜单选项
     */
    contextmenuShow2(e) {
      this.isFolder = false
      event.preventDefault()
      event.cancelBubble = true
      this.contextmenuItemIndex = e.data.key
      this.contextmenuIndex = this.openedIndex = e.child.indexPath[0]
    },

    handleSubMenu(index, _id) {
      this.contextmenuIndex = this.openedIndex = index
    }
  }
}
