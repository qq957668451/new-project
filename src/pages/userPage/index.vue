<template>
  <div>
    {{ msg }}
  </div>
</template>
<script>
import router from "../../router/index";
import store from "../../store/index";
export default {
  data() {
    return {
      msg: "用户管理"
    };
  },
  mounted() {
  }
};
</script>