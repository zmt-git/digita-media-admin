<template>
  <transition
    appear
    appear-active-class="animate__animated animate__fadeIn"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="base-page-loading-view">
      <img class="logo" src="../assets/layout/aside/logo.png" alt="">
      <i class="iconfont icon-loading icon"></i>
      <h3 class="name">西安启明荣光科技有限公司</h3>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'base-page-loading-view'
}
</script>
<style lang="scss" scoped>
.base-page-loading-view{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
  flex-direction: column;
}
.logo{
  width: 80px;
}
.icon{
  font-size: 60px;
  line-height: 150px;
  animation: rotating 2s linear infinite;
}
.name{
  font-size: 25px;
  line-height: 40px;
}

@keyframes rotating {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(1turn);
  }
}
</style>
