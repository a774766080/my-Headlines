
<template>
  <div class="list-contaioner">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="success"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(item, i) in list"
          :key="'=' + i"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articles } from '@/api/article.js'
import ArticleItem from '@/components/article/articleItem'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,

      isLoading: false,
      success: '刷新成功',
      total: 0
    }
  },
  created () {
    // this.onLoad()
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      const res = await articles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      if (res.message !== 'OK') {
        this.error = true
        this.loading = false
        return
      }
      // console.log(res)
      this.list.push(...res.data.results)

      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (res.data.results.length) {
        this.timestamp = res.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    //  下拉触发事件
    async onRefresh () {
      const res = await articles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      if (res.message !== 'OK') {
        this.success = '刷新失败'
        this.isLoading = false
        return
      }
      this.success = '刷新成功，更新了' + res.data.results.length + '条数据'
      this.list.unshift(...res.data.results)
      this.isLoading = false
      this.$toast('刷新成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-contaioner {
  height: 79vh;
  overflow-y: auto;
}
</style>
