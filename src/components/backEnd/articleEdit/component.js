import Vue from 'vue'
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

  export default Vue.extend({
    name: 'app',
    data() {
      return {
        article: {
          articleId: '',
          title: '',
          classType: '',
          content: '',
          brief: ''
        },
        classifyList: [],
        createRules: {
          title: [{
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }],
          classType: [{
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }],
          brief:[{
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }],
        },
        load: false,
        btnText: "立即更新",
        listLoading: false
      }
    },
    computed: {
      markedToHtml() {
        marked.setOptions({
          highlight: function(code) {
            return hlj.highlightAuto(code).value;
          }
        });
        return marked(this.article.content);
      }
    },
    methods: {
      // 更新文章
      editArticle() {
        this.$refs.articleCreate.validate(valid => {
          if (valid) {
            this.load = true;
            // 换成真实API的时候可以直接提交this.article
            this.btnText = "更新中"
            this.$api.editArticle({
                contentToMark: this.markedToHtml,
                ...this.article
              })
              .then((res) => {
                this.btnText = "立即更新";
                this.editLoading = false;
                if (res.data.code == 200) {
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.$router.push({
                      path: '/admin/articleList'
                    })
                  }, this.$con.BACKLOADTIM)
                }
              }).catch((err) => {
                console.log(err);
              })
          }
        })
      },
      initial() {
        this.listLoading = true
        setTimeout(() => {
          this.$api.getOneArticle({'articleId':this.$route.params.articleId})
              .then(({data: {code,oneArticle}}) => {
                if (code == 200) {
                  this.article = oneArticle;
                }
              });
          this.$api.getClassify()
            .then(({data: {code,lists}}) => {
              if (code == 200) {
                this.classifyList = lists
              }
          });
          this.listLoading = false
        }, this.$con.BACKLOADTIM)
      },
      // 取消
      cancle() {
        this.$router.push({
          path: '/admin/articleList'
        });
      }
    },
    computed: {
      markedToHtml() {
        marked.setOptions({
          highlight: function(code) {
            return hlj.highlightAuto(code).value;
          }
        });
        return marked(this.article.content);
      }
    },
    mounted() {
      this.initial()
    }
  })
