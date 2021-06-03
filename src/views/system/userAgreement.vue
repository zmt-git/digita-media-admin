<template>
  <div class="user-agreement">
    <div class="header">
      <img class="logo" src="../../assets/layout/aside/logo.png" alt="公司logo">
      <span class="name">xxx有限公司</span>
    </div>
    <div class="content">
      <img src="../../assets/register/plateProtocol.jpg" alt="用户协议">
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-agreement'
}
</script>
<style lang="scss" scoped>
.user-agreement{
  box-sizing: border-box;
  padding: 10px;
}
.header{
  height: 50px;
  display: flex;
  align-items: center;
}
.logo{
  width: 40px;
  margin-right: 10px;
}
.name{
  font-size: 25px;
  font-weight: 600;
}
.content{
  border: 1px solid #000;
  border-radius: 5px;
  text-align: center;
}
</style>
