import Vue from 'vue'

import vhead from '../common/vheader/ui'
import vfoot from '../common/vfooter/ui'
export default Vue.extend({
    name: 'app',
    components: {vhead, vfoot},
  data(){
    return {
      items:[]
    }
  },
  methods:{
  },
})