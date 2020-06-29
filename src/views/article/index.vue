<!-- @author hujiangjun -->
<template>
  <div class="app-container">
    <div class="content">
      <div class="left">
        <div class="add-folder">
          <div v-show="showSearch" class="search-box">
            <i class="el-icon-back" @click="handleSearchBack" />
            <el-input
              v-model="keyword"
              v-focus
              placeholder="输入关键词后按回车"
              suffix-icon="el-icon-search"
              @keyup.enter.native="onSearch"
            />
          </div>
          <div v-show="!showSearch" class="folder-box">
            <el-button icon="el-icon-plus" type="text" @click="handleAddFolder">新建目录</el-button>
            <el-button icon="iconfont icon-nav-search" type="text" @click="handleSearch" />
          </div>
        </div>
        <div v-if="showSearch" class="search-list">
          <div v-if="searchList.length" class="search-item">
            共 "<span class="num">{{ searchList.length }}</span>"条结果
          </div>
          <div v-for="item in searchList" :key="item.id" class="search-item" @click.prevent="changeArticle(item)">
            <div class="search-item-title" v-html="item.title" />
            <div class="search-item-desc" v-html="item.gist" />
          </div>
          <div v-if="!searchList.length" class="search-item">
            无数据～
          </div>
        </div>
        <div v-show="!showSearch" class="menu-list">
          <div v-show="showAdd" class="add-folder-content">
            <el-input
              v-model="title"
              v-focus
              placeholder="请输入目录名称"
              @blur="handleBlurFolder"
              @keyup.enter.native="handleConfirm"
            />
          </div>
          <el-aside width="260px">
            <el-menu :default-active="active">
              <el-submenu
                v-for="(item, index) in menuData"
                :ref="'submenu-' + index"
                :key="index"
                v-contextmenu:contextmenu
                :index="index.toString()"
                :class="{'no-data': !item.children.length}"
                @click.native.prevent="handleSubMenu(index, item._id)"
              >
                <div v-show="item.isAdd" class="add-document">
                  <el-input
                    ref="documentInput"
                    v-model="doucmentTitle"
                    v-focus
                    placeholder="请输入文档名称"
                    @blur="handleChangeDocument(index)"
                    @keyup.enter.native="handleChangeDocument(index)"
                  />
                </div>

                <template slot="title"><i class="iconfont" :class="item.opened ? 'icon-folder-open' : 'icon-folder'" />{{ item.title }}</template>
                <el-menu-item
                  v-for="(option, i) in item.children"
                  :key="i"
                  v-contextmenu:contextmenu2
                  :index="index.toString() + '-' + i.toString()"
                  @click.native.stop="changeCatalogId(option.id)"
                >
                  <i class="iconfont icon-financial_markdown" />
                  {{ option.title }}.md
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
        </div>
      </div>
      <div class="right">
        <v-ditor
          v-model="form.content"
          :content="form.content"
          @on-save="handleSaveDocument"
        />
        <RightPanel
          :form="form"
          :drawer="drawer"
          @on-save="handleSave"
          @on-open="drawer = true"
          @on-close="drawer = false"
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
    <el-dialog
      title="导出文档"
      :visible.sync="exportDialog"
      width="350px"
    >
      <div class="dialog-body">
        <div class="export-btn">
          <div class="item">
            <i class="iconfont icon-download" />
            <p class="text">Markdown</p>
          </div>
          <div class="item">
            <i class="iconfont icon-pdf" />
            <p class="text">PDF</p>
          </div>
          <div class="item">
            <i class="iconfont icon-html" />
            <p class="text">HTML</p>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--  contextmenu start -->
    <contextmenu ref="contextmenu" theme="dark" @contextmenu="contextmenuShow">
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
    <contextmenu ref="contextmenu2" theme="dark" @contextmenu="contextmenuShow2">
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
// import Editor from '@/components/Editor'
import VDitor from '@/components/VDitor/index.vue'
import { getArticle, articleAdd, searchArticles } from '@/api/article'
import {
  directive,
  Contextmenu,
  ContextmenuItem
} from 'v-contextmenu'
import CatalogMixin from './catalogMixin'
import RightPanel from './components/RightPanel'
export default {
  name: 'Article',
  components: {
    // Editor,
    Contextmenu,
    ContextmenuItem,
    RightPanel,
    VDitor
  },
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
      active: '0-0',
      openedIndex: 0,
      dialogVisible: false,
      exportDialog: false,
      resetTitle: '',
      menuData: [],
      searchList: [],
      form: {
        tags: []
      },
      catalogId: 0,
      pid: 0,
      listLoading: true,
      title: '',
      doucmentTitle: '',
      keyword: '',
      showAdd: false,
      showDocumentAdd: false,
      showSearch: false,
      drawer: false,
      isFolder: true // 是否是一级菜单
    }
  },

  methods: {
    handleSaveDocument(content, renderContent) {
      this.articleAdd(content, renderContent)
    },
    onSearch() {
      this.searchList = []
      searchArticles({ keyword: this.keyword }).then(res => {
        res.data.forEach(item => {
          const reg = new RegExp(`${this.keyword}`, 'gi')
          if (item.title) item.title = item.title.replace(reg, `<span class="hight-value">${this.keyword}</span>`)
          if (item.gist) {
            item.gist = item.gist.replace(reg, `<span class="hight-value">${this.keyword}</span>`)
          }
          this.searchList.push(item)
        })
      })
    },
    handleSearchBack() {
      this.searchList = []
      this.showSearch = false
      this.keyword = ''
    },
    handleSearch() {
      this.showSearch = true
    },
    /**
     * 保存文档
     * @param {*} render HTML渲染数据
     */
    handleSave(render) {
      const renderContent = render
      if (this.form.content) {
        if (this.form.title) this.articleAdd(renderContent)
        else {
          this.$message.warning('请完善文章配置信息')
          this.drawer = true
        }
      } else this.$message.warning('请填写文档内容')
    },

    changeCatalogId(id) {
      this.catalogId = id
      this.getArticle()
    },
    changeArticle(item) {
      this.form = item
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
    articleAdd(content, renderContent) {
      const catalogId = this.catalogId
      const { _id, title, tags, gist } = this.form
      articleAdd({ catalogId, content, _id, renderContent, title, tags, gist }).then(res => {
        this.drawer = false
      }).catch(() => this.$message.error('保存文档失败'))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/article.scss';
.search-box{
    >>> .el-input__icon{
       line-height: 26px;
    }
}
.export-btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    padding-top: 8px;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    &:hover{
      background-color: #f0fffc;
    }
  }
  .iconfont{
    color: #26B99A;
    font-size: 28px;
    &.icon-pdf{
      color: #ff5562;
    }
    &.icon-html{
      color: #ff8976;
    }
  }
}
.search-list {
  margin-top: 60px;
  padding: 10px 0;
  .num{
    color: #26B99A;
  }
  .search-item{
    padding: 15px 20px;
    color: #666;
    border-bottom: 1px dashed #eee;
    font-size: 14px;
    &-title{
      font-size: 16px;
      font-weight: 600;
      padding: 5px 0;
    }
    &-desc{
      padding: 5px 0;
      letter-spacing: 1px;
      line-height: 1.5;
      font-size: 14px;
      color: #999;
    }
    &:hover{
      cursor: pointer;
      .search-item-desc{
        color: #333;
      }
    }
  }
}
</style>
