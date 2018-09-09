import Vue from 'vue'

export default Vue.extend({
  name: 'app',
  data() {
    //自定义验证函数
    var checkRepeatPass = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.user.checkPass) {
        return callback(new Error('两次输入的密码不一样'))
      } else {
        callback();
      }
    }
    // 返回的数据
    return {
      logining: false,
      user: {
        account: '',
        checkPass: '',
        checkRepeatPass: ''
      },
      regRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        checkRepeatPass: [
          { validator: checkRepeatPass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      // 必须是二次验证
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.$store.dispatch('UserReg', this.user);
        } else {
          // 前端验证未通过
          console.log('error submit!!');
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    }
  }
})