<template>
  <div class="list-container">
    <van-cell class="cell-item">
      <template #title>
        <div class="left-item">
          <van-image round fit="cover" :src="v.aut_photo" />
        </div>
      </template>
      <template #default>
        <div class="right-item">
          <span class="name">{{ v.aut_name }}</span>
          <van-button
            class="icon-item"
            :class="{ likeing: v.is_liking }"
            @click="likings(v)"
          >
            <template #default>
              <van-icon :name="v.is_liking ? 'good-job' : 'good-job-o'" />
              <span class="text">{{
                v.like_count > 0 ? v.like_count : "赞"
              }}</span>
            </template>
          </van-button>
        </div>
        <div class="value-item">
          <p class="p1-item">{{ v.content }}</p>
          <p class="p2-item">
            <span style="margin-right: 10px">{{
              v.pubdate | relativeTime
            }}</span>
            <van-button round size="mini" type="default" @click="addReply">
              回复 {{ v.reply_count }}
            </van-button>
          </p>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { likings, deleteLikings } from '@/api/commen'
import { mapState } from 'vuex'
export default {
  props: {
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['art_id', 'user', 'flag'])
  },
  methods: {
    // 点赞功能
    async likings (v) {
      // 判断用户是否登录
      if (this.user) {
        if (v.is_liking) {
          // 已点赞
          await deleteLikings(v.com_id)
          v.like_count--
        } else {
          // 未点赞
          await likings(v.com_id)
          v.like_count++
        }
        v.is_liking = !v.is_liking
      } else {
        this.$toast('请先登录后在进行操作')
      }
    },
    addReply () {
      if (this.flag) {
        this.$store.commit('setReply', this.v)
        this.$emit('show-reply')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.list-container {
  .cell-item {
    .van-image {
      width: 80px;
      height: 80px;
    }
    .van-cell__title {
      flex: unset;
      margin-right: 20px;
    }
    ::v-deep .van-cell__value {
      text-align: left;
      .right-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-item {
          border: 0;
          .van-button__content {
            .van-button__text {
              display: flex;
              justify-content: center;
              .van-icon {
                font-size: 30px;
              }
            }
          }
          .text {
            font-size: 22px;
            margin-left: 12px;
          }
        }
        .name {
          font-size: 27px;
          color: #406599;
        }
        .likeing {
          color: #e5645f;
        }
      }
      .value-item {
        color: #222222;
        .p1-item {
          font-size: 30px;
        }
        .p2-item {
          font-size: 26px;
        }
        .van-button--mini {
          width: 140px;
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
