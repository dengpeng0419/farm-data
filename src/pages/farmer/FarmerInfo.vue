<template>
  <div class="page-farmer-info">
    <group>
      <div class="inline">
        <x-input id="style1" placeholder="请输入客户手机号" v-model="form.phone" is-type="china-mobile"></x-input>
        <div class="check-repeat" @click="checkRepeat(form.phone)">查重</div>
      </div>
    </group>
    <group title="基础信息">
      <x-input id="style2" @on-focus="style2='color:#333'" class="s-input-required" :title='`<span style="${style2}">客户姓名</span>`' placeholder="点击填写" text-align="right" v-model="form.customerName" required></x-input>
      <popup-picker  title="客户性别" placeholder="点击选择" show-name v-model="form.sex" :data=sys_user_sex></popup-picker>
      <div class="inline border-top">
        <cell id="style3" @on-show="style3='color:#333'" @click.native="showAddress=true" title='经营地区' style="flex:1; margin-left: -15px" class="cell-required" 
          :value="`${province}${city}${district}${town}${village}`" is-link></cell>
        <div class="map-button" @click="openMapView">定位</div>
      </div>
      <x-input id="style4" @on-focus="style4='color:#333'" class="input-required" :title='`<span style="${style4}">详细经营地址</span>`' placeholder="点击填写" 
        text-align="right" v-model="form.detail" required></x-input>
      <popup-picker id="style5" @on-show="style5='color:#333'" class="required" show-name
        :title='`<span style="${style5}">客户意向</span>`' placeholder="点击选择" v-model="form.customerState" :data=customer_intention></popup-picker>
      <popup-picker id="style6" @on-show="style6='color:#333'" class="required" show-name
        :title='`<span style="${style6}">客户来源</span>`' placeholder="点击选择" v-model="form.source" :data=customer_source></popup-picker>
      <popup-picker id="style7" @on-show="style7='color:#333'" class="required person" show-name
        :title='`<span style="${style7}">归属人员</span>`' placeholder="点击选择" v-model="form.maintainMan" :data=personList></popup-picker>
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
        <popup-picker title="种植季" placeholder="点击选择" show-name v-model="uploadForm[index].operateQuarter" :data=plant_quarter></popup-picker>
        <x-input :id="`style02${index}`" @on-focus="uploadForm[index].style2='color:#333'"  class="s-input-required" :title='`<span style="${uploadForm[index].style2}">包种亩数</span>`' 
          placeholder="点击填写" text-align="right" v-model="uploadForm[index].operateNum" required></x-input>
        <popup-picker :id="`style03${index}`" show-name @on-show="uploadForm[index].style3='color:#333'" class="required" :title='`<span style="${uploadForm[index].style3}">种植类型</span>`' 
          placeholder="点击选择" v-model="uploadForm[index].plantingType" :data=planting_type></popup-picker>
        <x-input title="平均单亩租金" placeholder="点击填写" text-align="right" v-model="uploadForm[index].averageRent" required></x-input>
        <popup-picker title="种植种类" placeholder="点击选择" @on-change="showForm" :columns="2" show-name v-model="uploadForm[index].plantingSubType" :data=planting_sub_type></popup-picker>
        <div class="upload-title">经营照片</div>
        <div class="upload-line">
          <file-upload v-show="!uploadForm[index].fileList" accept="image/*" ref="upload" @click.native="clickUpload(index)" @input-file="inputFile" @input-filter="inputFilter">
            <div class="upload-button">
              <div class="upload-icon"></div>
              <div class="upload-text">上传</div>
            </div>
          </file-upload>
          <div class="upload-preview" v-show="uploadForm[index].fileList">
            <img @click="showPreview(uploadForm[index].fileList)" class="preview-image" :src="uploadForm[index].fileList" />
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
      <x-textarea name="description" placeholder="请输入备注信息" v-model="form.remark" :max="300"></x-textarea>
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
        <div style="max-width:120% !important;">
          <img :src="preImg" style="max-width:100%;padding:10px;box-sizing:border-box">
        </div>
        <div @click="showDialog=false">
          <span class="vux-close" style="margin-bottom: 10px"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <popup v-model="showAddress" height="100%" position="bottom" @popup-header-height=0 @on-show="getProvince('init')">
        <popup-header
          style="position:fixed; top:0; left:0; width:100%; z-index:999"
          left-text="取消"
          right-text="确定"
          title="选择位置"
          :show-bottom-border="false"
          @on-click-left="showAddress = false"
          @on-click-right="chooseAddress"></popup-header>
        <div style="position:fixed; top:44px; left:0; width:100%; height:44px; font-size: 18px; line-height:44px; padding-left:15px; z-index:999; background:#ddd">
          {{this.province}}{{this.city}}{{this.district}}{{this.town}}{{this.village}}
        </div>
        <checklist style="margin-top:88px" label-position="left" :options="addressOptionList" v-model="addressValue" :max="1" @on-change="addressOptionChange"></checklist>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="showMap" height="100%" style="overflow:hidden" position="bottom" @popup-header-height=0>
        <popup-header
          left-text="取消"
          right-text="确定"
          title="选择位置"
          :show-bottom-border="false"
          @on-click-left="showMap = false"
          @on-click-right="chooseMapAddress"></popup-header>
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
import axios from 'axios'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
import plantingType from '../../assets/data/planting_type.json'
// // import { BMPGL } from "@/components/map.js";

