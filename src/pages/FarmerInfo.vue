<template>
  <div class="page-farmer-info">
    <group>
      <div class="inline">
        <x-input placeholder="请输入客户手机号" v-model="form.phone"></x-input>
        <div class="check-repeat">查重</div>
      </div>
    </group>
    <group title="基础信息">
      <x-input class="input-required" title="客户名称" placeholder="点击填写" text-align="right" v-model="form.custormer" required></x-input>
      <popup-picker title="客户性别" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
      <div class="inline border-top">
        <x-address style="flex:1;" class="required left-padding" title="经营地区" v-model="value1" :list="addressData" placeholder="点击选择"></x-address>
        <div class="map-button">定位</div>
      </div>
      <x-input class="input-required" title="详细经营地址" placeholder="点击填写" text-align="right" v-model="form.custormer" required></x-input>
      <popup-picker class="required" title="客户意向" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
      <popup-picker class="required" title="客户来源" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
      <popup-picker class="required person" title="归属人员" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
    </group>
    <div style="position:relative">
      <div class="add-group">添加经营历史</div>
      <group title="经营历史">
        <div class="inline">
          <div class="div-required">时间</div>
          <checker class="checker-line" v-model="demo1" @on-change="checkerChange" default-item-class="checker" selected-item-class="checker-selected">
            <checker-item value="1">2020</checker-item>
            <checker-item value="2">2019</checker-item>
            <checker-item value="3">2018</checker-item>
            <checker-item value="4">2017</checker-item>
            <checker-item value="0">更多</checker-item>
          </checker>
        </div>
        <popup-picker title="种植季" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
        <x-input class="input-required" title="包种亩数" placeholder="点击填写" text-align="right" v-model="form.custormer" required></x-input>
        <popup-picker class="required" title="种植类型" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
        <x-input title="平均单亩租金" placeholder="点击填写" text-align="right" v-model="form.custormer" required></x-input>
        <popup-picker title="种植种类" placeholder="点击选择" v-model="value1" :data=list></popup-picker>
        <div class="upload-title">经营照片</div>
        <div class="upload-line">
          <file-upload v-show="form.fileList.length==0" accept="image/*" ref="upload" @input-file="inputFile" @input-filter="inputFilter" v-model="form.fileList">
            <div class="upload-button">
              <div class="upload-icon"></div>
              <div class="upload-text">上传</div>
            </div>
          </file-upload>
          <div class="upload-preview" v-show="form.fileList.length>0">
            <img @click="showPreview('data:image/png;base64,'+form.fileList[0].fileBase64Content)" class="preview-image" v-if="form.fileList[0]&&form.fileList[0].fileBase64Content" :src="'data:image/png;base64,'+form.fileList[0].fileBase64Content" />
            <div class="close-image" v-if="form.fileList[0]&&form.fileList[0].fileBase64Content" @click="removeImage"></div>
          </div>
          <div class="upload-demo" @click="showPreview(demoImage)">
            <img class="image" :src="demoImage" />
            <div class="desc">示例图</div>
          </div>
        </div>
      </group>
    </div>
    <group title="经营履历">
      <x-input title="总经营年限" placeholder="点击填写" text-align="right" v-model="form.custormer"></x-input>
      <div class="weui-cell">备注信息</div>
      <x-textarea name="description" placeholder="请输入备注信息"></x-textarea>
    </group>
    <x-button action-type="submit">完成</x-button>
    <div v-transfer-dom>
      <popup v-model="moreYear" position="bottom" @popup-header-height=0>
        <popup-header
          left-text="取消"
          right-text="确定"
          title="选择时间"
          :show-bottom-border="false"
          @on-click-left="moreYear = false"
          @on-click-right="moreYear = false"></popup-header>
        <picker :data='years' v-model='year5'></picker>
      </popup>
    </div>
    <div v-transfer-dom>
      <x-dialog :show="showDialog" class="dialog-upload">
        <div class="img-box" style="max-width:120% !important;">
          <img :src="preImg" style="max-width:100%;padding:10px;box-sizing:border-box">
        </div>
        <div @click="showDialog=false">
          <span class="vux-close" style="margin-bottom: 10px"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { ChinaAddressV4Data, TransferDom } from 'vux'
