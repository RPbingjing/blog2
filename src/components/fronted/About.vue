<template lang="html">
  <div class="about" v-loading="loading2" element-loading-text="加载中">
    <div v-if="shows">
      <h2>帕尼尼</h2>
      <p>如果你和我一样是初窥前端的一个怀抱梦想的初学者，我希望我走过的这段路能对你有些许的启示，让你对前端收获一点感悟。 
如果你是一个前端的大牛，也由衷的希望你能留下些许的指教。</p>
      <p>
        <a href="https://github.com/The-Never" target="_blank">Github</a>
        <a href="https://gitee.com/panini/" target="_blank">码云</a>
        <a href="https://blog.csdn.net/Nate__River/" target="_blank">CSDN</a>
      </p>
      <h2>关于网站</h2>
      <p>写这个网站主要有两个想法</p>
      <p>一是我想把我对人生的体会记录下来。回顾过往，收获新知</p>
      <p>二是我想把我的项目展示出来，希望对大家有些帮助，也希望大家提出指教</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      shows:false,
      loading2:true
    }
  },
  mounted(){
    this.$store.dispatch('changeHeadLine','关于')
    setTimeout(()=>{
      this.$store.dispatch('showProgress', 100)
      this.shows = true;
      this.loading2 = false
    },this.$con.FRONTLOADTIME)
  }
}
</script>

<style lang="css" scoped>
  .about{
    margin:auto;
  }

  .about a {
    color:#4078c0;
    display:inline-block;
    padding: 0.2rem 0.4rem;
    font-size: 1.6rem;
  }
  .about a:first-child{
    padding-left: 0;
  }
  .about p{
    font-size: 1.6rem;
    line-height: 1.6em;
  }

  .about a ,.about p,.about h2{
    margin: 1rem auto;
  }
  .about h2{
    font-weight: 400;
    font-size: 3rem;
    align-self: center;
    margin-top: 2rem;
  }
  @media screen and (max-width:480px){
    .about a,.about p{
      font-size: 1.4rem;
    }
    .about h2{
      margin-top: auto;
      font-size: 2.2rem;
    }
  }
</style>
