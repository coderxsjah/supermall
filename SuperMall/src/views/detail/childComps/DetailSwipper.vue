<template>
  <Swipper ref="detailSwiper" v-if="topImages.length">
    <swipper-item v-for="(item,index) in topImages" :key="index" class="swipperItem">
        <img :src="item" alt="">
    </swipper-item>
  </Swipper>
</template>

<script>
  import Swipper from "../../../components/common/swiper/Swipper";
  import SwipperItem from "../../../components/common/swiper/SwipperItem";

  export default {
    name: "DetailSwiper",
    components: {
      Swipper,
      SwipperItem,
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swipperItem{
    height: 300px;
    overflow: hidden;
  }
</style>
