<template>
    <div>
    123
        {{msg}}
    </div>
</template>
<script>
import router from '../../router/index'
import store from '../../store/index'
export default {
    data(){
        return {
            msg:"用户管理"
        }
    },
    mounted() {
        console.log("router",router);
        console.log("store",store);
    },
}
</script>