<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "RecommendView",
    props:{
		  recommends:{
		    type:Array,
        default(){
		      return []
        }
      }
    }
	}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend img {
    width: 80px;
    height:80px;
    flex:1;
    margin-right: 15px;
  }
</style>
