<template>
  <div class="home-contaoiner">
    <!-- 搜索框区域 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
          round
          type="info"
          class="info-btn"
          size="small"
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tab页签区域 -->
    <van-tabs v-model="active" swipeable animated class="tabs-caontaioner">
      <van-tab :title="v.name" v-for="v in channels" :key="v.id">
        <!-- 文章列表 -->
        <article-list :channel="v" />
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <i class="iconfont icon-gengduo" @click="showPopup"></i>
      </template>
    </van-tabs>
    <!-- 编辑模块弹出层 -->
    <van-popup
      v-model="editShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :myChannel="channels"
        :active="active"
        @update="onUpdate"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { channels } from '@/api/user.js'
import ArticleList from '@/components/article/article-list.vue'
import ChannelEdit from '@/components/article/channel-edit.vue'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      editShow: false
    }
  },
  created () {
    this.getChannels()
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 获取频道列表
    async getChannels () {
      let a = []
      // 判断用户是否登录
      if (this.user) {
        const res = await channels()
        if (res.message === 'OK') {
          a = res.data.channels
        }
      } else {
        const local = getItem('toutiao_channel')
        // 判断本地存储是否有数据
        if (local) {
          a = local
        } else {
          const res = await channels()
          if (res.message === 'OK') {
            a = res.data.channels
          }
        }
      }

      this.channels = a
    },
    // 弹出编辑模块
    showPopup () {
      this.editShow = true
    },
    onUpdate (i, editShow = true) {
      this.active = i
      this.editShow = editShow
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contaoiner {
  padding-top: 174px;
  padding-bottom: 100px;
  ::v-deep.van-nav-bar__title {
    max-width: unset;
  }
  .info-btn {
    width: 560px;
    height: 64px;
    background-color: #5babfb;
    border: 0;
    font-size: 28px;
    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
  ::v-deep.tabs-caontaioner {
    .van-tabs__wrap {
      position: fixed;
      top: 93px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 86px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      .van-tabs__nav--complete {
        padding: 0;
      }
      .van-tab {
        min-width: 200px;
        border-left: 1px solid #edeff3;
        font-size: 30px;
        color: #333;
      }
      .van-tab:nth-child(1) {
        border-left: 0;
      }
      .van-tabs__line {
        width: 31px;
        height: 5px;
        background-color: #3296fa;
        top: 70px;
      }
      .placeholder {
        flex-shrink: 0;
        width: 67px;
        height: 82px;
      }
      .iconfont {
        background-color: rgb(255, 255, 255);
        opacity: 0.902;
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 67px;
        height: 82px;
        font-size: 33px;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          width: 2px;
          height: 100%;
          background-image: url("~@/assets/gradient-gray-line.png");
        }
      }
    }
  }
}
</style>
