<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    :immediate-check="false"
    @load="onLoad"
  >
    <commen-item
      v-for="(v, i) in flag ? list : list1"
      :key="i + ','"
      :v="v"
      @show-reply="showReply"
    />
  </van-list>
</template>

<script>
import { getCommon } from '@/api/commen'
import { mapState } from 'vuex'
import CommenItem from '@/views/arcicle/commen-list/commem-item'

export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10,
      list1: []
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  components: {
    CommenItem
  },
  computed: {
    ...mapState(['art_id', 'user', 'commonList', 'type', 'source', 'flag'])
  },
  watch: {
    // 监听vuex数据变化来动态添加评论
    commonList () {
      if (this.flag) {
        this.list.unshift(this.commonList)
      } else {
        this.list1.unshift(this.commonList)
      }
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const res = await getCommon({
        type: this.type,
        source: this.source + '',
        offset: this.offset,
        limit: this.limit
      })
      if (res.message !== 'OK') {
        this.error = true
        this.loading = false
        return
      }
      console.log(res)
      if (this.flag) {
        this.list.push(...res.data.results)
      } else {
        this.list1.push(...res.data.results)
      }

      this.$emit('total_count', res.data.total_count)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (res.data.results.length) {
        this.offset = res.data.last_id
      } else {
        this.finished = true
      }
    },
    // 评论点赞功能模块

    showReply () {
      this.$emit('show-reply')
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
