import Vue from 'vue'
import articleItem from '../common/articleItem/ui'

export default Vue.extend({
  name: 'app',
  components: {articleItem},
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
})