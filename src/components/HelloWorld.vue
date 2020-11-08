<template>
  <div class="page-index">
    <div @click="$router.push({name:'FarmerList'})">种植户列表</div>
    <div style="margin-left:20px" @click="$router.push({name:'PointList'})">服务商列表</div>
    <div class="logout" @click="logout">登出</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    if(!sessionStorage.getItem('_t')) {
      this.$router.replace({
        name: 'Login'
      })
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('_t')
      this.$router.replace({
        name: 'Login'
      })
      // this.$axios({
      //   url: 'http://thegisguy.cn:8085/logout',
      //   method: 'get'
      // }).then(json => {
      //   sessionStorage.removeItem('_t')
      //   this.$router.replace({
      //     name: 'Login'
      //   })
      // }).catch(err => {
      //   this.pageShow = true
      // })
    },
    showAlert(msg) {
      this.$vux.alert.show({
        // title: '提示',
        content: msg,
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.page-index {
  display: flex;
  font-size: 16px;
  color: #333;
  margin-top: 20px;
  margin-left: 20px;
}
.logout {
  position: absolute;
  bottom: 100px;
  right: 30px;
  background: royalblue;
  color:#fff;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  text-align: center;
  font-size: 18px;
}
</style>
