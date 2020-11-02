<template>
  <div class="suggestion-item">
    <van-cell
      icon="search"
      v-for="(v,i) in Suggestion"
      :key="','+i"
      @click="$emit('search',v)"
    >
      <template #title>
        <span v-html="highlight(v)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Suggestion: []
    }
  },
  watch: {
    search: {
      handler: debounce(function (v) {
        this.getSuggestion(v)
      }, 200),
      immediate: true
    }
  },
  methods: {
    //  搜索联想建议功能
    async getSuggestion (q) {
      const res = await getSuggestion(q)
      this.Suggestion = res.data.options
    },
    highlight (v) {
      const reg = RegExp(this.search, 'gi')
      return v.replace(reg, `<span style="color:blue">${this.search}</span>`)
    }
  }
}
</script>

<style lang="scss" scoped>
.suggestion-item {
  margin-top: 90px;
}
</style>
