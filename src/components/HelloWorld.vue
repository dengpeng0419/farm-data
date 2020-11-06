<template>
  <div class="page-index">
    <div @click="$router.push({name:'FarmerList'})">种植户列表</div>
    <div style="margin-left:20px" @click="$router.push({name:'FarmerList'})">服务商列表</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
</style>
