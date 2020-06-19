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
                @click.native="handleSubMenu(index, item._id)"
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
                  @click.native="changeCatalogId(option.id)"
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
        <Editor
          v-show="catalogId"
          v-model="form.content"
          @on-save="handleSave"
        />
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
      <template v-for="(item, index) in contextmenuList">
        <contextmenu-item
          v-if="item.isShow"
          :key="index"
          @click="handleOperat(item.type)"
        >
          <i :class="'el-icon-' + item.icon" />
          {{ item.title }}
        </contextmenu-item>
      </template>
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
import { getArticle, articleAdd } from '@/api/article'
import {
  directive,
  Contextmenu,
  ContextmenuItem
} from 'v-contextmenu'
import CatalogMixin from './catalogMixin'
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
  mixins: [CatalogMixin],
  data() {
    return {
      list: null,
      left: 0,
      top: 0,
      openedIndex: ['0'],
      dialogVisible: false,
      resetTitle: '',
      menuData: [],
      form: {},
      catalogId: 0,
      pid: 0,
      listLoading: true,
      title: '',
      doucmentTitle: '',
      showAdd: false,
      showDocumentAdd: false,
      isFolder: true // 是否是一级菜单
    }
  },

  methods: {
    /**
     * 保存文档
     * @param {*} render HTML渲染数据
     */
    handleSave(render) {
      const renderContent = render
      if (this.form.content) this.articleAdd(renderContent)
      else this.$message.warning('请填写文档内容')
    },

    changeCatalogId(id) {
      this.catalogId = id
      this.getArticle()
    },

    /** 根据栏目id查询文档*/
    getArticle() {
      const catalogId = this.catalogId
      getArticle({ catalogId }).then(res => {
        this.form = res.data
      })
    },

    /**
     * 文档新增
     */
    articleAdd(renderContent) {
      const catalogId = this.catalogId
      const { content, _id } = this.form
      articleAdd({ catalogId, content, _id, renderContent }).then(res => {
        this.$message.success('保存文档成功')
        this.getArticle()
      }).catch(() => this.$message.error('保存文档失败'))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/article.scss';
</style>
