<template>
  <div>404页面</div>
</template>
<script>
import router from '../../router/index'
import store from '../../store/index'
export default {
  data() {
    return {
      
    }
  },  mounted() {
        console.log("router",router);
        console.log("store",store.state);
    },
}
</script>