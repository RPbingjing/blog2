import Vue from 'vue'

export default Vue.extend({
    name: 'app',
    data() {
      //自定义验证函数
          // 返回的数据
          return {
            logining: false,
            user: {
              account: '',
              checkPass: '',
            },
            loginRules: {
              account: [
                { required:true,message:"账号不能为空", trigger: 'blur' },
              ],
              checkPass: [
                { required: true, message: '请输入密码', trigger: 'blur' },
              ],
            },
            loadingflag:false
          };
        },
        methods: {
          handleSubmit() {
              this.$refs.user.validate((valid) => {
                if (valid) {
                  this.$store.dispatch('UserLogin',this.user);
                } else {
                  // 这个else只是防止什么都没填写
                  console.log('error submit!!');
                  return false;
                }
              });
  
          },
          toReg(){
             this.$router.push({path:'/reg'})
          }
        }
      })