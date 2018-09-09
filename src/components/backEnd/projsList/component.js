import Vue from 'vue'
import { sub } from '../../../assets/js/commen'
export default Vue.extend({
  name: 'app',
  data() {
    return {
      lists: [],
      listLoading: false,
      formTitle: '',
      formVisible: false,
      projectInf: {
        title: '',
        descs: '',
        showSrc: '',
        codeSrc: '',
        blogSrc: '',
      },
      formRule: {
        title: [{
          required: true,
          message: '请填写标题',
          trigger: 'blur'
        }],
        descs: [{
          required: true,
          message: '请填写描述',
          trigger: 'blur'
        }],
        showSrc: [{
          required: true,
          message: '请填写演示地址',
          trigger: 'change'
        }],
        codeSrc: [{
          required: true,
          message: '请填写源码地址',
          trigger: 'blur'
        }],
        blogSrc: [{
          required: true,
          message: '请填写博客地址',
          trigger: 'blur'
        }],
      },
      editLoading: false,
      btnText: '提交'
    }
  },
  methods: {
    // 获取分类列表
    getLists() {
      this.listLoading = true
      this.$api.getProjectList()
        .then((result) => {
          setTimeout(() => {
            this.listLoading = false
            this.lists = result.data.projsLists;
          }, this.$con.BACKLOADTIM)
        });
    },
    remove(projId) {
      this.$confirm('确认要删除吗?', '提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'waring'
      })
        .then(() => {
          this.listLoading = true;
          this.$api.removeProject({ projId })
            .then(({ data: { code, message }
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
                return false //阻止继续执行
                // 需要优化
              }
              this.getLists()
            }).catch(err => {
              // 这里可以跳转到错误页面
            })
        }).catch((err) => { })
    },
    // 显示创建分类弹窗
    createProject() {
      this.formVisible = true;
      this.formTitle = '新增';
      this.projectInf.title = '';
    },
    // 显示编辑分类弹窗
    editProject(row) {
      this.formVisible = true;
      this.formTitle = '编辑';
      this.projectInf.title = row.title
      this.projectInf.projId = row.projId
    },
    editSubmit() {
      this.$refs.projectInf.validate(valid => {
        if (valid) {
          this.btnText = "提交中"
          this.editLoading = true
          // 新增分类
          if (this.formTitle == '新增') {
            // 这里又是一个异步提交
            this.$api.createProject(this.projectInf)
              .then((res) => {
                sub(this, res)
              })
          } else {
            // 编辑
            this.$api.editProject(this.projectInf)
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
