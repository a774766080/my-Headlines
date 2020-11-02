<template>
  <div class="result-item">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      const res = await getResult({
        page: this.page,
        per_page: 10,
        q: this.search
      })
      if (res.message !== 'OK') {
        this.error = true
        this.loading = false
        return
      }
      this.list.push(...res.data.results)
      // console.log(res)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (res.data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.result-item {
  margin-top: 90px;
  height: 94vh;
  overflow-y: auto;
}
</style>
