<template lang="html">
  <el-row>
    <el-col>
      <el-form ref="articleCreate" :model="article" :rules="createRules" v-loading="listLoading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classType">
              <el-select v-model="article.classType" placeholder="请选择分类">
                <el-option v-for="(item,index) in classifyList" :label="item.classType" :value="item.classType" :key='index'></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-form-item label="文章简介" label-width="200px" prop="brief">
              <el-input v-model="article.brief" style="width:500px" placeholder="请在此处输入简介"></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content">
              <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml" class="article"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 ">
          <el-button type="primary" style="float:right;" size='small' @click="editArticle" :loading="load">{{btnText}}</el-button>
          <el-button style="float:right;margin-right:10px" size='small' @click="cancle">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import marked from 'marked';
  import hlj from 'highlight.js'
  import 'highlight.js/styles/atom-one-dark.css'
  export default {
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
  }
</script>


<style scoped>
  
</style>