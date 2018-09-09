import Vue from 'vue'
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default Vue.extend({
    name: 'app',
    data() {
        return {
            article: {
                classType: '',//文章所属分类
                title: '',//文章标题
                content: '',//文章内容
                brief: '' //文章简介
            },
            classifyList: [],
            createRules: {
                title: [
                    { required: true, message: '请填写标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
                classType: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                brief: [
                    { required: true, message: '请输入简介', trigger: 'blur' }
                ],
            },
            load: false,
            btnText: "立即发布"
        }
    },
    methods: {
        // 发布文章
        createArticle() {

            this.$refs.articleCreate.validate(valid => {
                if (valid) {
                    this.$confirm("确认提交吗?", "提示", {})
                        .then(() => {
                            this.load = true;
                            this.btnText = "发布中"
                            // 发送的文章信息

                            this.$api.createArticle({
                                contentToMark: this.markedToHtml,
                                ...this.article
                            })
                                .then(({ data: { code, message } }) => {
                                    this.btnText = "立即发布";
                                    this.editLoading = false;
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
                                            this.$router.push({ path: 'login' })
                                        }, this.$con.BACKLOADTIME)
                                        return false
                                    }

                                    setTimeout(() => {
                                        this.$router.push({ path: '/admin/articleList' })
                                    }, this.$con.BACKLOADTIM)
                                })
                        })
                        .catch((error) => {
                        })
                }
            })
        },
        // 取消
        cancle() {
            this.$router.push({ path: '/admin/articleList' });
        }
    },
    computed: {
        markedToHtml() {
            marked.setOptions({
                highlight: function (code) {
                    return hlj.highlightAuto(code).value;
                }
            });
            return marked(this.article.content);
        }
    },
    mounted() {
        this.$api.getClassify()
            .then(({ data: { code, lists } }) => {
                if (code == 200) {
                    this.classifyList = lists;
                }
            })
    }
})