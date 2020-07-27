<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
           <menu-two v-for="item in routerList" :data="item" :key="item.path" v-if="!item.hidden && item.children && item.children.length>0"></menu-two>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import menuTwo from "./menuItem"

export default {
    name:"MenuOne",
    components:{menuTwo},
    data() {
      return {
        activeIndex:"1",
        routerList: []
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        // var path = ''
        // keyPath.map((item,index)=>{
        //     path += (item+'/')
        // })
        // path = path.substr(0,path.length-1)
        // console.log("path",path);
      },
      routerChange(router){
        this.$router.push(router)
      }
    },
    mounted() {
        this.routerList = this.$store.state.permission.addRoutes
        console.log(this.routerList);
    },
    computed: {
        isShow:()=>{
            return true
        }
    }
}
</script>