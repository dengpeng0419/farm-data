<template>
  <div class="hello">
    <p @click="getCurrenLocation">{{address}}</p>
    <div class="map" v-show="showMap">
      <baidu-map class="bmView" :scroll-wheel-zoom="true" :center="location" :zoom="zoom" @click="getLocationPoint">
        <bm-view style="width: 100%; height:100vh; flex: 1"></bm-view>
        <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none"></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
  methods: {
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
    getCurrenLocation() {
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((res) => {
        this.location = res.point
        this.showMap = true
      }, {enableHighAccuracy: true})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
