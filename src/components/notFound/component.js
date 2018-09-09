import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    methods:{
        goHome(){
          this.$router.replace({path:'/home'});
        }
    }
})