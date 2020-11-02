<template>
  <div class="history-item">
    <van-cell title="搜索历史">
      <div v-if="isFlag">
        <span @click="$emit('delete-history')">全部删除</span>
        <span @click="isFlag = false" class="left">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isFlag = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      @click="deleteCell(item, index)"
    >
      <van-icon name="close" v-if="isFlag" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isFlag: false
    }
  },
  methods: {
    deleteCell (v, i) {
      // 判断是否处于删除状态
      if (this.isFlag) {
        console.log(i)
        this.history.splice(i, 1)
      } else {
        this.$emit('onSearch', v)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.history-item {
  margin-top: 90px;
  .left {
    margin-left: 20px;
  }
}
</style>
