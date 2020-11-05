<template>
  <div class="page-point-info">
    <group>
      <div class="inline">
        <x-input id="style1" placeholder="请输入客户手机号" v-model="form.connectPhone"></x-input>
        <div class="check-repeat" @click="checkRepeat(form.connectPhone)">查重</div>
      </div>
    </group>
    <group title="基础信息">
      <x-input id="style2" @on-focus="style2='color:#333'" class="input-required" :title='`<span style="${style2}">服务商名称</span>`' 
        placeholder="点击填写" text-align="right" v-model="form.servicePointName" required></x-input>
      <popup-picker id="style3" @on-show="style3='color:#333'" class="required" show-name
        :title='`<span style="${style3}">经营状态</span>`' placeholder="点击选择" v-model="form.seviceState" :data=sevice_state></popup-picker>
      <!-- <div class="inline border-top">
        <x-address id="style4" @on-show="style4='color:#333'" @on-shadow-change="showForm" :title='`<span style="${style4}">经营地区</span>`' 
          style="flex:1;" class="required left-padding" v-model="form.address" :list="addressData" placeholder="点击选择"></x-address>
        <div class="map-button" @click="openMapView">定位</div>
      </div> -->
      <div class="inline border-top">
        <cell id="style4" @on-show="style4='color:#333'" @click.native="showAddress=true" title='经营地区' style="flex:1; margin-left: -15px" class="cell-required" 
          :value="`${province}${city}${district}${town}${village}`" is-link></cell>
        <div class="map-button" @click="openMapView">定位</div>
      </div>
      <x-input id="style5" @on-focus="style5='color:#333'" class="input-required" :title='`<span style="${style5}">详细经营地址</span>`' 
        placeholder="点击填写" text-align="right" v-model="form.detail" required></x-input>
      <popup-picker id="style6" @on-show="style6='color:#333'" class="required" show-name
        :title='`<span style="${style6}">企业类型</span>`' placeholder="点击选择" v-model="form.enterpriseType" :data=enterprise_type></popup-picker>
      <datetime id="style7" title="成立日期" placeholder="点击选择" show-name v-model="form.registerDate"></datetime>
      <datetime id="style8" title="经营期限" placeholder="点击选择" show-name v-model="form.operateDuration"></datetime>
      <x-address id="style9" title="服务区域" placeholder="点击选择" show-name v-model="form.serviceArea" :list="addressData"></x-address>
      <!-- <popup-picker id="style9" @on-show="style5='color:#333'" class="required" show-name
        :title='`<span style="${style9}">主营产品</span>`' placeholder="点击选择" v-model="form.mainProduct" :data=main_product></popup-picker> -->
      <cell id="style10" @click.native="showProducts=true;style10='color:#333 !important'" :style="style10" title='主营产品' class="cell-required" 
          :value="form.mainProduct" is-link></cell>
      <popup-picker id="style11" title="农技能力" placeholder="点击选择" show-name v-model="form.agriculturalAbility" :data=agricultural_ability></popup-picker>
      <popup-picker id="style12" @on-show="style12='color:#333'" class="required" show-name
        :title='`<span style="${style12}">合作意向</span>`' placeholder="点击选择" v-model="form.coperationIntention" :data=customer_intention></popup-picker>
      <x-input id="style13" title="公司法人" placeholder="点击填写" text-align="right" v-model="form.personInCharge" required></x-input>
      <x-input id="style14" @on-focus="style14='color:#333'" class="s-input-required" :title='`<span style="${style14}">联系人</span>`' 
          placeholder="点击填写" text-align="right" v-model="form.connectName" required></x-input>
      <div id="style15" class="upload-title div-required" :style="style15">经营照片</div>
      <div class="upload-line">
        <file-upload v-show="!form.fileList" accept="image/*" ref="upload" @click.native="clickUpload" @input-file="inputFile" @input-filter="inputFilter">
          <div class="upload-button">
            <div class="upload-icon"></div>
            <div class="upload-text">上传</div>
          </div>
        </file-upload>
        <div class="upload-preview" v-show="form.fileList">
          <img @click="showPreview(form.fileList)" class="preview-image" :src="form.fileList" />
          <div class="close-image" @click="removeImage"></div>
        </div>
        <div class="upload-demo" @click="showPreview(demoImage)">
          <img class="image" :src="demoImage" />
          <div class="desc">示例图</div>
        </div>
      </div>
      <popup-picker id="style16" @on-show="style16='color:#333'" class="required" show-name
        :title='`<span style="${style16}">客户来源</span>`' placeholder="点击选择" v-model="form.source" :data=customer_source></popup-picker>
      <popup-picker id="style17" @on-show="style17='color:#333'" class="required person" show-name
        :title='`<span style="${style17}">归属人员</span>`' placeholder="点击选择" v-model="form.maintainMan" :data=personList></popup-picker>
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
        <div class="img-box" style="max-width:120% !important;">
          <img :src="preImg" style="max-width:100%;padding:10px;box-sizing:border-box">
        </div>
        <div @click="showDialog=false">
          <span class="vux-close" style="margin-bottom: 10px"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <popup v-model="showProducts" height="100%" position="bottom" @popup-header-height=0>
        <popup-header
          style="position:fixed; top:0; left:0; width:100%; z-index:999"
          left-text="取消"
          right-text="确定"
          title="选择主营产品"
          :show-bottom-border="false"
          @on-click-left="showProducts = false"
          @on-click-right="sureProducts"></popup-header>
        <checklist style="margin-top:44px" label-position="left" :options="main_product" v-model="productsValue"></checklist>
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
          @on-click-right="showMap = false"></popup-header>
        <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint">
          <bm-view style="width: 100%; height:100vh;"></bm-view>
          <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
        </baidu-map>
        <div style="position:absolute; bottom:0; left:0; width: 100%; background:#fff; padding:10px;">{{address}}</div>
      </popup>
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
        address: 'default',
        detail: '',
        registerDate: '',
        operateDuration: '',
        serviceArea: [],
        mainProduct: '点击选择',
        agriculturalAbility: [],
        coperationIntention: [],
        personInCharge: '',
        connectName: '',
        fileList: '',
        source: [],
        maintainMan: [],
        remark: ''
      },
      showProducts: false,
      productsValue: [],
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
      main_product: ['化肥', '农药', '种子', '农机', '农技', '飞防'],
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
      style17: '',
      checkStyle: [
        'connectPhone', 
        'servicePointName', 
        'seviceState',
        'address', 
        'detail', 
        'enterpriseType',
        'registerDate',
        'operateDuration',
        'serviceArea',
        'mainProduct',
        'agriculturalAbility', 
        'coperationIntention',
        'personInCharge',
        'connectName',
        'fileList',
        'source',
        'maintainMan'
      ],
      chooseRef: '',
      chooseProp: '',
      fileListName: 'fileList',
      operateLine: -1,
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
      showMap: false,
      showAddress: false,
      addressOptionList: [],
      addressValue: [],
      addressId: 0,
      oldImage: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    console.log(this.id)
    if (this.$route.name === 'PointInfo') {
      this.servicePointId = this.$route.query.id
      this.getPageData()
    }
  },
  methods: {
    chooseAddress() {
      this.showAddress = false
    },
    addressOptionChange(value, label) {
      console.log(this.addressType, value, label)
      if (!value[0]) {
        return
      }
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
    showForm() {
      console.log(this.form)
    },
    sureProducts() {
      this.showProducts = false
      this.form.mainProduct = this.productsValue.join("，")
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
    clickUpload() {
      this.style15 = ''
    },
    clickPicker(name, prop) {
      this.chooseRef = name
      this.chooseProp = prop
    },
    save() {
      let error = false
      for (let i = 1; i < 18; i++) {
        const value = this.form[this.checkStyle[i - 1]]
        if (value == undefined || value.length === 0 || value === '点击选择') {
          !error && document.getElementById(`style${i}`) && document.getElementById(`style${i}`).scrollIntoView()
          error = true
          this[`style${i}`] = 'color: red !important;'
        }
      }
      error == false && this.saveForm()
    },
    saveForm() {
      const data = {
        servicePointId: this.servicePointId || undefined,
        addressList: [{
          addressType : 3,
          city: this.cityCode,
          detail: this.form.detail,
          district: this.districtCode,
          latitude: 0,
          longitude: 0,
          province: this.provinceCode,
          remark: '',
          town: this.townCode,
          village: this.villageCode
        },{
          addressType : 4,
          city: this.form.serviceArea[1].substr(2,4),
          detail: 'this.form.detail',
          district: this.form.serviceArea[2],
          latitude: 0,
          longitude: 0,
          province: this.form.serviceArea[0].substr(0,2),
          remark: '',
          town: 'this.townCode',
          village: 'this.villageCode',
          addressLevel: 3
        }],
        servicePointName: this.form.servicePointName,
        enterpriseType: this.form.enterpriseType[0],
        customerType: this.form.customerType,
        coperationIntention: this.form.coperationIntention[0],
        connectPhone: this.form.connectPhone,
        remark: this.form.remark,
        seviceState: this.form.seviceState[0],
        mainProduct: this.form.mainProduct,
        registerDate: this.form.registerDate,
        operateDuration: this.form.operateDuration,
        agriculturalAbility: this.form.agriculturalAbility[0],
        personInCharge: this.form.personInCharge,
        connectName: this.form.connectName,
        servicePictureUrl: this.form.fileUrl,
        source: this.form.source[0],
        maintainMan: this.form.maintainMan[0]
      }

      this.$axios({
        url: this.$route.name === 'PointInfo' ? this.urls().edit : this.urls().add,
        data: data
      }).then(json => {
        this.$router.replace({
          name: 'PointList'
        })
      }).catch(err => {
        this.pageShow = true
      })
    },
    showPreview(fileList) {
      fileList.indexOf('https://') < 0 && (fileList = 'data:image/png;base64,' + fileList)
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
      this.oldImage = ''
      this.form.fileList = ''
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
          this.form.fileList = dataUrl.split(',')[1]
          this.fForm = JSON.parse(JSON.stringify(this.form))
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
        this.form.fileUrl = json
      }).catch(err => {
        this.pageShow = true
      })
    },
    getOperateYear(value) {
      value === '0' && (this.moreYear = true)
    },
    moreYearChange(index) {
      this.operateLine = index
    },
    chooseMoreYear(value) {
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
        url: this.urls().init + this.id
      }).then(json => {
        const data = json || {}
        this.handleInitPage(data)
      }).catch(err => {
        this.pageShow = true
      })
    },
    handleInitPage(data) {
      this.form.seviceState = [data.seviceState + '']
      this.form.connectPhone = data.connectPhone
      this.form.servicePointName = data.servicePointName
      this.form.enterpriseType = [data.enterpriseType + '']
      this.form.detail = data.addressList[0].detail
      this.form.registerDate = data.registerDate
      this.form.mainProduct = data.mainProduct
      this.productsValue = data.mainProduct.split('，')
      this.form.agriculturalAbility = [data.agriculturalAbility + '']
      this.form.coperationIntention = [data.coperationIntention + '']
      this.form.operateDuration = data.operateDuration
      this.form.personInCharge = data.personInCharge
      this.form.connectName = data.connectName
      this.form.source = [data.source + '']
      this.form.maintainMan = [data.maintainMan + '']
      this.form.remark = data.remark
      this.form.fileList = data.servicePictureUrl
      const addressList = data.addressList || []
      addressList.map(item => {
        if (item.addressType === 3) { // 经营地址
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
        } else if (item.addressType === 4) {
          this.form.serviceArea = [item.province, item.city, item.district]
        }
      })
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
        init: `http://thegisguy.cn:8085/system/point/queryOne?servicePointId=`,
        edit: 'http://thegisguy.cn:8085/system/point/edit',
        upload: `http://thegisguy.cn:8085/commom/file/uploadPhoto`,
        add: `http://thegisguy.cn:8085/system/point/add`,
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
  .div-required {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      margin-top: -7px;
      left: 70px;
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
