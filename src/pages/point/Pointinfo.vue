<template>
  <div class="page-point-info">
    <group>
      <div class="inline">
        <x-input id="style1" placeholder="请输入客户手机号" v-model="form.connectPhone"></x-input>
        <div class="check-repeat" @click="checkRepeat(form.connectPhone)">查重</div>
      </div>
    </group>
    <group title="基础信息">
      <x-input id="style2" @on-focus="style2='color:#333'" class="s-input-required" :title='`<span style="${style2}">服务商名称</span>`' placeholder="点击填写" text-align="right" v-model="form.servicePointName" required></x-input>
      <popup-picker  title="经营状态" placeholder="点击选择" show-name v-model="form.seviceState" :data=sevice_state></popup-picker>
      <div class="inline border-top">
        <x-address id="style3" @on-show="style3='color:#333'" @on-shadow-change="showForm" :title='`<span style="${style3}">经营地区</span>`' style="flex:1;" class="required left-padding" v-model="form.address" :list="addressData" placeholder="点击选择"></x-address>
        <div class="map-button" @click="openMapView">定位</div>
      </div>
      <x-input id="style4" @on-focus="style4='color:#333'" class="input-required" :title='`<span style="${style4}">详细经营地址</span>`' placeholder="点击填写" text-align="right" v-model="form.detail" required></x-input>
      <popup-picker id="style5" @on-show="style5='color:#333'" class="required" show-name
        :title='`<span style="${style5}">企业类型</span>`' placeholder="点击选择" v-model="form.enterpriseType" :data=enterprise_type></popup-picker>
      <datetime id="style6" title="成立日期" placeholder="点击选择" show-name v-model="form.registerDate"></datetime>
      <datetime id="style7" title="经营期限" placeholder="点击选择" show-name v-model="form.operateDuration"></datetime>
      <x-address id="style8" title="服务区域" placeholder="点击选择" show-name v-model="form.serviceArea" :list="addressData"></x-address>
      <popup-picker id="style9" title="主营产品" placeholder="点击选择" show-name v-model="form.mainProduct" :data=main_product></popup-picker>
      <popup-picker id="style10" title="农技能力" placeholder="点击选择" show-name v-model="form.agriculturalAbility" :data=agricultural_ability></popup-picker>
      <popup-picker id="style11" @on-show="style7='color:#333'" class="required" show-name
        :title='`<span style="${style7}">合作意向</span>`' placeholder="点击选择" v-model="form.coperationIntention" :data=customer_intention></popup-picker>
      <x-input id="style12" title="公司法人" placeholder="点击填写" text-align="right" v-model="form.personInCharge" required></x-input>
      <x-input id="style13" @on-focus="style13='color:#333'"  class="s-input-required" :title='`<span style="${style13}">联系人</span>`' 
          placeholder="点击填写" text-align="right" v-model="form.connectName" required></x-input>
      <div id="style14" class="upload-title">经营照片</div>
      <div class="upload-line">
        <file-upload v-show="!form.fileList" accept="image/*" ref="upload" @click.native="clickUpload(index)" @input-file="inputFile" @input-filter="inputFilter">
          <div class="upload-button">
            <div class="upload-icon"></div>
            <div class="upload-text">上传</div>
          </div>
        </file-upload>
        <div class="upload-preview" v-show="form.fileList">
          <img @click="showPreview('data:image/png;base64,'+form.fileList)" class="preview-image" :src="'data:image/png;base64,'+form.fileList" />
          <div class="close-image" @click="removeImage"></div>
        </div>
        <div class="upload-demo" @click="showPreview(demoImage)">
          <img class="image" :src="demoImage" />
          <div class="desc">示例图</div>
        </div>
      </div>
      <popup-picker id="style15" @on-show="style15='color:#333'" class="required" show-name
        :title='`<span style="${style9}">客户来源</span>`' placeholder="点击选择" v-model="form.source" :data=customer_source></popup-picker>
      <popup-picker id="style16" @on-show="style16='color:#333'" class="required person" show-name
        :title='`<span style="${style7}">归属人员</span>`' placeholder="点击选择" v-model="form.maintainMan" :data=personList></popup-picker>
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
        <div style="position:absolute; bottom:0; left:0; width: 100%; background:#fff; padding:10px;">{{address}}</div>
      </popup>
    </div>
  </div>
