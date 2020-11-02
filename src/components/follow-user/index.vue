<template>
  <div class="follow-container">
    <van-button
      v-if="!is_followed"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loadingFlag"
      @click="onFollowed"
      >关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      round
      size="small"
      :loading="loadingFlag"
      @click="onFollowed"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { addFollowed, deleteFollowed } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loadingFlag: false
    }
  },
  computed: {
    ...mapState(['is_followed', 'aut_id', 'user'])
  },
  methods: {
    async onFollowed () {
      if (this.user) {
        this.loadingFlag = true
        if (this.is_followed) {
        // 已关注
          await deleteFollowed(this.aut_id)
        } else {
        //  未关注
          await addFollowed(this.aut_id)
        }
        this.$store.commit('setFollow', !this.is_followed)
        this.$toast.success(!this.is_followed ? '取消关注' : '关注成功')
        this.loadingFlag = false
      } else {
        this.$toast('请先登录在操作！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.follow-container .follow-btn {
  width: 157px;
  height: 58px;
}
</style>
