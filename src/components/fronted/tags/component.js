import Vue from 'vue'
import articleItem from '../common/articleItem/ui'

export default Vue.extend({
  name: 'app',
  components: {articleItem},
  data(){
    return {
      items:[],
      articleLists:[],
      selected:9,
      list_show:true,
      initTag: '周记'
    }
  },
  methods:{
    gets(index,classify){
      this.$store.dispatch('changeHeadLine',classify)
      this.show = false;
      this.selected = index
      this.getPage(classify)
    },
    getPage(classify){
      this.$api.getArticlesByClassify({classify})
          .then(({data:{code,articleLists}})=>{
            if(code==200){
                this.articleLists = articleLists
            }
          })
          .catch(err=>{
            alert(err.message)
          })
    }
  },
  mounted(){
    this.$store.dispatch('changeHeadLine','标签')
      // 根据标签名获取文章列表
    this.$api.getNoAuthClass()
      .then(({data:{code,lists}})=>{
        if(code==200){       
            this.items = lists
            this.getPage(this.initTag)
        }

      })
      .catch(err=>{
        alert(err.message);
      })
  }

})