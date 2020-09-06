<template>
  <swipper ref="swipper" v-if="banners.length">
    <swipper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swipper-item>
  </swipper>
</template>

<script>
  import Swipper from '../../../components/common/swiper/Swipper'
  import SwipperItem from "../../../components/common/swiper/SwipperItem";

	export default {
		name: "HomeSwipper",
    components: {
		  Swipper,
      SwipperItem
    },
    data(){
		  return {
		    isLoad:false,//记录图片加载完成
      }
    },
    props: {
		  banners: {
		    type: Array,
        default: []
      }
    },
    methods: {
		  stopTimer() {
		    this.$refs.swipper.stopTimer()
      },
      startTimer() {
		    if (this.$refs.swipper) {
          this.$refs.swipper.startTimer()
        }
      },
      //图片加载完成
      imgLoad(){
        if(!this.isLoad){
          this.$emit("swipperImgLoad")
          this.isLoad = !this.isLoad
        }
      }
    }
	}
</script>

<style scoped>

</style>
