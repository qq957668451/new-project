<template>
  <div id="app" @click="getClickTime">
    <router-view></router-view>
  </div>
</template>

<script>
import { setCookie } from './public/pubFunction'
export default {
  name: "App",
  data(){
    return {
      clickTime: "",
      outTime: 30*10*1000,// 超时时间
    }
  },
  methods: {
    // 超时重新登录
    getClickTime(){
      if(location.href.indexOf('/login')!=-1){
        return
      }
      if(this.clickTime && (new Date().getTime() - this.clickTime > this.outTime)){
        this.clickTime = new Date().getTime()
        setCookie("token","")
        this.$router.push("/login")
      }else{
        this.clickTime = new Date().getTime()
      }
    }
  },
};
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
#app{
  min-height:100vh;
}
</style>
