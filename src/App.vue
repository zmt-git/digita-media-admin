<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import url('//at.alicdn.com/t/font_2569984_k89giptugv.css');
#app{
  width: 100%;
  height: 100%;
}
.container{
  width: 100%;
  height: 100%;
}
</style>
