<template>
  <div class="my-contaioner">
    <!-- 未登录显示 -->
    <div
      class="header top-box"
      v-if="!user"
    >
      <div
        class="login-btn"
        @click="clickBtn"
      >
        <img
          src="@/assets/mobile.png"
          alt=""
          class="mobile"
        >
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 登录显示模块 -->
    <div
      class="login-contaioner header"
      v-else
    >
      <div class="active">
        <div class="left">
          <van-image
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <van-button
          type="default"
          round
          size="mini"
        >编辑资料</van-button>
      </div>
      <div class="item">
        <div class="div-item">
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="div-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="div-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="div-item">
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <van-grid
      :column-num="2"
      class="history"
      clickable
    >
      <van-grid-item
        text="收藏"
        class="shoucang"
      >
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item
        text="历史"
        class="lishi"
      >
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="nav">
      <div class="nav1">消息通知
        <van-icon name="arrow" />
      </div>
      <div class="nav2">小智同学
        <van-icon name="arrow" />
      </div>
    </div>
    <div
      class="out-login"
      v-if="user"
      @click="outLogin"
    >
      <van-cell
        type="default"
        title="退出登录"
        clickable
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { users } from '@/api/user.js'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    if (this.user) {
      const res = await users()
      console.log(res)
      this.userInfo = res.data
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    clickBtn () {
      this.$router.push('/login')
    },
    outLogin () {
      this.$dialog.confirm({
        message: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-contaioner {
  .header {
    position: relative;
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 152px;
      height: 187px;
      font-size: 28px;
      color: #fff;
      .mobile {
        width: 132px;
        height: 132px;
        margin-bottom: 20px;
      }
    }
  }
  .history {
    background-color: #fff;
    display: flex;
    height: 142px;
    align-items: center;
    margin-bottom: 20px;
    .iconfont {
      margin-bottom: 6px;
    }
    .shoucang {
      flex: 1;
      .iconfont {
        font-size: 40px;
        color: red;
      }
    }
    .lishi {
      flex: 1;
      .iconfont {
        font-size: 40px;
        color: orange;
      }
    }
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #333;
    }
  }
  .nav {
    background-color: #fff;
    height: 205px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    line-height: 102px;
    font-size: 30px;
    .nav1 {
      flex: 1;
      margin-left: 35px;
      margin-right: 35px;
      border-bottom: 1px solid #f5f7f9;
    }
    .nav2 {
      flex: 1;
      padding-left: 35px;
      margin-right: 35px;
    }
    .van-icon {
      float: right;
      line-height: 102px;
    }
  }
  .login-contaioner {
    overflow: hidden;
    .active {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 70px;
      color: #fff;
      font-size: 30px;

      .left {
        display: flex;
        align-items: center;
        .van-image {
          height: 135px;
          width: 139px;
          margin-left: 30px;
          margin-right: 18px;
          border: 4px solid #fff;
        }
      }
      .van-button {
        margin-right: 30px;
        height: 38px;
        background-color: #fff;
        line-height: 38px;
        .van-button__content {
          .van-button__text {
            font-size: 20px;
            color: #666;
          }
        }
      }
    }
    .item {
      display: flex;
      margin: 23px 0 0;
      .div-item {
        flex: 1;
        display: flex;
        height: 130px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        color: #fff;
        span {
          font-size: 36px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  .out-login {
    height: 103px;
    background-color: #fff;
    margin-top: 8px;
    text-align: center;
    overflow: hidden;
    .van-cell {
      color: #d86262;
      margin-top: 7px;
    }
  }
}
</style>
