<template>
    <div>
        开发中，敬请期待！！
    </div>
</template>

<script>

export default {
  name:"Project",
  data(){
    return {
      
    }
  },
  methods:{
     
  },
  mounted(){
      setTimeout(()=>{
          this.$router.replace('/');
      },this.$con.FRONTLOADTIME);
  }
}
</script>

<style lang="less" scoped>

</style>

