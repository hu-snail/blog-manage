import Vditor from 'vditor'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      contentEditor: '',
      index: 0,
      options: {
        toolbarConfig: {
          pin: true
        },
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          'upload',
          'record',
          'table',
          'undo',
          'redo',
          'fullscreen',
          'edit-mode',
          'export',
          'code-theme',
          'content-theme',
          {
            name: 'more',
            toolbar: [
              'both',
              'outline',
              'preview',
              'format',
              'devtools',
              'info',
              'help'
            ]
          }
        ],
        cache: {
          enable: false
        },
        preview: {
          markdown: {
            toc: true,
            chinesePunct: true,
            autoSpace: true,
            listStyle: true
          },
          hljs: {
            style: 'dracula',
            lineNumber: true
          },
          mode: 'both'
        },
        counter: {
          enable: true
        },
        typewriterMode: true,
        resize: {
          enable: true
        },
        placeholder: '请输入文档内容...',
        // after: () => {
        //   this.contentEditor.setValue(this.value)
        // },
        input: (val) => {
          const render = this.contentEditor.getHTML()
          this.$emit('on-save', val, render)
        }
      }
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(val) {
        if (this.index > 1) this.contentEditor.setValue(val)
        this.index++
      }
    }
  },
  mounted() {
    this.contentEditor = new Vditor(this.$refs['v-ditor'], this.options)
    console.log(this.contentEditor)
  }
}
