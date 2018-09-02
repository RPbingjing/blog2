<template lang="html">
  <div class="tags_wrap" v-loading="loading2" element-loading-text="加载中">
    <ul class="tags_list">
      <li v-for='(item,index) in items' :key='index'>
        <a class="tag_btn" :to="`/tags/${item.articleId}`" @click.prevent="gets(index,item.classType)" :class="{'active':index==selected}">{{item.classType}}</a>
      </li>
    </ul>
    <transition-group name="list" tag="div">
      <articleItem v-for='item in articleLists' v-if='show' :key="item.articleId" :articleItem='item'></articleItem>
    </transition-group>
  </div>
</template>

<script>
  import articleItem from './common/articleItem'
  export default {
    name: "Tag",
    data() {
      return {
        items: [],
        articleLists: [],
        selected: 9,
        show: true,
        loading2: true,
        list_show: true
      }
    },
    components: {
      articleItem
    },
    methods: {
      gets(index, classify) {
        this.$store.dispatch('changeHeadLine', classify)
        this.show = false;
        this.selected = index
        this.getPage(classify)
      },
      getPage(classify) {
        this.$api.getArticlesByClassify({
            classify
          })
          .then(({
            data: {
              code,
              articleLists
            }
          }) => {
            if (code == 200) {
              this.articleLists = articleLists
              setTimeout(() => {
                this.show = true;
              }, this.$con.FRONTLOADTIME)
            }
          })
          .catch(err => {
            alert(err.message)
          })
      },
      initial() {
        this.$store.dispatch('changeHeadLine', '记录')
        // 根据标签名获取文章列表
        this.$api.getNoAuthClass()
          .then(({
            data: {
              code,
              lists
            }
          }) => {
            if (code == 200) {
              setTimeout(() => {
                this.loading2 = false;
                this.items = lists
                this.getPage('生活日记')
              }, this.$con.FRONTLOADTIME)
            }
          }).catch(err => {
            alert(err.message);
          });
      }
    },
    mounted() {
      this.initial();
    }
  }
</script>

<style lang="css" scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all .3s
  }
  .list-enter,
  .list-leave-active {
    opacity: 0;
  }
  h2,
  h4 {
    margin: 0;
  }
  p,
  .tags_main p {
    margin: 0;
  }
  .tags_list {
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    list-style: none;
    display: flex;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .tags_list li {
    margin: .4rem;
  }
  .tags_list li a {
    display: block;
    padding: .6rem 1.6rem;
    border: 1px solid #d2d2d2;
    border-radius: .6rem;
    color: rgba(0, 0, 0, .8);
    font-size: 1.8rem;
    /*transition渐变*/
    background-color: #f7f7f7;
    transition: all .4s;
    cursor: pointer;
  }
  .tags_list li a:hover,
  .tags_list li .active {
    /*transition渐变*/
    background-color: #555555;
    color: #fff;
  }
  .tags_wrap {
    margin: auto;
    list-style: none;
  }
  .tags_wrap article {
    padding-bottom: 1rem;
    border-bottom: 1px solid #d2d2d2;
  }
</style>
