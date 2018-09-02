import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data(){
      return {}
    },
    mounted(){
      this.$store.dispatch('changeHeadLine','关于')
    }
  })