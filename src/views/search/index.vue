<template>
  <div class="search-contaoiner">
    <!--  搜索框 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isFlag = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isFlag" :search="searchText" />
    <!-- 搜索联想 -->
    <search-suggestion
      v-else-if="searchText"
      :search="searchText"
      @search="onSearch"
    />

    <!-- 搜索历史 -->
    <search-history
      v-else
      :history="history"
      @delete-history="history = []"
      @onSearch="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import SearchSuggestion from '@/views/search/components/search-suggestion'

import { setItem, getItem } from '@/utils/storage'

export default {
  data () {
    return {
      searchText: '',
      isFlag: false,
      history: getItem('history_text') || []
    }
  },
  watch: {
    history () {
      setItem('history_text', this.history)
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  methods: {
    onSearch (val) {
      // 添加历史记录
      const a = this.history.indexOf(val)
      // 判断记录是否已经存在
      if (a !== -1) {
        this.history.splice(a, 1)
      }
      this.history.unshift(val)
      this.searchText = val
      this.isFlag = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-contaoiner {
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search {
    background-color: #3296fa;
    height: 90px;
    .van-cell {
      height: 55px;
      font-size: 25px;
      line-height: 38px;
    }
    .van-search__action {
      color: #fff;
    }
  }
}
</style>
