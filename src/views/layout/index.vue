<template>
  <div class="layout-container">
    <!-- 路由占位符 -->
    <router-view />
    <van-tabbar
      class="layout-tabber"
      route
    >
      <van-tabbar-item to="/">
        <i
          slot="icon"
          class="iconfont icon-shouye"
        ></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i
          slot="icon"
          class="iconfont icon-wenda"
        ></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i
          slot="icon"
          class="iconfont icon-shipin"
        ></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i
          slot="icon"
          class="iconfont icon-wode"
        ></i>
        <span class="text">{{$store.state.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
