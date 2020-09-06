<template>
  <div v-show="showToast" class="toast">
    <div class="toast-message">{{message}}</div>
  </div>
</template>

<script>

  export default {
    name: "Toast",
    data(){
      return{
        message: "",
        showToast: false,
      }
    },
    methods:{
      show(message,duration=2000){
        this.message = message;
        this.showToast = true;
        setTimeout(()=>{
          this.showToast = false;
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast-message{
    padding:8px 8px;
    font-size: 10px;
  }

  .toast{
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #ffffff;
    background-color: rgba(0,0,0,0.6);
  }
</style>