import FileUpload from 'vue-upload-component'
import Compressimg from '@/components/Compressimg'
export default {
  name: 'HelloWorld',
  directives: {
    TransferDom
  },
  components: {
    FileUpload
  },
  data () {
    return {
      form: {
        phone: '',
        custormer: '',
        fileList: []
      },
      value: '',
      value1: [],
      list: [['男', '女']],
      options: [{
        key: 'KEY', 
        value: 'VALUE'
      }, {
        key: 'KEY2', 
        value: 'VALUE2'
      }],
      addressData: ChinaAddressV4Data,
      demo1: '',
      moreYear: false,
      year5: ['2020'],
      years: [['2020','2019']],
      demoImage: 'https://m.360buyimg.com/jrqb/jfs/t1/153403/4/3991/173788/5f9a7e32Efd280cbc/5fe9daee856512ba.png',
      scanImageCss: false,
      showDialog: false,
      preImg: ''
    }
  },
  methods: {
    showPreview(img) {
      this.showDialog = true
      this.preImg = img
    },

    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // 获得相应数据
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  获得响应状态码
          console.log('status', newFile.xhr.status)
        }
      }
    },

    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }
      if (newFile.size > 5120000) {
        // this.$toast.show('图片不能超过5M，请重新选择', { type: 'info', duration: 2000 })
        return
      }
      this.compressFile(newFile.file)
      // const reader = new FileReader()
      // reader.readAsDataURL(newFile.file)
      // reader.onload = (e) =>  {
      //   const imgs = e.target.result
      //   this.uploadFile(imgs)
      // };
    },
    removeImage() {
      this.form.fileList = []
    },
    // 压缩文件
    compressFile(files) {
      Compressimg.compress(files, {
        size: 512000,
        quality: 80,
        callback: (dataUrl) => {
          this.form.fileList = [{
            fileBase64Content: dataUrl.split(',')[1]
          }]
          this.scanImageCss = true
          // this.uploadFile(dataUrl)
        }
      })
    },
    checkerChange(value) {
      value === '0' && (this.moreYear = true)
    },
    showAlert() {
      console.log(this.form)
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
        init: `${process.env.URL.api}123`,
        upload: `${process.env.URL.api}upload`,
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '~vux/src/styles/close';
.page-farmer-info {
  padding-bottom: 60px;
  .check-repeat {
    color: #5895f7;
    margin-right: 30px;
    position: relative;
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      margin-top: -10px;
      left: -24px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-image: url(../assets/img/icon_search.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 15px;
    .map-button {
      width: 56px;
      height: 32px;
      background: #5895f7;
      color: #fff;
      line-height: 32px;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .border-top {
    border-top: 1Px solid #eee;
  }
  .left-padding {
    .weui-cell {
      padding-left: 0 !important;
    }
  }
  .weui-cell {
    padding: 16px 15px !important;
    color: #333 !important;
  }
  .input-required {
    .weui-cell__hd {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -7px;
        right: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-image: url(../assets/img/icon_star.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .required {
    .weui-cell__hd {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -7px;
        right: -16px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-image: url(../assets/img/icon_star.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .div-required {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      margin-top: -7px;
      right: -16px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-image: url(../assets/img/icon_star.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .person {
    .vux-popup-picker-value {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -15px;
        left: -40px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-image: url(../assets/img/icon_person.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .checker-line {
    padding: 16px 15px;
  }
  .checker {
    // width: 50px;
    padding: 0 10px;
    height: 30px;
    background: #eee;
    color: #666;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    font-size: 14px;
    margin-right: 5px;
  }
  .checker-selected {
    background: #5895f7;
    color: #fff;
  }
  .add-group {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 14px;
    color: #5895f7;
  }
  .upload-title {
    border-top: 1Px solid #eee;
    margin-left: 15px;
    padding: 16px 0;
  }

  .upload-line {
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    padding-left: 10px;
  }
  .upload-button {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border: 1Px dashed #DDDDDD;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .upload-icon {
      width: 24px;
      height: 24px;
      background-image: url("../assets/img/icon_add.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .upload-text {
      margin-top: 12px;
      font-weight: 400;
      font-size: 16px;
      color: #999999;
    }
  }

  .upload-preview {
    position: relative;
    width: 100px;
    height: 100px;
    cursor: pointer;
    border: 1Px dashed #DDDDDD;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .preview-image {
      width: 98px;
      height: 98px;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .close-image {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;

      //background-color: #f15151;
      //border-radius: 50%;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background-image: url("../assets/img/icon_delete.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .upload-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-left: 16px;
    width: 100px;
    height: 100px;
    border: 1Px solid #ddd;
    cursor: pointer;
    .image {
      margin-top: 4px;
      width: 90px;
      height: 66px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-color: #FFFFFF;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    }
    .desc {
      font-weight: 400;
      font-size: 16px;
      color: #999999;
      margin-top: 2px;
    }
  }
  
}
</style>
