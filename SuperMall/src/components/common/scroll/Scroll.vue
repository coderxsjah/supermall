<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default(){
          return 0
        }
      },
      pullUpLoad: {
        type:Boolean,
        default:true
      },
      click: {
        type:Boolean,
        default(){
          return true
        }
      }
    },
    created() {
      setTimeout(this.init,20)
    },
    methods:{
      init(){
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad,
          click:this.click,
        })
        //2.监听滚动的位置
        this.scroll.on("scroll",(position)=>{
          this.$emit("scrollPosition",position)
        })
        //3.监听上拉事件
        this.scroll.on("pullingUp",()=>{
          this.$emit("pullingUp")
          setTimeout(()=>{
            this.finishPullUp()
          },1000)
        })
      },
      //返回某一位置
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      //刷新
      refresh(){
       this.scroll && this.scroll.refresh && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
