<template>
    <div>
        <Menu></Menu>
        <router-view></router-view>
    </div>
</template>
<script>
import route from '../router/index'
import Menu from '../components/menu'
export default {
    components:{
        Menu
    },
    data(){
        return {
            msg:"123"
        }
    },
    mounted() {
    },
}
</script>