Vue.use(VueJsonp)

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
        address: 'default',
        detail: '',
        source: [],
        maintainMan: [],
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
      showAddress: false,
      addressOptionList: [],
      addressValue: [],
      addressType: 0,
      addressId: 0,
      fileUrlList: [],
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
        name: sessionStorage.getItem('userName'),
        value:  sessionStorage.getItem('userId')
      }]],
      plant_quarter: [[{
        name: '第一季',
        value: '1'
      }, {
        name: '第二季',
        value: '2'
      }, {
        name: '第三季',
        value: '3'
      }]],
      planting_type: [[{
        name:'粮食作物',
        value: '1'
      }, {
        name: '经济作物',
        value: '2'
      }]],
      planting_sub_type: plantingType,
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
      checkStyle: ['phone', 'customerName', 'address', 'detail', 'customerState', 'source', 'maintainMan'],
      chooseRef: '',
      chooseProp: '',
      fileListName: 'fileList',
      chooseFile: 0,
      operateLine: 0,
      location: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 12.8,
      addressKeyword: '',
      address: '',
      district: '',
      city: '',
      province: '点击选择',
      town: '',
      village: '',
      showMap: false
    }
  },
  mounted() {
    console.log(plantingType)
    if (this.$route.name === 'FarmerInfo') {
      this.customerId = this.$route.query.id
      this.getPageData()
    }
  },
  methods: {
    showForm() {
      console.log(this.uploadForm[0].plantingSubType)
    },
    chooseAddress() {
      this.showAddress = false
    },
    chooseMapAddress() {
      this.showMap = false
      this.provinceCode && (this.form.address = [this.provinceCode, this.cityCode, this.districtCode])
    },
    addressOptionChange(value, label) {
      console.log(value, label)
      if (!value[0]) {
        return
      }
      this.addressId = value[0]
      this.addressId = value[0]
      if (this.addressType === 1) {
        this.province = label[0]
        this.provinceCode = value[0]
      }
      if (this.addressType === 2) {
        this.city = label[0]
        this.cityCode = value[0]
      }
      if (this.addressType === 3) {
        this.district = label[0]
        this.districtCode = value[0]
      }
      if (this.addressType === 4) {
        this.town = label[0]
        this.townCode = value[0]
      }
      if (this.addressType === 5) {
        this.village = label[0]
        this.villageCode = value[0]
      }
      this.address = this.province + this.city + this.district + this.town + this.village
      this.getProvince()
    },
    getProvince(param) {
      param === 'init' && (this.addressType = 0)
      this.$axios({
        url: 'http://thegisguy.cn:8085/util/area?parentAreaId=' + this.addressId
      }).then(json => {
        const data = json || []
        if (data.length === 0) {
          this.showAddress = false
          return
        }
        this.addressType ++
        this.addressOptionList = []
        data.map(item => {
          const obj = {}
          obj.key = item.areaCode
          obj.value = item.areaName
          this.addressOptionList.push(obj)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    checkRepeat(phone) {
      const reg = /^1\d{10}$/
      if (!phone) {
        this.showAlert('请输入手机号')
      } else if (!reg.test(phone)) {
        this.showAlert('请输入正确的手机号')
      } else {
        this.checkPhone(phone)
      }
    },
    checkPhone(phone) {
      this.$axios({
        url: this.urls().checkPhone+'?phoneNum='+phone+'&tableNum=1'
      }).then(json => {
        console.log(json)
        this.showAlert('当前存在'+json+'个电话号码')
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
      this.$jsonp('https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&pois=1' , {
        ak: 'ZwTVu16RLXjhW7FHDjYt5HfMnR1dhFpR',
        location: this.lat + ',' + this.lng
      }).then((res)=>{
      　console.log(res)
        const data = res.result || {}
        this.address = data.formatted_address
        this.province = data.addressComponent.province
        this.city = data.addressComponent.city
        this.district = data.addressComponent.district
        this.street = data.addressComponent.street
        this.town = data.addressComponent.town

        this.province && (this.addressLevel = 1)
        this.city && (this.addressLevel = 2)
        this.district && (this.addressLevel = 3)
        this.street && (this.addressLevel = 4)
        this.town && (this.addressLevel = 5)

        const adcode = data.addressComponent.adcode
        this.provinceCode = adcode/10000
        this.cityCode = adcode/100
        this.districtCode = adcode
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
          !error && document.getElementById(`style${i}`) && document.getElementById(`style${i}`).scrollIntoView()
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
        obj.plantingThirdType = item.plantingSubType[1]
        obj.operatePictureUrl = item.fileUrl
        operateInfoDetails.push(obj)
      })
      const data = {
        customerId: this.customerId || undefined,
        addressList: [{
          addressType : 2,
          city: this.cityCode,
          detail: this.form.detail,
          district: this.districtCode,
          latitude: 0,
          longitude: 0,
          province: this.provinceCode,
          remark: '',
          town: this.townCode,
          village: this.villageCode,
          addressLevel: 5
        }],
        customerName: this.form.customerName,
        customerState: this.form.customerState[0],
        customerType: this.form.customerType || 1,
        maintainMan: this.form.maintainMan[0],
        operateInfo: {
          operateInfold: this.form.operateInfoId,
          operateDuration: this.form.operateDuration,
          operateRemark: this.form.remark
        },
        operateInfoDetails: operateInfoDetails,
        phone: this.form.phone,
        remark: this.form.remark,
        sex: this.form.sex[0],
        source: this.form.source[0]
      }

      this.$axios({
        url: this.$route.name === 'FarmerInfo' ? this.urls().edit : this.urls().add,
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
      fileList.indexOf('https://') < 0 && (fileList = 'data:image/png;base64,' + fileList)
      this.showDialog = true
      this.preImg = fileList
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
        this.uploadForm[this.chooseFile].fileList = json
      }).catch(err => {
        this.pageShow = true
      })
    },
    getOperateYear(value) {
      this.uploadForm[this.operateLine].style1 = 'color: #333'
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
    getPageData() {
      this.$axios({
        url: this.urls().init + this.customerId
      }).then(json => {
        const data = json || {}
        this.handleInitPage(data)
      }).catch(err => {
        this.pageShow = true
      })
    },
    handleInitPage(data) {
      console.log(data)
      this.form.sex = [data.sex + '']
      this.form.phone = data.phone
      this.form.customerName = data.customerName
      this.form.customerState = [data.customerState + '']
      this.form.address = [data.addressList[0].province, data.addressList[0].city, data.addressList[0].district]
      this.form.detail = data.addressList[0].detail
      this.form.source = [data.source + '']
      this.form.maintainMan = [data.maintainMan + '']
      this.form.operateDuration = data.operateInfo.operateDuration
      this.form.remark = data.operateInfo.operateRemark
      this.form.operateInfoId = data.operateInfo.operateInfoId
      const history = data.operateInfoDetails || []
      for(let i = 0; i < history.length - 1; i++) {
        i > 0 && this.uploadForm.push({
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
      }
      history.map((item, index) => {
        this.uploadForm[index].averageRent = item.averageRent
        this.uploadForm[index].operateYear = item.operateYear
        this.uploadForm[index].operateQuarter = [item.operateQuarter + '']
        this.uploadForm[index].operateNum = item.operateNum
        this.uploadForm[index].plantingType = [item.plantingType + '']
        this.uploadForm[index].averageRent = item.averageRent
        this.uploadForm[index].plantingSubType = [item.plantingSubType + '']
        if(item.operatePictureUrl.indexOf(',') > -1) {
          this.uploadForm[index].fileList = item.operatePictureUrl.split(',')[0]
        } else {
          this.uploadForm[index].fileList = item.operatePictureUrl
        }
      })
      const addressList = data.addressList || []
      addressList.map(item => {
        if (item.addressType === 2) { // 经营地址
          this.province = item.provinceName
          this.provinceCode = item.province
          this.city = item.cityName
          this.cityCode = item.city
          this.district = item.districtName
          this.districtCode = item.district
          this.town = item.townName
          this.townCode = item.town
          this.village = item.villageName
          this.villageCode = item.village
        }
      })
    },
    getListName(value) {
      this.sys_user_sex.map(item => {
        if (item.value == value) {
          return item.name
        }
      })
    },
    urls() {
      return {
        init: `http://thegisguy.cn:8085/system/customer/queryOne?customerId=`,
        upload: `http://thegisguy.cn:8085/commom/file/uploadPhoto`,
        edit: `http://thegisguy.cn:8085/system/customer/edit`,
        add: 'http://thegisguy.cn:8085/system/customer/add',
        checkPhone: `http://thegisguy.cn:8085/util/exist`
        // upload: `${process.env.URL.api}upload`,
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
    .weui-cell__bd {
      padding-left: 10px;
    }
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
  .cell-required {
    .weui-cell__ft {
      max-width: 120px;
      overflow: scroll;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .vux-cell-bd {
      position: relative;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        margin-top: -7px;
        left: 75px;
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
  .address-content {
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    // height: 100vh;
    overflow-y: scroll;
    .addressTitle {
      flex: 1;
    }
  }
}
</style>
