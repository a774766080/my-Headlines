<template>
  <div class="collec-container">
    <van-button
      :class="{ attitude: attitude === 1 }"
      :icon="attitude === -1 ? 'good-job-o' : 'good-job'"
      @click="onCollect"
      :loading="loadingFlag"
    />
  </div>
</template>

<script>
import { likeAttitude, deleteAttitude } from '@/api/article'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loadingFlag: false
    }
  },
  computed: {
    ...mapState(['attitude', 'art_id', 'user'])
  },
  methods: {
    async onCollect () {
      let status = null
      if (this.user) {
        this.loadingFlag = true
        if (this.attitude === 1) {
          // 已点赞
          await deleteAttitude(this.art_id)
          status = -1
          this.$toast.success('取消点赞')
        } else {
          // 未点赞
          await likeAttitude(this.art_id)
          status = 1
          this.$toast.success('点赞成功')
        }
        // console.log(status)
        this.$store.commit('setAttitude', status)
        this.loadingFlag = false
      } else {
        this.$toast('请先登录再进行操作')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collec-container {
  .van-button {
    width: 31px;
    border: none;
    margin: 0;
    padding: 0;
  }
  .attitude {
    .van-icon {
      color: #e5645f;
    }
  }
}
</style>
