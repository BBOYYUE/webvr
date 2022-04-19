<template>
  <div>
    <div class="w-full h-14 flex flex-row justify-between fixed top-0 z-20 bg-white">
      <div class="w-16 flex flex-col justify-center">
        <div class="flex flex-row justify-center space-x-1"
             @click="this.$router.go(-1)">
          <el-icon>
            <arrow-left />
          </el-icon>
          <div>返回</div>
        </div>
      </div>
      <div class="flex flex-col justify-center text-center ">
        <div class="text-xl font-semibold">项目地址</div>
      </div>
      <div class="w-16"></div>
    </div>
    <div class=" shadow-inner ">
      <div id="container">
      </div>
    </div>
    <div class="w-full fixed bottom-4 left-0 flex flex-row justify-center"
         style="z-index:160;">
      <div class="m-2 w-full">
        <el-button type="primary"
                   class="w-full"
                   @click="drivingSearch">到这里去</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ElIcon } from "element-plus";
import {
  ArrowLeft
} from '@element-plus/icons-vue'
import { shallowRef } from '@vue/reactivity'
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  components: {
    ElIcon, ArrowLeft
  },
  setup () {
    const map = shallowRef(null);
    return {
      map,
    }
  },
  computed: {
    product () {
      return this.$store.state.product.info.project;
    },
    lngLatNow () {
      return this.$store.state.lngLat
    },
    title () {
      return this.product.name ? this.product.name : '保利·锦上'
    },
    address () {
      return this.product.address ? this.product.address : '石家庄·藁城区工业路与四明街交口西北角'
    },
    lngLat () {
      return this.product.lnglat ? this.product.lnglat : [114.847654, 38.025519]
    },
    tel () {
      return this.product.phone ? this.product.phone : ''
    },
    imgUrl () {
      return this.product.icon ? this.product.icon : 'https://www.alphavisual.cn/wechat/disk2/applet/bljs/weishapan/static/img/wxShare/share.png'
    }
  },
  data () {
    return {
      marker: {},
      infoWindow: {},
      AMap: {}
    }
  },
  methods: {
    drivingSearch () {
      AMapLoader.load({
        key: "a1a3457fca3cbdb35f38ec46e0f68a76",   // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AdvancedInfoWindow', 'AMap.Driving'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.driving.search(
          new AMap.LngLat(this.lngLatNow[0], this.lngLatNow[1]),
          new AMap.LngLat(this.lngLat[0], this.lngLat[1])
          , function (status, result) {
            // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
            if (status === 'complete') {
              console.log('绘制驾车路线完成')
            } else {
              console.log('获取驾车数据失败：' + result)
            }
          });
      });
    },
    initMap () {
      AMapLoader.load({
        key: "a1a3457fca3cbdb35f38ec46e0f68a76",   // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.AdvancedInfoWindow', 'AMap.Driving'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        this.AMap = AMap;
        /**
         * 创建地图基础组件
         */
        this.map = new AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 14,           //初始化地图级别
          center: this.lngLat, //初始化地图中心点位置
        });

        /**
         * 目的地点位
         */
        this.marker = new AMap.Marker({
          position: new AMap.LngLat(this.lngLat[0], this.lngLat[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: this.title
        });
        this.map.add(this.marker);


        /**
         * 加入目的地信息弹窗
         */
        let content = `<div class="info-title" style="height: 26px;line-height: 
        26px;padding-left: 5px;border-bottom:1px solid #b9b9bf;
        font-weight:bold;font-size:16px;">${this.title}</div>
        <div class="info-content" style="box-sizing:border-box;
         margin:0;line-height:20px;width:auto;height:100%;padding:5px;">
         <img src="${this.imgUrl}" style="float:left;zoom:1;overflow:hidden;
         width:140px;height:140px;margin:3px 8px 3px;"/>
         <p style="font-size:12px;display: inline;"><strong>项目地址：</strong>
         ${this.address}</p><br/> <p style="font-size:12px;display: inline;white-space:normal; word-break:break-all;"><strong>联系方式: </strong>
         ${this.tel}</p><br/>`;
        this.infoWindow = new AMap.InfoWindow({
          content: content,  //传入 dom 对象，或者 html 字符串
          autoMove: true,
          position: this.marker.getPosition(),
          driving: true,
        });
        // this.infoWindow.open(this.map, this.lngLat);
        /**
         * 点位点击展示信息
         */
        let that = this;
        let markerHandler = function () {
          that.infoWindow.open(that.map, that.lngLat);
        };
        this.marker.on('click', markerHandler);

        /**
         * 
         */
        this.driving = new AMap.Driving({
          map: this.map,
        });


      }).catch(e => {
        console.log(e);
      })
    },
  },

  mounted () {
    //DOM初始化完成进行地图初始化
    this.initMap();
  }
}
</script>
<style  scoped>
#container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  margin: 0px;
  width: calc(100vw);
  height: calc(100vh - 5rem);
}
</style>