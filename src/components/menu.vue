<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item v-for="(item,index) in routerList" :index="item.path" v-if="!item.hidden">
                <router-link :to="item.path">{{item.meta.titile}}</router-link>
            </el-menu-item>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import itemsMenu from "./menuItem"

export default {
    components:{
        itemsMenu
    },
    data(){
        return{
            routerList: []
        }
    },
    mounted() {
        this.routerList = this.$store.state.permission.routes
        // console.log('store',this.$store.state.permission.routes);
    },
}
</script>