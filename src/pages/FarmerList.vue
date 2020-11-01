<template>
  <div class="page-farmer-list">
    <!-- <group title="cell demo" class="card-head">
      <cell title="VUX" value="cool" is-link @click.native="showAlert"></cell>
    </group> -->
    <div ref="cardList" class="card-list" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
      <div class="content" v-for="(item, index) in list" :key=index>
        <div class="line-top">
          <div class="name">张三<span>1345877633</span></div>
          <div class="status">正在跟进</div>
        </div>
        <div class="line-middle">
          <div class="left">
            <div class="title">2020年度 400亩 大田作物</div>
            <div class="address">经营地址：江苏省南京市雨花区</div>
          </div>
          <div class="right">
            <div class="icon"></div>
            <div class="icon-name">赵小刚</div>
          </div>
        </div>
        <div class="line-bottom">
          <div class="logo-go logo" @touchstart="showAlert('功能开发中')">跟进</div>
          <div class="logo-edit logo" @touchstart="goEdit">编辑</div>
          <a href="tel:134898798988" class="logo-tel logo">电话</a>
          <div class="logo-more" @touchstart="showAlert('功能开发中')">更多</div>
        </div>
      </div>
      <loading v-model="showLoading" text="获取数据中"></loading>
      <div v-if="list&&list.length>2">
        <load-more v-if="showloadmore" :tip="tip"></load-more>
        <load-more v-else :show-loading="false" :tip="tip"></load-more>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      showLoading: false,
      henum: 0,
      starobjectarrnum: 5,
      tip: '上滑加载更多',
      showloadmore: false,
      list: [1,2,2,2,2],
      hasMore: true
    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.getPageData()
  },
  methods: {
    goEdit() {
      this.$router.push({
        name: 'FarmerInfo'
      })
    },
    showAlert(msg) {
      this.$vux.alert.show({
        title: '提示',
        content: msg,
        'mask-transition': '',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
    },
    touchStart(e) {
      // 记录按下位置
      this.startY = e.targetTouches[0].pageY
      console.log('start', this.startY)
    },
    touchEnd(e) {
      if (this.isLoading) {
        return
      }
      let endX = e.changedTouches[0].pageX
      let endY = e.changedTouches[0].pageY
      console.log('end', endY)
      let dy = this.startY - endY
      console.log('dy', dy)
      // 判断是否向上滑动
      if (dy <= 0) {
        return false
      }
      // if (dy < 2) {
      //   return 
      // }
      let scrollHeight = this.$el.scrollHeight
      const element = this.$refs.cardList
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      console.log(scrollHeight, scrollTop, this.startY, dy)
      if (this.startY + dy >= scrollHeight) {
        this.scrollToEnd(e)
      }
    },
    scrollToEnd(e) {
      let scrollHeight = this.$el.scrollHeight
      let clientHeight = this.$el.clientHeight
      let scrollTop = this.$el.scrollTop
      if (scrollTop + clientHeight >= scrollHeight && !this.showLoading && this.hasMore) {
        this.doLoadMore()
      }
    },
    doLoadMore() {
      console.log('doLoadMore')
      this.tip = '加载中...'
      this.isLoading = true
      this.showloadmore = true
      setTimeout(() => {
        this.list.push(4)
        this.list.push(4)
        this.list.push(4)
        this.list.push(4)
        this.list.push(4)
        this.isLoading = false
        this.showloadmore = false
        this.hasMore = false
        this.tip = '没有更多了'
      }, 1000)
    },
    getPageData() {
      this.$axios({
        url: this.urls().init,
        data: {
          addTime: 3,
          addressList: [
            {
              city: "1101",
              detail: "某小区",
              district: "110101",
              latitude: 15.33,
              longitude: 15.33,
              province: "11",
              town: "11010101",
              village: "1101010101",
              addressLevel: 3
            }
          ],
          customerStateCondition: "1,2,3",
          keyValue: "153",
          orderType: 1,
          sourceCondition: "1,2",
          customerBelongs: 1
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
        // init: `${process.env.URL.api}123`
        init: `http://thegisguy.cn:8085/system/customer/list`
      }
    }
  }
}
</script>

<style lang="less">
.page-farmer-list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .card-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
    .content {
      margin: 14px 12px 0;
      padding: 12px 16px;
      color: #666;
      font-size: 16px;
      background: #fff;
      border-radius: 10px;
      .line-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        font-size: 18px;
        .name {
          span {
            font-size: 16px;
            margin-left: 5px;
            color: #6fc0f0;
          }
        }
        .status {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -20px;
            margin-top: -7px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #6fc0f0;
          }
        }
      }
      .line-middle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          align-items: center;
          .title, .address {
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          .icon {
            width: 30px;
            height: 30px;
            background-image: url(../assets/img/icon_person.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .line-bottom {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        .logo {
          margin-left: 30px;
          position: relative;
          color: #999;
        }
        .logo-go::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -30px;
          margin-top: -10px;
          width: 25px;
          height: 20px;
          background-image: url(../assets/img/icon_go.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .logo-edit::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -30px;
          margin-top: -10px;
          width: 25px;
          height: 20px;
          background-image: url(../assets/img/icon_edit.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .logo-tel::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -30px;
          margin-top: -10px;
          width: 25px;
          height: 20px;
          background-image: url(../assets/img/icon_tel.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .logo-more {
          position: relative;
          margin-right: 30px;
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            right: -22px;
            margin-top: -10px;
            width: 20px;
            height: 18px;
            background-image: url(../assets/img/icon_arrow.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
