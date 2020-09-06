<template>
  <div>
    <NavBar>
      <div slot="left">
       <img src="../../../assets/img/common/back.svg" @click="back" class="detail-back">
      </div>
      <div slot="center" class="title">
        <span v-for="(item,index) in titles"
              class="title-item"
              @click="itemClick(index)"
              :class="{active:currIndex===index}">{{item}}</span>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  import BackToTap from "../../../components/content/backToTap/BackToTap";
  export default {
    name: "DetailNavBar",
    components: {
      BackToTap,
      NavBar,
    },
    data(){
      return {
        titles:["商品","参数","评论","推荐"],
        currIndex:0,
      }
    },
    methods:{
      back(){
        this.$router.push("/home")
      },
      itemClick(index){
        this.currIndex = index;
        this.$emit("titleItemClick",index);
      }

    }
  }
</script>

<style scoped>
  .active{
    color: #ff8198;
  }

  .title{
    display: flex;
  }

  .title-item{
    flex: 1;
  }

  .title-item span{
    font-size: 11px;
  }

  .detail-back{
    margin-top: 12px;
  }
</style>
