<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="reply.reply_count > 0 ? `${reply.reply_count}条回复` : '暂无回复'"
    >
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="scroll-warp">
      <!-- 当前评论项 -->
      <commen-item :v="reply" />
      <!-- /当前评论项 -->

      <van-cell title="所有回复" />

      <!-- 评论的回复列表 -->
      <commen-list />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-warp">
      <van-button size="small" round class="post-btn" @click="showPopup = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部 -->
    <!-- 添加评论对话框 -->
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '20%' }">
      <commen-post @addCommon="closePopup" />
    </van-popup>
  </div>
</template>

<script>
import CommenPost from '@/views/arcicle/commen-post'
import CommenItem from '@/views/arcicle/commen-list/commem-item'
import commenList from '@/views/arcicle/commen-list'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showPopup: false
    }
  },
  computed: {
    ...mapState(['reply', 'art_id'])
  },
  components: {
    CommenItem,
    commenList,
    CommenPost
  },
  created () {
    console.log(this.reply)
    this.$store.commit('setType', 'c')
    this.$store.commit('setSource', this.reply.com_id + '')
    this.$store.commit('setArticle_id', this.art_id + '')
    this.$store.commit('setFlag', false)
  },
  methods: {
    closePopup () {
      this.reply.reply_count++
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-reply {
  .scroll-warp {
    position: fixed;
    top: 155px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }
  .post-warp {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    .post-btn {
      width: 60%;
    }
  }
}
</style>
