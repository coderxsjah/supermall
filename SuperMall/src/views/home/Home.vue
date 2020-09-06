<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl :titles="titles"
                class="tabcontrol"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFixed"/>
    <Scroll class="scroll-content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scrollPosition="contentPosition"
            @pullingUp="loadMore">
      <home-swipper :banners="banners"
                   @swipperImgLoad="swiperImageLoad"/>
      <RecommendView :recommends="recommends"/>
      <FeatureView />
      <TabControl :titles="titles"
                  @tabClick="tabClick"
                  ref="tabControl2"
                  :class="{fixed:isTabFixed}"/>
      <GoodsList :goods="showGoods"/>
    </Scroll>
    <BackToTap @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackToTap from "../../components/content/backToTap/BackToTap";
  import GoodsList from "../../components/content/goods/GoodsList";

  import HomeSwipper from "./childComps/HomeSwipper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {itemImgLoadListenerMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      BackToTap,
      Scroll,
      TabControl,
      FeatureView,
      RecommendView,
      NavBar,
      HomeSwipper,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        keywords: [],//本周推荐的特点
        titles: ["流行", "新款", "精选"],
        tabType: "pop",
        goods: {
          "pop": {
            page: 0,
            list: [],
          },
          "new": {
            page: 0,
            list: [],
          },
          "sell": {
            page: 0,
            list: [],
          }
        },
        isshow: false,
        tabOffsetTop:0,
        isTabFixed:false,//tab是否吸顶
        saveY:0,//记录离开时的位置
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods("pop")
      this.getHomeGoods("new")
      this.getHomeGoods("sell")
    },
    mixins:[itemImgLoadListenerMixin,backTopMixin],
    mounted() {
      //3.监听图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImgLoadListener = () => {
      //   console.log("图片加载完成")
      //   refresh()
      // }
      // this.$bus.$on("itemImgLoad", this.itemImgLoadListener )

      //吸顶效果
      //$el获取的是元素，直接获取的是元素对象,等到图片加载完成之后获取的offsetTop才是最准的
      //console.log(this.$refs.tabControl.$el.offsetTop)
    },
    //活跃，进入
    activated() {
      //回到离开的位置
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    //离开
    deactivated() {
      //保存位置
      this.saveY = this.$refs.scroll.scroll.y
      //取消全局事件监听
      this.$bus.$off("itemImgLoad",this.itemImgLoadListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.tabType].list
      }
    },
    methods: {
      /*事件监听*/
      tabClick(index) {
        switch (index) {
          case 0:
            this.tabType = "pop";
            break;
          case 1:
            this.tabType = 'new';
            break;
          case 2:
            this.tabType = "sell";
            break;
          default:
            this.tabType = "pop";
            break;
        };
        this.$refs.tabControl1.currindex = index;
        this.$refs.tabControl2.currindex = index;
      },

      //根据当前位置决定是否显示backtotap,决定tabControl是否吸顶
      contentPosition(position) {
        //决定back是否显示
        this.showBackTop = ((-position.y) > 1000 ? true : false)
        //决定是否吸顶
        this.isTabFixed = ((-position.y) > this.tabOffsetTop ? true : false)
      },
      //加载更多
      loadMore() {
        this.getHomeGoods(this.tabType)
        this.$refs.scroll.refresh()
      },
      //获取tabControl的offset
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /*网络请求*/
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res.data.keywords.list[0].acm)
          // console.log(res.data.banner)
          // console.log(res.data.recommend)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
  }
  .home-nav{
    color: white;
    background-color: #ff8198;
    /*浏览器原生滚动时候使用*/
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9;
  }

  /*tabcontrol的吸顶效果*/
  .tabcontrol {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  /*.fixed{*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/

  .scroll-content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
