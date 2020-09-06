<template>
  <div id="detail">
    <DetailNavBar class="detailNav" ref="detailNavBar" @titleItemClick="titleItemClick"/>
    <Scroll class="content"
            :probe-type="3"
            :pullUpLoad="true"
            ref="scroll"
            @scrollPosition="contentScroll">
      <DetailSwipper :top-images="topImages"/>
      <DetailBaseInfo :goods="goods"/>
      <DetailShopInfo :shop="shop"/>
      <DetailGoodsInfo :detail-info="detailInfo" @imgLoad="detailImgLoad"/>
      <DetailParamInfo ref="params" :param-info="goodsParamInfo"/>
      <DetailCommentInfo ref="comments" :comment-info="commentInfo" />
      <GoodsList ref="recommends" :goods="recomends"/>
    </Scroll>
    <BackToTap @click.native="BackTop" v-show="showBackTop"/>
    <DetailBottomBar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwipper from "./childComps/DetailSwipper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import {getDetail, getRecommend, GoodsInfo, GoodsParam, Shop} from "../../network/detail";

  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {itemImgLoadListenerMixin,backTopMixin} from "../../common/mixin";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackToTap from "../../components/content/backToTap/BackToTap";

  export default {
    name: "Detail",
    components: {
      BackToTap,
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      DetailBaseInfo,
      DetailSwipper,
      DetailNavBar,
      Scroll,
    },
    data(){
      return {
        iid:null,
        topImages:[],//轮播图
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParamInfo:{},
        commentInfo:{},
        recomends:[],
        themeTopYs:[],//记录各个部分的offset,
        getOffsetTop:null,
        toastMessage:null,
        showToast:false,
      }
    },
    mixins:[itemImgLoadListenerMixin,backTopMixin],
    created() {
      //1.保存iid
      this.iid = this.$route.params.iid
      //2.请求数据
      getDetail(this.iid).then(res=>{
        //console.log(res.result.shopInfo.services[0].icon)
        const data = res.result;
        //获取轮播图
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //获取详细信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.goodsParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        this.getOffsetTop = ()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0)//第一个的offset
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        }//这可以考虑将此函数包装成debounce()
      })
      //3.请求推荐数据
      getRecommend().then(res =>{
        this.recomends = res.data.list
      })
      //下一帧，可以保证数据获取后，且页面渲染完再执行,此时不包含图片
      // this.$nextTick(()=>{
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)//第一个的offset
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // })
    },
    //这种方案也不一定准确，依赖于图片的加载刷新
    // updated() {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)//第一个的offset
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
    // },
    //销毁
    destroyed() {
      //取消全局事件监听
      this.$bus.$off("itemImgLoad",this.itemImgLoadListener)
    },
    methods:{
      detailImgLoad(){
        this.$refs.scroll.refresh()
        //获取offsetTop
        this.getOffsetTop();
        console.log(this.themeTopYs)
      },
      //联动效果，点击title,滚动到相应地方
      titleItemClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300);
      },
      //根据滚动位置显示title,显示与隐藏backTop
      contentScroll(position){
        //改变backTop的状态
        this.showBackTop = -position.y > 1000? true:false
        //改变title状态
        if(-position.y < this.themeTopYs[1]){
          this.$refs.detailNavBar.currIndex = 0;
        }
        else if(-position.y < this.themeTopYs[2]){
          this.$refs.detailNavBar.currIndex = 1;
        }
        else if(-position.y < this.themeTopYs[3]){
          this.$refs.detailNavBar.currIndex = 2;
        }
        else{
          this.$refs.detailNavBar.currIndex = 3;
        }
      },
      //添加到购物车
      addToCart(){
        //获取购物车展示信息
        const product = {};
        product.img = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.iid = this.iid;
        product.newPrice = this.goods.realPrice;
        //提交到action
        this.$store.dispatch("addCart",product).then(res=>{
          //组件式显示toast
          // this.toastMessage = res;
          // this.showToast = true;
          // setTimeout(()=>{
          //   this.showToast = false;
          // },300)
          this.$toast.show(res,500)
        })
      }
    }
  }
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

 .detailNav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }

  .content{
    height: calc(100% - 44px - 58px);
    /*position: absolute;*/
    /*overflow: hidden;*/
    /*top: 44px;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*right: 0;*/
  }


</style>
