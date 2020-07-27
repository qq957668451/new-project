<template>
  <el-submenu :index="data.path" v-if="data.children&&data.children.length>0">
    <template slot="title">{{data.name}}</template>
    <menu-Three v-for="item in data.children" v-if="!item.hidden" :key="item.path" :lastData="item" :path='data.path'></menu-Three>
  </el-submenu>
  <el-menu-item v-else :index="data.path">{{item.name}}</el-menu-item>
</template>
<script>
import menuThree from './menuItemLast'
export default {
  name:"MenuTwo",
  components:{menuThree},
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
}
</script>