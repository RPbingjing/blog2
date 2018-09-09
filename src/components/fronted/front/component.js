import Vue from 'vue'

import vhead from '../common/vheader/ui'
import vfoot from '../common/vfooter/ui'
export default Vue.extend({
    name: 'app',
    data(){
      return {
        items:[
        ],
        loading2:false
      }
    },
    methods:{
    },
    components:{
      vhead,
      vfoot
    }
})