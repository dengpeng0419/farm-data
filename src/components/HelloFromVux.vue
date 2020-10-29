<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link @click.native="showAlert"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import { AlertPlugin } from 'vux'
import Vue from 'vue'

Vue.use(AlertPlugin)

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  mounted() {
    this.getPageData()
  },
  methods: {
    showAlert() {
      this.$vux.alert.show({
        title: 'Vux is Cool',
        content: 'Do you agree?',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
    },
    getPageData() {
      this.$axios({
        url: this.urls().init,
        data: {
          ssl: true
        }
      }).then(json => {
        const data = json || {}
        this.handleInitPage(data)
      }).catch(err => {
        this.pageShow = true
        if (err.code === 'PC00010') {
          this.errorCode = '400'
          this.pageError = '您还没有开通银行卡，点击选购喜欢的产品，完成银行开户吧'
        } else {
          this.pageError = err.msg
        }
      })
    },
    handleInitPage(data) {

    },
    urls() {
      return {
        init: `${process.env.URL.api}123`
      }
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
