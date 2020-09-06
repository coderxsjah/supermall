import {POP, NEW, SELL} from "./const";
import {debounce} from "./utils";
//混入
export const itemImgLoadListenerMixin = {
  data(){
    return {
      itemImgLoadListener:null,//保存图片加载完成函数
    }
  },
  mounted(){
    //监听图片加载完成
    console.log("混入内容")
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgLoadListener = () => {
      console.log("图片加载完成")
      refresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgLoadListener )
  }
}

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
