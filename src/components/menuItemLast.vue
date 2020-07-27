<template>
    <menu-two v-if="lastData.children && lastData.children.length > 0" :data="lastData"></menu-two>
    <el-menu-item v-else :index="path=='/'?path+lastData.path:path+'/'+lastData.path" >{{lastData.name}}</el-menu-item>
</template>
<script>
import menuTwo from "./menuItem"
export default {
  name:"MenuThree",
  components:{menuTwo},
  props:{
    lastData:{
      type:Object,
      default:()=>{}
    },
    path:{
      type:String,
      default:""
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log('222',this.lastData);
    console.log('path',this.path);
  },
}
</script>