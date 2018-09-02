<template lang="html">
  <el-row>
    <el-row style="padding:10px 15px;background:#fff">
      <el-col>
        <el-button size="small" type="primary" @click="createProject" style="float:right">添加项目</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table style='width:100%' align="center" :data="lists" v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60"></el-table-column>
          <el-table-column prop="createTime" min-width="180" label="创建时间"></el-table-column>
          <el-table-column prop="title" min-width="180" label="项目名称"></el-table-column>
          <el-table-column min-width="200" label="操作">
            <template slot-scope='scope'>
                        <!--这里点击查看进入具体页面但是路径中必须带有admin,这时具体页面里会出现评论的删除选项  -->
                        <el-button size="small" type='primary' @click="editProject(scope.row)">编辑</el-button>
                        <el-button size="small" type='danger' @click="remove(scope.row.projId)">删除</el-button>
</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 表格结束 -->
    <el-row>
        <el-col>
          <el-dialog :title="formTitle" :visible.sync="formVisible">
            <el-form :model="projectInf" label-width="120px" ref="projectInf" :rules="formRule">
                <el-form-item label="项目名称" prop="title">
                  <el-input v-model='projectInf.title' auto-complete='off'></el-input>
                </el-form-item>
                 <el-form-item label="项目描述" prop="descs">
                  <el-input v-model='projectInf.descs' auto-complete='off'></el-input>
                </el-form-item>
                 <el-form-item label="演示地址" prop="showSrc">
                  <el-input v-model='projectInf.showSrc' auto-complete='off'></el-input>
                </el-form-item>
                 <el-form-item label="源码地址" prop="codeSrc">
                  <el-input v-model='projectInf.codeSrc' auto-complete='off'></el-input>
                </el-form-item>
                 <el-form-item label="博客地址" prop="blogSrc">
                  <el-input v-model='projectInf.blogSrc' auto-complete='off'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="formVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit" :loading="editLoading" >{{btnText}}</el-button>
            </div>
          </el-dialog>
          <!-- 弹窗结束 -->
        </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import axios from 'axios'
  import {
    sub
  } from '../../assets/js/commen'
  export default {
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
            this.$api.removeProject({projId})
              .then(({data: {code,message}
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
          }).catch((err) => {})
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
  }
</script>

<style lang="css">
  .page {
    padding: 10px;
    background: #fff;
  }
</style>
