<template>
  <div class="loginPage">
    <div class="logoBox">
      <img class="logoImg" src="../../images/loginPage/logo.png" alt />
      <span class="logoText">S.H.I.E.L.D项目管理系统</span>
    </div>
    <div class="loginFormBox">
      <div class="welcome">欢迎登陆</div>
      <div class="inputbox">
        <img src="../../images/loginPage/username.png" alt />
        <el-input placeholder="请输入用户名" v-model="userName"></el-input>
      </div>
      <div class="inputbox">
        <img src="../../images/loginPage/password.png" alt />
        <el-input placeholder="请输入密码" v-model="passWord" show-password></el-input>
      </div>
      <div class="remember">
        <el-checkbox v-model="remPassword">记住密码</el-checkbox>
      </div>
      <div class="btnBox">
        <el-button style="width:100%" type="primary" :loading="loading" @click="toLogin">登 录</el-button>
      </div>
      <div class="forget">
        <span>忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../../store/index";
import { funLocalstorage,setCookie,getCookie } from "../../public/pubFunction";
import {toLogin} from '../../api/login.js'
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      redirect:"",
      otherQuery:"",
      remPassword: true,
      loading:false
    };
  },
  mounted() {
    if(getCookie('token')){
      this.$router.push('/')
      return
    }
    funLocalstorage.get('userName')?this.userName = funLocalstorage.get('userName'):''
    funLocalstorage.get('passWord')?this.passWord = funLocalstorage.get('passWord'):''
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    toLogin() {
      if (this.userName && this.passWord) {
        this.loading = true
        store.dispatch('user/login', { userName: this.userName, passWord: this.passWord }).then((res) => {
          this.loading = false
          this.$message.success('登录成功')
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        }).catch((err) => {
          this.loading = false
          this.$message.error(err.message)
          this.userName=''
          this.passWord=''
          funLocalstorage.remove('userName')
          funLocalstorage.remove('passWord')
        })
        } else {
            this.$message.error('请填写账号密码')
        }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
};
</script>
<style lang="less" scoped>
.loginPage {
  background: lightblue;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .logoBox {
    padding: 10px 0 0 10%;
    .logoImg {
      width: 50px;
      height: 50px;
    }
    .logoText {
      font-size: 18px;
      color: #999;
      padding-left: 20px;
    }
  }
  .loginFormBox {
    width: 300px;
    border-radius: 10px;
    padding: 20px 25px 10px;
    position: absolute;
    right: 100px;
    top: 25%;
    background: #fff;
    .welcome {
      text-align: center;
      margin-bottom: 25px;
      font-size: 20px;
    }
    .inputbox {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
        width: 25px;
      }
    }
    .remember {
      margin-top: 50px;
      margin-bottom: 10px;
    }
    .btnBox {
      .loginBtn {
        background: #409eff;
        border: 1px solid #dcdfe6;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .forget {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0;
      font-size: 14px;
      color: #999;
      span {
        cursor: pointer;
      }
    }
  }
}
</style>