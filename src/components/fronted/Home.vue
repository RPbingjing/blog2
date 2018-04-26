<template lang="html">
      <div class="home_wrapper"  v-loading="loading2"  element-loading-text="加载中">
        <articleItem v-for='(item,index) in items':articleItem='item' :key='index'></articleItem>
      <footer class='loadMore' v-if='loadMoreShow'><el-button type="primary" :loading="loadMoreFlag" @click='loadMore'>{{loadMoreText}}</el-button></footer>
    </div>
</template>

<script>
import articleItem from './common/articleItem'
export default {
  name:"Home",
  data(){
    return {
      items:[
      ],
      loading2:true,
      loadMoreFlag:false,
      loadMoreText:'加载更多',
      loadMoreShow:false,
      page:1
    }
  },
  components:{
    articleItem
  },
  methods:{
      loadMore(){
        this.loadMoreText = '加载中'
        this.loadMoreFlag = true
        this.page++
        this.loadData(this.page)
      },
      loadData(page){
          this.$api.getArticleLists({page})
                .then(({data:{code,articleLists,hasNext,hasPrev}})=>{
                  if(code==200){
                    setTimeout(()=>{
                      this.items = this.items.concat(articleLists)
                      this.loading2=false;
                      if(hasNext){
                        this.loadMoreShow = true
                        this.loadMoreFlag =  false
                        this.loadMoreText = '加载更多'
                      }else{
                        this.loadMoreShow = false
                      }
                    },this.$con.FRONTLOADTIME)
                  }

                })
        }
  },
  mounted(){
    // 封装成一个方法，与分页获取文章列表类似
    this.$store.dispatch('changeHeadLine','主页')
    this.loadData(1,this.limit)
  }
}
</script>

<style lang="css" scoped>
h2,h4{
  margin:0;
}
.home_wrapper{
  margin:auto;
  list-style: none;
}
.home_wrapper article{
  padding-bottom: 1rem;
  border-bottom:1px solid #d2d2d2;
  margin-bottom: 2rem;
}
footer{
  text-align: right;
}
.loadMore {
  margin:4rem 0 0 0;
  display: flex;
  display: webkit-flex;
}
.loadMore button {
  cursor: pointer;
  outline:none;
  padding:1rem;
  margin:auto;
  border-radius:.5rem;
  color:rgba(0, 0, 0, 1);
  border:1px solid #bfcbd9;
   background-color: #f7f7f7;
}
@media screen and (max-width:786px){
  .loadMore{
    margin: 3rem 0  .8rem 0;
  }
}
</style>
