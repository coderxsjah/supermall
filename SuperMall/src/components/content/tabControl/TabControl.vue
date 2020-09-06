<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles"
           class="tab-control-item"
           @click="choose(index)"
          :class="{active:index===currindex}">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currindex:0,
      }
    },
    methods:{
      choose(index){
        this.currindex=index;
        this.$emit("tabClick",index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: white;
    z-index:9;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding:5px;
  }

  .active{
    color:var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
