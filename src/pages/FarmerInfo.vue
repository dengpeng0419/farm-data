<template>
  <div class="page-farmer-info">
    <group>
      <div class="inline">
        <x-input id="style1" placeholder="请输入客户手机号" v-model="form.phone"></x-input>
        <div class="check-repeat" @click="checkRepeat(form.phone)">查重</div>
      </div>
    </group>
    <group title="基础信息">
      <x-input id="style2" @on-focus="style2='color:#333'" class="s-input-required" :title='`<span style="${style2}">客户姓名</span>`' placeholder="点击填写" text-align="right" v-model="form.customerName" required></x-input>
      <popup-picker ref="picker1" @click.native="clickPicker('picker1', 'sex')" title="客户性别" placeholder="点击选择" @on-change="pickerChange" :value="sex" :data=sys_user_sex></popup-picker>
      <div class="inline border-top">
        <x-address id="style3" @on-show="style3='color:#333'" :title='`<span style="${style3}">经营地区</span>`' style="flex:1;" class="required left-padding" v-model="form.address" :list="addressData" placeholder="点击选择"></x-address>
        <div class="map-button" @click="openMapView">定位</div>
      </div>
      <x-input id="style4" @on-focus="style4='color:#333'" class="input-required" :title='`<span style="${style4}">详细经营地址</span>`' placeholder="点击填写" text-align="right" v-model="form.detail" required></x-input>
      <popup-picker id="style5" @on-show="style5='color:#333'" ref="picker2" @click.native="clickPicker('picker2', 'customerState')" class="required" 
        :title='`<span style="${style5}">客户意向</span>`' placeholder="点击选择" @on-change="pickerChange" :value="customerState" :data=customer_intention></popup-picker>
      <popup-picker id="style6" @on-show="style6='color:#333'" ref="picker3" @click.native="clickPicker('picker3', 'source')" class="required" 
        :title='`<span style="${style6}">客户来源</span>`' placeholder="点击选择" @on-change="pickerChange" :value="source" :data=customer_source></popup-picker>
      <popup-picker id="style7" @on-show="style7='color:#333'" ref="picker4" @click.native="clickPicker('picker4', 'maintainMan')" class="required person" 
        :title='`<span style="${style7}">归属人员</span>`' placeholder="点击选择" @on-change="pickerChange" :value="maintainMan" :data=personList></popup-picker>
    </group>
    <div style="position:relative">
      <div class="add-group" @click="addHistory">添加经营历史</div>
      <group title="经营历史" v-for="(item,index) in uploadForm" :key=index>
        <div class="inline">
          <div class="div-required" :id="`style01${index}`" :style="`${uploadForm[index].style1}`">时间</div>
          <checker class="checker-line" v-model="uploadForm[index].operateYear" @on-change="getOperateYear" default-item-class="checker" selected-item-class="checker-selected">
            <checker-item value="2020">2020</checker-item>
            <checker-item value="2019">2019</checker-item>
            <checker-item value="2018">2018</checker-item>
            <checker-item value="2017">2017</checker-item>
            <checker-item value="0" @click.native="moreYearChange(index)">更多</checker-item>
          </checker>
        </div>
        <popup-picker title="种植季" placeholder="点击选择" v-model="uploadForm[index].operateQuarter" :data=plant_quarter></popup-picker>
        <x-input :id="`style02${index}`" @on-focus="uploadForm[index].style2='color:#333'"  class="s-input-required" :title='`<span style="${uploadForm[index].style2}">包种亩数</span>`' 
          placeholder="点击填写" text-align="right" v-model="uploadForm[index].operateNum" required></x-input>
        <popup-picker :id="`style03${index}`" @on-show="uploadForm[index].style3='color:#333'" class="required" :title='`<span style="${uploadForm[index].style3}">种植类型</span>`' 
          placeholder="点击选择" v-model="uploadForm[index].plantingType" :data=planting_type></popup-picker>
        <x-input title="平均单亩租金" placeholder="点击填写" text-align="right" v-model="uploadForm[index].averageRent" required></x-input>
        <popup-picker title="种植种类" placeholder="点击选择" v-model="uploadForm[index].plantingSubType" :data=planting_sub_type></popup-picker>
        <div class="upload-title">经营照片</div>
        <div class="upload-line">
          <file-upload v-show="!uploadForm[index].fileList" accept="image/*" ref="upload" @click.native="clickUpload(index)" @input-file="inputFile" @input-filter="inputFilter">
            <div class="upload-button">
              <div class="upload-icon"></div>
              <div class="upload-text">上传</div>
            </div>
          </file-upload>
          <div class="upload-preview" v-show="uploadForm[index].fileList">
            <img @click="showPreview('data:image/png;base64,'+uploadForm[index].fileList)" class="preview-image" :src="'data:image/png;base64,'+uploadForm[index].fileList" />
            <div class="close-image" @click="removeImage"></div>
          </div>
          <div class="upload-demo" @click="showPreview(demoImage)">
            <img class="image" :src="demoImage" />
            <div class="desc">示例图</div>
          </div>
        </div>
        <div class="delete-line" @click="deleteLine(index)" v-if="index>0">删除经营历史</div>
      </group>
    </div>
    <group title="经营履历">
      <x-input title="总经营年限" placeholder="点击填写" text-align="right" v-model="form.operateDuration"></x-input>
      <div class="weui-cell">备注信息</div>
      <x-textarea name="description" placeholder="请输入备注信息" v-model="form.remark"></x-textarea>
    </group>
    <div class="inline-button">
      <x-button plain>取消</x-button>
      <x-button class="save-button" type="primary" @click.native="save">保存</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="moreYear" position="bottom" @popup-header-height=0>
        <popup-header
          left-text="取消"
          right-text="确定"
          title="选择时间"
          :show-bottom-border="false"
          @on-click-left="moreYear = false"
          @on-click-right="moreYear = false"></popup-header>
        <picker :data='moreYearList' v-model='moreYearOne' @on-change="chooseMoreYear"></picker>
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
    <div v-transfer-dom>
      <popup v-model="showMap" height="100%" style="overflow:hidden" position="bottom" @popup-header-height=0>
        <popup-header
          left-text="取消"
          right-text="确定"
          title="选择位置"
          :show-bottom-border="false"
          @on-click-left="showMap = false"
          @on-click-right="showMap = false"></popup-header>
        <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint">
          <bm-view style="width: 100%; height:100vh;"></bm-view>
          <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
        </baidu-map>
        <div style="position:absolute; bottom:0: left:0; width: 100%; background:#fff; padding:10px;">{{address}}</div>
      </popup>
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
        sex: [],
        phone: '',
        customerName: '',
        customerState: [],
        address: [],
        detail: '',
        source: [],
        maintainMan: [],
        fileList: [],
        operateDuration: '',
        remark: ''
      },
      uploadForm: [{
        operateYear: '',
        operateQuarter: [],
        operateNum: '',
        plantingType: [],
        averageRent: '',
        plantingSubType: [],
        fileList: '',
        style1: '',
        style2: '',
        style3: ''
      }],
      sex: [],
      customerState: [],
      source: [],
      maintainMan: [],
      fileUrlList: [],
      value: '',
      value1: [],
      list: [['男', '女']],
      sys_user_sex: [[{
        name: '男',
        value: '0'
      }, {
        name: '女',
        value: '1'
      }]],
      customer_intention: [[{
        name: '需进一步跟进',
        value: '1'
      }, {
        name: '意向强',
        value: '2'
      }, {
        name: '意向一般',
        value: '3'
      }, {
        name: '意向弱',
        value: '4'
      }]],
      customer_source: [[{
        name: '电话营销',
        value: '1'
      }, {
        name: '主动来电',
        value: '2'
      }, {
        name: '客户介绍',
        value: '3'
      }, {
        name: '朋友介绍',
        value: '4'
      }, {
        name: '独立开发',
        value: '5'
      }, {
        name: '政府开发',
        value: '6'
      }, {
        name: '政府介绍',
        value: '7'
      }, {
        name: '展会促销',
        value: '8'
      }, {
        name: '其他途径',
        value: '9'
      }]],
      personList: [[{
        name: '赵小刚',
        value:  '233'
      }]],
      plant_quarter: [['第一季','第二季','第三季']],
      planting_type: [['粮食作物','经济作物']],
      planting_sub_type: [['禾谷类作物','豆类作物','薯芋类作物','纤维作物','油料作物',]],
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
      moreYearOne: [],
      moreYearList: [['2020','2019']],
      demoImage: 'https://m.360buyimg.com/jrqb/jfs/t1/153403/4/3991/173788/5f9a7e32Efd280cbc/5fe9daee856512ba.png',
      scanImageCss: false,
      showDialog: false,
      preImg: '',
      style1: '',
      style2: '',
      style3: '',
      style4: '',
      style5: '',
      style6: '',
      style7: '',
      checkStyle: ['phone', 'customerName', 'customerState', 'address', 'detail', 'source', 'maintainMan'],
      chooseRef: '',
      chooseProp: '',
      fileListName: 'fileList',
      chooseFile: -1,
      operateLine: -1,
      location: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 12.8,
      addressKeyword: '',
      address: '123',
      district: "江宁区", 
      city: "南京市", 
      province: "江苏省",
      showMap: false
    }
  },
  mounted() {
    this.getPageData()
  },
  methods: {
    checkRepeat(phone) {
      const reg = /^1\d{10}$/
      if (!phone) {
        this.showAlert('请输入手机号')
      } else if (!reg.test(phone)) {
        this.showAlert('请输入正确的手机号')
      }
    },
    openMapView() {
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((res) => {
        this.location = res.point
        this.showMap = true
      }, {enableHighAccuracy: true})
    },
    getLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder()
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, point => {
        this.selectedLng = point.lng
        this.selectedLat = point.lat
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, res => {
        console.log(res);
        this.address = res.address
        this.province = res.addressComponents.province
        this.city = res.addressComponents.city
        this.district = res.addressComponents.district
      })
    },
    addHistory() {
      this.uploadForm.push({style1: ''})
    },
    deleteLine(index) {
      this.uploadForm.splice(index, 1)
    },
    clickUpload(index) {
      this.chooseFile = index
    },
    clickPicker(name, prop) {
      this.chooseRef = name
      this.chooseProp = prop
    },
    pickerChange(value) {
      this.$refs[this.chooseRef].getNameValues() && (this[this.chooseProp] = [this.$refs[this.chooseRef].getNameValues()])
      this.$refs[this.chooseRef].getNameValues() && (this.form[this.chooseProp] = value)
    },
    moreChange() {
      console.log(333)
    },
    save() {
      let error = false
      for (let i = 1; i < 8; i++) {
        const value = this.form[this.checkStyle[i-1]]
        if (value == undefined || value.length === 0) {
          !error && document.getElementById(`style${i}`).scrollIntoView()
          error = true
          this[`style${i}`] = 'color:red;'
        }
      }
      for (let j = 0; j < this.uploadForm.length; j++) {
        if (this.uploadForm[j].operateYear == undefined || this.uploadForm[j].operateYear.length === 0) {
          !error && document.getElementById(`style01${j}`).scrollIntoView()
          error = true
          this.uploadForm[j].style1 = 'color: red'
        } else if (this.uploadForm[j].operateNum == undefined || this.uploadForm[j].operateNum.length === 0) {
          !error && document.getElementById(`style02${j}`).scrollIntoView()
          error = true
          this.uploadForm[j].style2 = 'color: red'
        } else if (this.uploadForm[j].plantingType == undefined || this.uploadForm[j].plantingType.length === 0) {
          !error && document.getElementById(`style03${j}`).scrollIntoView()
          error = true
          this.uploadForm[j].style3 = 'color: red'
        }
      }
    },
    showPreview(fileList) {
      this.showDialog = true
      this.preImg = fileList
      console.log(this.form)
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
          // this.form.fileList = [{
          //   fileBase64Content: dataUrl.split(',')[1]
          // }]
          this.uploadForm[this.chooseFile].fileList = dataUrl.split(',')[1]
          this.uploadForm = JSON.parse(JSON.stringify(this.uploadForm))
          this.scanImageCss = true
          // this.uploadFile(dataUrl)
        }
      })
    },
    getOperateYear(value) {
      this.uploadForm[0].style1 = 'color: #333'
      value === '0' && (this.moreYear = true)
      console.log(this.uploadForm)
    },
    moreYearChange(index) {
      this.operateLine = index
    },
    chooseMoreYear(value) {
      this.uploadForm[this.operateLine].operateYear = value[0]
      console.log(this.uploadForm)
    },
    showAlert(msg) {
      this.$vux.alert.show({
        title: '提示',
        content: msg,
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
        init: `http://thegisguy.cn:8085/system/point/edit/1`,
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
  .s-input-required {
    .weui-cell__hd {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -7px;
        right: 16px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-image: url(../assets/img/icon_star.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
  .input-required {
    .weui-cell__hd {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -7px;
        right: -12px;
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
  .inline-button {
    display: flex;
    margin: 15px;
    .weui-btn + .weui-btn {
      margin-top: 0 !important;
    }
    .save-button {
      margin-left: 20px;
    }
  }
  .delete-line {
    text-align: center;
    color: #f47983;
    padding-bottom:10px;
  }
}
</style>
