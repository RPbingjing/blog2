import Vue from 'vue'
import {sub} from '@/assets/js/commen'

export default Vue.extend({
  name: 'app',
  data() {
    return {
      lists: [],
      listLoading: false,
      formTitle: '',
      formVisible: false,
      classifyInf: {
        classId: 0,
        classType: ''
      },
      formRule: {
        classType: [{
          required: true,
          message: '请输入分类名称',
          trigger: 'blur'
        }]
      },
      editLoading: false,
      btnText: '提交'
    }
  },
  methods: {
    // 获取分类列表
    getLists() {
      this.listLoading = true
      this.$api.getClassify()
        .then((result) => {
          setTimeout(() => {
            this.listLoading = false
            this.lists = result.data.lists;
          }, this.$con.BACKLOADTIM)
        })
    },
    remove(classId) {
      this.$confirm('确认要删除吗?', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        })
        .then(() => {
          this.listLoading = true;
          this.$api.removeClassifyList({
              classId
            })
            .then(({
              data: {
                code,
                message
              }
            }) => {
              this.listLoading = false
              // 这里需要优化
              if (code == 200) {
                this.$notify({
                  title: '成功',
                  message,
                  type: 'success'
                })
              } else if (code == 401) {
                this.$notify({
                  title: '失败',
                  message,
                  type: 'error'
                })
                setTimeout(() => {
                  this.$router.replace({
                    path: '/login'
                  })
                }, this.$con.BACKLOADTIM)
                return false //阻止继续执行
                // 需要优化
              }
              this.getLists()
            }).catch(err => {
              // 这里可以跳转到错误页面
            })
        }).catch((err) => {})
    },
    // 显示创建分类弹窗
    addClass() {
      this.formVisible = true;
      this.formTitle = '新增';
      this.classifyInf.classType = '';
    },
    // 显示编辑分类弹窗
    editClass(row) {
      this.formVisible = true;
      this.formTitle = '编辑';
      this.classifyInf.classType = row.classType
      this.classifyInf.classId = row.classId
    },
    editSubmit() {
      this.$refs.classifyInf.validate(valid => {
        if (valid) {
          this.btnText = "提交中"
          this.editLoading = true
          // 新增分类
          if (this.formTitle == '新增') {
            // 这里又是一个异步提交
            this.$api.addClassify({
                classType: this.classifyInf.classType
              })
              .then((res) => {
                sub(this, res)
              })
          } else {
            // 编辑
            this.$api.editClassfy({
                classId: this.classifyInf.classId,
                classType: this.classifyInf.classType
              })
              .then((res) => {
                sub(this, res)
              })
          }
        }
      })
    }
  },
  mounted() {
    this.getLists();
  }
})