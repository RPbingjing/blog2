import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data(){
      return {
        articleLists:[],
        total:0,
        page:1,
        limit:10, //每页10条
        listLoading:false,
        formTitle:'',
        formVisible:false,
        formRule:{
          classify:[
            {required:true,message:'请输入分类名称',trigger:'blur'}
          ]
        },
        btnText:'提交'
      }
    },
    methods:{
      handle(val){
        this.page = val;
        this.getLists()
      },
      getLists(){
        this.listLoading = true;
        this.$api.getArticleList({page:this.page})
          .then(({data:{articleLists,total}})=>{
            setTimeout(()=>{
              this.listLoading =false
              this.articleLists =articleLists;
              this.total =total;
            },this.$con.BACKLOADTIM)
        });
      },
      read(articleId){
        this.$router.push({path:`/article/${articleId}`})
      },
      remove(articleId){
        this.$confirm('确认要删除吗?','提醒',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type:'waring'
        })
        .then(()=>{
          this.listLoading = true;
          this.$api.removeOneArticle({articleId})
              .then(()=>{
                this.listLoading = false
                this.$notify({
                  title:'成功',
                  message:"删除成功",
                  type:'success'
                })
                this.getLists()
              })
        }).catch((err) => {
          console.log(err);
        })

      },
      //跳转到编辑界面，进行更新
      editArticle(articleId){
        // 通过this.$route.params来获取数据
          this.$router.push({path:`/admin/articleEdit/${articleId}`});
      },
      // 跳转到编辑界面，进行新建
      createArticle(){
          this.$router.push({path:'/admin/articleCreate'});
      }

    },
      mounted(){
        this.getLists();
      }
})