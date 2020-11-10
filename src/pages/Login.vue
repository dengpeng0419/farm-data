
<template>
  <div class="login">
    <div class="login-icon"></div>
    <div class="form-frame">
      <group gutter="0">
        <x-input placeholder="请输入用户名" v-model="name">
          <div slot="label" class="userName"></div>
        </x-input>
        <x-input placeholder="请输入密码" v-model="passport" type="password">
          <div slot="label" class="passport"></div>
        </x-input>
      </group>
      <!-- <div class="line">
        <input v-model="name" placeholder="请输入用户名"/>
        <div class="userName"></div>
      </div>
      <div class="gap"></div>
      <div class="line">
        <input :type="inputType" v-model="passport" placeholder="请输入密码"/>
        <div class="passport"></div>
      </div> -->
    </div>
    <!-- <x-switch v-model="value"></x-switch> -->
    <div class="login-button" @click="login">登录</div>
  </div>
</template>

<script>
import { JSEncrypt } from 'jsencrypt'

export default {
  name: 'home',
  data() {
    return {
      name: '',
      passport: '',
      inputType: '',
      value: ''
    }
  },
  mounted() {
    // this.$loading.show();
    // this.$toast('描述');
    this.name = localStorage.getItem('name') || ''
  },
  methods: {
    login() {
      console.log(111)
      this.inputType = 'password'
      const name = this.name
      const passport = this.passport
      const remember = false
      if (!name) {
        // this.$toast('用户名不能为空')
        return
      }
      if (!passport) {
        // this.$toast('密码不能为空')
        return
      }
      // const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALldL4hqBNN6kgQ1HPk5qeLmKYbyxDA6C9zuOI8vi0SvrltyMjowYHoEPPHtGKLE9jgtD3E//ErfKDf8CwJXybcCAwEAAQ=='
      // const jsencrypt = new JSEncrypt()
      // jsencrypt.setPublicKey(publicKey)
      // const secret = jsencrypt.encrypt(passport)
      this.$axios({
        url: 'http://thegisguy.cn:8085/login?password=' + passport + '&rememberMe=' + remember + '&username=' + name,
      }).then(res => {
        console.log(res)
        const data = res.data || {};
        // localStorage.setItem('name', res.userName || '')
        sessionStorage.setItem('_t', res.token)
        sessionStorage.setItem('login', '1')
        res.user && sessionStorage.setItem('userName', res.user.userName)
        res.user && sessionStorage.setItem('userId', res.user.userId)
        this.$router.push({
          name: 'Home'
        })
      }).catch(error => {
        console.log(error)
        // this.$toast(error.msg)
      })
    }
  }
}
</script>

<style lang="less">
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    .form-frame {
      width: 90vw;
      // padding-left: 10vw;
      border: 1Px solid #999;
      // padding-bottom: 15px;
      // padding-top: 5px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }
    .login-icon {
      // margin-top: 18vh;
      width: 50px;
      height: 200px;
      // background-image: url(../assets/img/icon_login.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .line {
      position: relative; 
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .gap {
      width: 100%;
      height: 10px;
      border-bottom: 1Px solid #999;
    }

    .userName {
      width: 32px;
      height: 32px;
      margin-top: 5px;
      background-image: url(../assets/img/icon_person.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .passport {
      width: 32px;
      height: 32px;
      margin-top: 5px;
      background-image: url(../assets/img/icon_passport.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    
    .login-button {
      margin-top: 40px;
      font-size: 24px;
      display: flex;
      color: #fff;
      background-color: #5895f7;
      justify-content: center;
      width: 90vw;
      height: 50px;
      line-height: 50px;
      border-radius: 10px;
    }

    input{  
      position: relative;
      background: none;  
      outline: none;  
      border:none;
      // border-bottom: 1Px solid #666;
      height: 100%;
      // width: 80vw;
      font-size: 24px;
      // margin-top: 30px;
      // color: #accbee;
      padding-left: 20px;
      box-sizing: border-box;
    }
    
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
      font-size: 20px;
      color: #999;
      letter-spacing: 3px;
		}
		::-moz-placeholder { /* Firefox 19+ */  
      font-size: 20px;
      color:#999;
      opacity: 1;
      letter-spacing: 3px;
		}
		:-ms-input-placeholder { /* IE 10+ */ 
		  font-size: 20px;
      color:#999;
      letter-spacing: 3px;
		}
		:-moz-placeholder { /* Firefox 18- */ 
		  font-size: 20px;
      color: #999;
      letter-spacing: 3px;
		}
  }
</style>

