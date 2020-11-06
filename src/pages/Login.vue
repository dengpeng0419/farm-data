
<template>
  <div class="login">
    <div class="login-icon"></div>
    <div class="form-frame">
      <div class="line">
        <input v-model="name" placeholder="请输入用户名"/>
        <div class="userName"></div>
      </div>
      <div class="gap"></div>
      <div class="line">
        <input :type="inputType" v-model="passport" placeholder="请输入密码"/>
        <div class="passport"></div>
      </div>
    </div>
        <x-switch v-model="value"></x-switch>

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
      this.inputType = 'password'
      const name = this.name
      const passport = this.passport
      if (!name) {
        this.$toast('用户名不能为空')
        return
      }
      if (!passport) {
        this.$toast('密码不能为空')
        return
      }
      // const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALldL4hqBNN6kgQ1HPk5qeLmKYbyxDA6C9zuOI8vi0SvrltyMjowYHoEPPHtGKLE9jgtD3E//ErfKDf8CwJXybcCAwEAAQ=='
      // const jsencrypt = new JSEncrypt()
      // jsencrypt.setPublicKey(publicKey)
      // const secret = jsencrypt.encrypt(passport)
      this.$axios({
        url: '/app/service/login',
        data: {
          userName: name,
          password: secret
        }
      }).then(res => {
        const data = res.data || {};
        localStorage.setItem('name', data.userName || '')
        sessionStorage.setItem('_t', data.token)
        sessionStorage.setItem('login', '1')
        this.$router.push({
          name: 'home'
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
      border: 1Px solid #666;
      padding-bottom: 15px;
      padding-top: 5px;
      border-radius: 10px;
      position: relative;
    }
    .login-icon {
      // margin-top: 18vh;
      margin-bottom: 40px;
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
      margin-top: 20px;
    }
    .gap {
      width: 100%;
      height: 10px;
      border-bottom: 1Px solid #666;
    }

    .userName {
      position: absolute;
      bottom: -2px;
      left: 20px;
      width: 32px;
      height: 32px;
      background-image: url(../assets/img/icon_person.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .passport {
      position: absolute;
      bottom: -2px;
      left: 20px;
      width: 32px;
      height: 32px;
      background-image: url(../assets/img/icon_passport.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    
    .login-button {
      margin-top: 40px;
      font-size: 26px;
      display: flex;
      color: #fff;
      background-color: #5895f7;
      justify-content: center;
      width: 90vw;
      height: 60px;
      line-height: 60px;
      border-radius: 10px;
    }

    input{  
      position: relative;
      background: none;  
      outline: none;  
      border:none;
      // border-bottom: 1Px solid #666;
      // height: 20px;
      // width: 80vw;
      font-size: 24px;
      // margin-top: 30px;
      // color: #accbee;
      padding-left: 70px;
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

