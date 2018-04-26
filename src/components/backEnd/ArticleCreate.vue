<template lang="html">
  <el-row>
    <el-col>
      <el-form ref="articleCreate" :model="article" :rules="createRules" >
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3" >
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
            <el-form-item class="show" prop="content" >
               <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="createArticle" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import  'highlight.js/styles/atom-one-dark.css'
export default {
  data(){
    return {
      article:{
        classType:'',//文章所属分类
        title:'',//文章标题
        content:'',//文章内容
        brief: '' //文章简介
      },
      classifyList:[],
      createRules:{
        title:[
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        classType:[
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        brief:[
          { required: true,message: '请输入简介',trigger: 'blur' }
        ],
      },
      load:false,
      btnText:"立即发布"
    }
  },
  methods:{
    // 发布文章
    createArticle(){

        this.$refs.articleCreate.validate(valid=>{
          if(valid){
            this.$confirm("确认提交吗?","提示",{})
                .then(()=>{
                  this.load = true;
                    this.btnText = "发布中"
                    // 发送的文章信息

                    this.$api.createArticle({
                      contentToMark:this.markedToHtml,
                      ...this.article
                    })
                    .then(({data:{code,message}})=>{
                            this.btnText="立即发布";
                            this.editLoading = false;
                            if(code==200){
                                  this.$notify({
                                    title:'成功',
                                    message,
                                    type:'success'
                                  })
                            }else if(code==401){
                              this.$notify({
                                title:'失败',
                                message,
                                type:'error'
                              })
                              setTimeout(()=>{
                                this.$router.push({path:'login'})
                              },this.$con.BACKLOADTIME)
                              return false
                            }

                            setTimeout(()=>{
                              this.$router.push({path:'/admin/articleList'})
                            },this.$con.BACKLOADTIM)
                        })
                })
                .catch((error)=>{
                })
          }
        })
    },
    // 取消
    cancle(){
      this.$router.push({path:'/admin/articleList'});
    }
  },
  computed:{
    markedToHtml(){
      marked.setOptions({
        highlight: function (code) {
        return hlj.highlightAuto(code).value;
        }
      });
      return marked(this.article.content);
    }
  },
  mounted(){
      this.$api.getClassify()
        .then(({data:{code,lists}})=>{
          if(code==200){
            this.classifyList = lists;
          }
        })
  }

}
</script>

<style lang="css" >
</style>
