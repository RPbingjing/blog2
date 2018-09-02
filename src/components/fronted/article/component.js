import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data(){
      return {
        oneArticle:{},
      }
    },
    created(){
      // 在这里调用获取一篇文章的api
      this.$api.getOneArticleNoAuth({articleId:this.$route.params.id})
          .then(({data:{code,oneArticle}})=>{
            if(code==200){
                this.oneArticle = oneArticle;
            }
          })
  
    }
  })