<template>
  <div class="collec-container">
    <van-button
      :class="{ is_collected: is_collected }"
      :icon="is_collected ? 'star' : 'star-o'"
      @click="onCollect"
      :loading="loadingFlag"
    />
  </div>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      loadingFlag: false
    }
  },
  computed: {
    ...mapState(['is_collected', 'art_id', 'user'])
  },
  methods: {
    async onCollect () {
      if (this.user) {
        // console.log(this.art_id)
        this.loadingFlag = true
        if (this.is_collected) {
          // 已收藏
          await deleteCollect(this.art_id)
        } else {
          // 未收藏
          await addCollect(this.art_id)
        }
        this.$store.commit('setCollected', !this.is_collected)
        this.$toast.success(!this.is_collected ? '取消收藏' : '收藏成功')
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
    border: none;
    width: 31px;
    margin: 0;
    padding: 0;
  }
  .is_collected {
    .van-icon {
      color: #ffa500;
    }
  }
}
</style>
