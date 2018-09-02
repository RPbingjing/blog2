import Vue from 'vue'
import {mapState} from 'vuex'

export default Vue.extend({
  data(){
    return {
      finalheadline:'',
      show_headline:true
    }
  },
  computed:mapState(['headline']),
  watch:{
    headline(val){
      this.show_headline= false;
      setTimeout(()=>{
        this.show_headline = true;
        this.finalheadline = val
      },200)
    }
  }
})