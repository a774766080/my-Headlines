<template>
  <div class="login-contaioner">
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="back" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        type="number"
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userRoules.mobile"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        type="number"
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        class="code"
        :rules="userRoules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma line"></i>
        <template #button>
          <van-count-down
            v-if="isCountDown"
            millisecond
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="default"
            round
            class="btn"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="btn-login">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, codes } from '@/api/user.js'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: '246810'
      },
      userRoules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDown: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      const data = await login(this.user)
      if (data.message !== 'OK') {
        return
      }
      this.$toast.success('登录成功')
      this.$store.commit('setUser', data.data)
      console.log(data)
      this.$router.back()
    },
    // 发送验证码模块
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return
      }
      this.isCountDown = true
      const res = await codes(this.user.mobile)
      console.log(res)
      this.$toast('发送成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-contaioner {
  .page-nav-bar {
    .van-icon {
      color: #fff;
    }
  }
  .btn {
    border: 0;
    background-color: #ededed;
    color: #666;
    .van-button {
      width: 152px;
      height: 48px;
      line-height: 48px;
      .van-button__text {
        font-size: 22px;
      }
    }
    &::after {
      position: absolute;
      left: -24px;
      top: 9px;
      width: 2px;
      height: 52px;
      content: "";
      background-color: #ededed;
    }
  }
  .iconfont {
    font-size: 30px;
  }
  .line {
    line-height: 62px;
  }
  .btn-login {
    background-color: #6db4fb;
    border: 0;
    border-radius: 12px;
    font-size: 30px;
  }
}
</style>
