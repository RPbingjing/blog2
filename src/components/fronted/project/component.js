import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data(){
      return {
        
      }
    },
    methods:{
       
    },
    mounted(){
        setTimeout(()=>{
            this.$router.replace('/');
        },this.$con.FRONTLOADTIME);
    }
  })