<template>
  <div class="channel-edit">
    <!-- 我的频道模块 -->
    <van-cell :border="false" class="item-cell">
      <template #title>
        <span class="name">我的频道</span>
      </template>
      <van-button type="danger" size="mini" plain round class="item-btn" @click="showClose">{{isFlag?'完成':'编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item class="gird-item" v-for="(v, i) in myChannel" :key="v.id" @click="editItem(v,i)">
        <template #text>
          <span class="text" :class="{ active: active === i }">{{v.name}}
          </span>
        </template>
        <template #icon>
          <van-icon v-show="isFlag && !arr.includes(i)" name="close" class="icon-item" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐模块 -->
    <van-cell :border="false" class="edit-cell">
      <template #title>
        <span class="name">频道推荐</span>
      </template>
    </van-cell>

    <van-grid :gutter="10" class="edit-gird">
      <van-grid-item class="gird-item" v-for="(v) in removeChannel" :key="v.id" icon="plus" :text="v.name" @click="addChannel(v)" />
    </van-grid>
  </div>
</template>

<script>
import { channel, editChannel, deleteChannel } from '@/api/article.js'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  props: {
    myChannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      channelList: [],
      isFlag: false,
      arr: [0]
    }
  },
  created () {
    this.getChannel()
  },
  computed: {
    ...mapState(['user']),
    removeChannel () {
      const a = []
      this.channelList.forEach(v => {
        let flag = false
        this.myChannel.forEach(j => {
          if (v.id === j.id) {
            flag = true
          }
        })
        if (!flag) return a.push(v)
      })
      return a
    }
  },
  methods: {
    async getChannel () {
      const res = await channel()
      // console.log(res)
      if (res.message !== 'OK') {
        return console.log(res)
      }
      this.channelList = res.data.channels
    },
    // 添加频道功能
    async addChannel (v) {
      this.myChannel.push(v)
      // 判断是否处于登陆状态
      if (this.user) {
        const res = await editChannel({
          id: v.id,
          seq: this.myChannel.length
        })
        if (res.message !== 'OK') {
          return console.log(res)
        }
      } else {
        setItem('toutiao_channel', this.myChannel)
      }
    },
    // 编辑按钮功能
    showClose () {
      this.isFlag = !this.isFlag
    },
    // 删除功能
    editItem (v, i) {
      if (this.isFlag) {
        // 判断是否包含不能被删除的选项
        if (this.arr.includes(i)) {
          return
        }
        if (i <= this.active) {
          this.$emit('update', this.active - 1)
        }
        this.deleteChannel(v, i)
      } else {
        this.$emit('update', i, false)
      }
    },
    // 封装删除方法
    async deleteChannel (v, i) {
      // 判断登陆状态
      if (this.user) {
        await deleteChannel(v.id)
        this.myChannel.splice(i, 1)
      } else {
        setItem('toutiao_channel', this.myChannel)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-edit {
  margin-top: 91px;
  .name {
    font-size: 32px;
    color: #333;
  }
  .gird-item {
    width: 164px;
    height: 88px;
    ::v-deep.van-grid-item__content {
      position: relative;
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222222;
        margin-top: 0;
      }
      .van-icon-close {
        position: absolute;
        top: -5px;
        right: -5px;
        color: #cacaca;
        font-size: 30px;
        z-index: 4;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  .item-btn {
    width: 105px;
    height: 46px;
    font-size: 26px;
  }
  .edit-gird {
    ::v-deep.van-grid-item__content {
      flex-direction: row;

      .van-icon-plus {
        font-size: 28px;
      }
    }
  }
}
</style>
