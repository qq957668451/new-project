<template>
  <div id="app" @click="getClickTime">
    <router-view></router-view>
  </div>
</template>

<script>
import { setCookie,getCookie } from "./public/pubFunction";
export default {
  name: "App",
  data() {
    return {
      outTime: 10 * 60 * 1000 // 超时时间
    };
  },
  methods: {
    // 超时重新登录
    getClickTime() {
      if (location.href.indexOf("/login") != -1) {
        setCookie("time",new Date().getTime())
        return;
      }
      if (getCookie("time") && new Date().getTime() - getCookie("time") > this.outTime ) {
        setCookie("time",new Date().getTime())
        setCookie("token", "");
        this.$router.push("/login");
      } else {
        setCookie("time",new Date().getTime())
      }
    }
  },
  mounted() {
    getCookie("time") ? this.getClickTime() : setCookie("time",new Date().getTime())
  },
  beforeDestroy() {
    this.getClickTime()
  },
};
</script>

<style lang='less'>
* {
  padding: 0;
  margin: 0;
}
#app {
  min-height: 100vh;
}
</style>