</template>

<script>
import { ChinaAddressV4Data, TransferDom } from 'vux'
import FileUpload from 'vue-upload-component'
import Compressimg from '@/components/Compressimg'
import Upload from '@/components/upload'

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
        seviceState: [],
        connectPhone: '',
        servicePointName: '',
        enterpriseType: [],
        address: [],
        detail: '',
        registerDate: '',
        operateDuration: '',
        serviceArea: [],
        mainProduct: [],
        agriculturalAbility: [],
        coperationIntention: [],
        personInCharge: '',
        connectName: '',
        fileList: '',
        source: [],
        maintainMan: []
      },
      fileUrlList: [],
      sevice_state: [[{
        name: '续存',
        value: '1'
      }, {
        name: '在业',
        value: '2'
      }, {
        name: '吊销',
        value: '3'
      }, {
        name: '注销',
        value: '4'
      }, {
        name: '迁入',
        value: '5'
      }, {
        name: '迁出',
        value: '6'
      }, {
        name: '停业',
        value: '7'
      }, {
        name: '清算',
        value: '8'
      }]],
      enterprise_type: [[{
        name: '个体工商户',
        value: '1'
      }, {
        name: '私营企业',
        value: '2'
      }, {
        name: '国有企业',
        value: '3'
      }, {
        name: '其他',
        value: '4'
      }]],
      main_product: [[{
        name: '化肥',
        value: '1'
      }, {
        name: '农药',
        value: '2'
      }, {
        name: '种子',
        value: '3'
      }, {
        name: '农机',
        value: '4'
      }, {
        name: '农技',
        value: '5'
      }, {
        name: '飞防',
        value: '6'
      }]],
      agricultural_ability: [[{
        name: '育苗',
        value: '1'
      }, {
        name: '病虫害',
        value: '2'
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
      personList: [[{
        name: '赵小刚',
        value:  '1'
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
      addressData: ChinaAddressV4Data,
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
      style8: '',
      style9: '',
      style10: '',
      style11: '',
      style12: '',
      style13: '',
      style14: '',
      style15: '',
      style16: '',
      checkStyle: ['connectPhone', 'servicePointName', 'address', 'detail', 'enterpriseType', 'mainProduct', 'coperationIntention'],
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
      address: '',
      district: "江宁区", 
      city: "南京市", 
      province: "江苏省",
      showMap: false
    }
  },
  mounted() {
    if (this.$route.name === 'PointInfo') {
      this.getPageData()
    }
  },
  methods: {
    showForm() {
      console.log(this.form)
    },
    checkRepeat(connectPhone) {
      const reg = /^1\d{10}$/
      if (!connectPhone) {
        this.showAlert('请输入手机号')
      } else if (!reg.test(connectPhone)) {
        this.showAlert('请输入正确的手机号')
      } else {
        this.checkconnectPhone(connectPhone)
      }
    },
    checkconnectPhone(connectPhone) {
      this.$axios({
        url: this.urls().checkconnectPhone+'?connectPhoneNum='+connectPhone+'&tableNum=1'
      }).then(json => {
        console.log(json)
        // this.uploadForm[this.chooseFile].fileUrl = json
      }).catch(err => {
        this.pageShow = true
      })
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
      this.uploadForm.push({
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
      })
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
      error == false && this.saveForm()
    },
    saveForm() {
      const operateInfoDetails = []
      this.uploadForm.map(item => {
        const obj = {}
        obj.operateYear = item.operateYear
        obj.operateQuarter = item.operateQuarter[0]
        obj.operateNum = item.operateNum
        obj.plantingType = item.plantingType[0]
        obj.averageRent = item.averageRent
        obj.plantingSubType = item.plantingSubType[0]
        obj.operatePictureUrl = item.fileList
        operateInfoDetails.push(obj)
      })
      const data = {
        customerId: 1,
        addressList: [{
          addressType : 0,
          city: this.form.address[1],
          detail: this.form.detail,
          district: this.form.address[2],
          latitude: 0,
          longitude: 0,
          province: this.form.address[0],
          remark: '',
          town: 'string',
          village: 'string'
        }],
        servicePointName: this.form.servicePointName,
        enterpriseType: this.form.enterpriseType[0],
        customerType: this.form.customerType,
        coperationIntention: this.form.coperationIntention[0],
        operateInfo: {
          operateInfold: this.form.operateInfoId,
          operateDuration: this.form.operateDuration,
          operateRemark: this.form.remark
        },
        operateInfoDetails: operateInfoDetails,
        connectPhone: this.form.connectPhone,
        remark: this.form.remark,
        seviceState: this.form.seviceState[0],
        mainProduct: this.form.mainProduct[0]
      }

      this.$axios({
        url: this.urls().save,
        data: data
      }).then(json => {
        this.$router.replace({
          name: 'FarmerList'
        })
        // this.uploadForm[this.chooseFile].fileUrl = json
      }).catch(err => {
        this.pageShow = true
      })
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
      console.log(files)
      Compressimg.compress(files, {
        size: 512000,
        quality: 80,
        callback: (dataUrl) => {
          console.log(dataUrl)
          const ab = Upload.blobutil.base64ToArrayBuffer(dataUrl);
          if (ab.length >= 4096000) {
              this.showAlert('图片不能超过4M，请重新选择');
              return;
          }
          // const blob = Upload.blobutil.Blob([ab], {
          //     type: 'image/jpeg'
          // });
          // data.append('files', blob);
          const data = new FormData();
          data.append('files', files);
          this.uploadForm[this.chooseFile].fileList = dataUrl.split(',')[1]
          this.uploadForm = JSON.parse(JSON.stringify(this.uploadForm))
          this.uploadFile(data)
        }
      })
    },
    uploadFile(data) {
      this.$axios({
        contentType: false,
        url: this.urls().upload,
        data: data
      }).then(json => {
        this.uploadForm[this.chooseFile].fileUrl = json
      }).catch(err => {
        this.pageShow = true
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
        url: this.urls().init
      }).then(json => {
        const data = json || {}
        this.handleInitPage(data)
      }).catch(err => {
        this.pageShow = true
      })
    },
    handleInitPage(data) {
      console.log(data)
      this.form.seviceState = [data.seviceState + '']
      this.form.connectPhone = data.connectPhone
      this.form.servicePointName = data.servicePointName
      this.form.enterpriseType = [data.enterpriseType + '']
      this.form.address = [data.addressList[0].province, data.addressList[0].city, data.addressList[0].district]
      this.form.detail = data.addressList[0].detail
      this.form.registerDate = data.registerDate
      this.form.serviceArea = [data.serviceArea]
      this.form.mainProduct = [data.mainProduct + '']
      this.form.agriculturalAbility = [data.agriculturalAbility + '']
      this.form.coperationIntention = [data.coperationIntention + '']
      this.form.operateDuration = data.operateDuration
      this.form.personInCharge = data.personInCharge
      this.form.connectName = data.connectName
      this.form.source = [data.source + '']
      this.form.maintainMan = [data.maintainMan + '']
    },
    getListName(value) {
      this.sys_user_seviceState.map(item => {
        if (item.value == value) {
          return item.name
        }
      })
    },
    urls() {
      return {
        init: `http://thegisguy.cn:8085/system/point/queryOne?servicePointId=1`,
        upload: `http://thegisguy.cn:8085/commom/file/uploadPhoto`,
        save: `http://thegisguy.cn:8085/system/customer/edit`,
        checkconnectPhone: `http://thegisguy.cn:8085/util/exist`
        // upload: `${process.env.URL.api}upload`,
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '~vux/src/styles/close';
.page-point-info {
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
      background-image: url(../../assets/img/icon_search.png);
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
        background-image: url(../../assets/img/icon_star.png);
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
        background-image: url(../../assets/img/icon_star.png);
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
        background-image: url(../../assets/img/icon_star.png);
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
      background-image: url(../../assets/img/icon_star.png);
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
        background-image: url(../../assets/img/icon_person.png);
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
      background-image: url("../../assets/img/icon_add.png");
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
        background-image: url("../../assets/img/icon_delete.png");
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
