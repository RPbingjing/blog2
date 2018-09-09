import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data() {
        return {
          projs: [],
          loading: true,
        };
      },
      methods: {},
      mounted() {
        this.$store.dispatch('changeHeadLine', '项目');
        this.$api.getProjectListNoAuth()
          .then(({
            data: {
              code,
              projsLists
            }
          }) => {
            if (code == 200) {
              setTimeout(() => {
                  this.loading = false;
                  this.projs = projsLists
              }, this.$con.FRONTLOADTIME);
            }
          }).catch(err => {
            alert(err.message);
          })
      }
  })