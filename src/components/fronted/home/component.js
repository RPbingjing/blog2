import Vue from 'vue'
import articleItem from '../common/articleItem/ui'
export default Vue.extend({
  name: 'app',
  components: { articleItem },
  data() {
    return {
      items: [],
      loadMoreFlag: false,
      loadMoreText: '加载更多',
      loadMoreShow: false,
      page: 1
    }
  },
  methods: {
    loadMore() {
      this.loadMoreText = '加载中'
      this.loadMoreFlag = true
      this.page++
      this.loadData(this.page)
    },
    loadData(page) {
      this.$api.getArticleLists({ page })
        .then(({ data: { code, articleLists, hasNext, hasPrev } }) => {
          if (code == 200) {
            this.items = this.items.concat(articleLists)
            if (hasNext) {
              this.loadMoreShow = true
              this.loadMoreFlag = false
              this.loadMoreText = '加载更多'
            } else {
              this.loadMoreShow = false
            }
          }
        })
    }
  },
  mounted() {
    // 封装成一个方法，与分页获取文章列表类似
    this.$store.dispatch('changeHeadLine', '主页')
    this.loadData(1, this.limit)
  }
})