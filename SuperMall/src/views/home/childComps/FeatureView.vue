<template>
  <div class="feature">
      <a href="#">
        <img src="../../../assets/img/home/recommend_bg.jpg" alt="">
      </a>
  </div>
</template>

<script>
	export default {
		name: "FeatureView",
	}
</script>

<style scoped>
  .feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }


  .feature img {
    width: 380px;
    height: 220px;
    margin-bottom: 10px;
  }
</style>
