import Vue from 'vue'
export default Vue.extend({
    name: 'app',
    data() {
      return {
        currentPath: '/admin/articleList',
        currentPathNameParent: '管理面板',
        currentPathName: '文章管理'
      }
    },
    methods: {
      con() {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('UserLogout')
        }).catch(() => {})
      },
      toHome() {
        this.$router.push({
          path: '/'
        });
      }
    },
    watch: {
      "$route" (to, from) {
        this.currentPath = to.path; //变成绝对路径
        this.currentPathName = to.name //匹配的完整的带子路由的name
      }
    }
})
