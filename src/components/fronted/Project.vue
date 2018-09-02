<template>
  <div id="proj" v-loading="loading" element-loading-text="加载中">
    <ul>
      <li v-for='(proj,index) in projs' :key='index'>
        <h1>{{proj.title}}</h1>
        <span>{{proj.createTime}}</span>
        <p>{{proj.descs}}</p>
        <div>
          <a :href="proj.showSrc" style='color:#5daf34' target='_blank'>在线演示</a>
          <a :href="proj.codeSrc" style='color:#3a8ee6' target='_blank'>项目源码</a>
          <a :href="proj.blogSrc" style='color:#f56c6c' target='_blank'>阅读全文</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Project",
    data() {
      return {
        projs: [],
        loading: true,
      };
    },
    methods: {},
    mounted() {
      this.$store.dispatch('changeHeadLine', '项目');
      this.$api.getProjectListNoAuth()
        .then(({
          data: {
            code,
            projsLists
          }
        }) => {
          if (code == 200) {
            setTimeout(() => {
                this.loading = false;
                this.projs = projsLists
            }, this.$con.FRONTLOADTIME);
          }
        }).catch(err => {
          alert(err.message);
        })
    }
  };
</script>

<style lang="less" scoped>
  #proj {
    margin: 50px auto;
    font-size: 1.8rem;
    ul {
      display: flex;
      padding: 0px;
      flex-direction: column;
      text-align: center;
      li {
        padding: 20px 50px;
        margin-bottom: 40px;
        border: 1px solid #eee;
        border-radius: 10px;
        background-color: #f2f6fc;
        box-shadow: 0px 0px 10px 0px #ccc;
        h1 {
          color: #945C4C;
          font-weight: normal;
          font-size: 2rem;
        }
        span {
          font-size: 1.4rem;
          color: #AF7464;
        }
        p {
          height: 6rem;
          font-size: 1.3rem;
          text-align: left;
          text-indent: 2em;
          color: #000;
          letter-spacing: .1rem;
          overflow: hidden;
        }
        a {
          font-size: 14px;
        }
        @media screen and (max-width:786px) {
          p {
            height: 10rem;
          }
        }
        @media screen and (max-width:480px) {
          p {
            font-size: 1rem;
            height: 15rem;
          }
        }
      }
      li:hover {
        background-color: #fff;
      }
    }
  }
</style>

