<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="inputValue"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="addCommen"
      :disabled="!inputValue.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '@/api/commen'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    ...mapState(['user', 'source', 'article_id'])
  },
  methods: {
    async addCommen () {
      if (this.user) {
        const res = await addComments({
          target: this.source,
          content: this.inputValue,
          art_id: this.article_id
        })
        console.log(res)
        if (res.message === 'OK') {
          this.$store.commit('setcommonPost', res.data.new_obj)
          this.$emit('addCommon')
          this.inputValue = ''
          this.$toast.success('发布成功')
        }
      } else {
        this.$toast('请登陆后在操作')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
