<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #f7f7f7;
}

#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
