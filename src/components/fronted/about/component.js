import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data(){
      return {
        shows:false,
        loading2:true
      }
    },
    mounted(){
      this.$store.dispatch('changeHeadLine','关于')
      setTimeout(()=>{
        this.$store.dispatch('showProgress', 100)
        this.shows = true;
        this.loading2 = false
      },this.$con.FRONTLOADTIME)
    }
  })