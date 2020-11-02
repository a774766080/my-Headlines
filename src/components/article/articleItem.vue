<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell :to="'/article/' + article.art_id">
        <!-- 标题内容 -->
        <template #title>
          <div class="item-title van-multi-ellipsis--l2">
            {{ article.title }}
          </div>
        </template>
        <!-- 描述内容 -->
        <template #label>
          <div class="item-label">
            <div class="cover-wrap" v-if="article.cover.images.length > 1">
              <div
                class="cover-item"
                v-for="(v, i) in article.cover.images"
                :key="'、' + i"
              >
                <img :src="v" />
              </div>
            </div>
            <div class="label-info-wrap">
              <ul class="info-item">
                <li>{{ article.aut_name }}</li>
                <li>{{ article.comm_count }}评论</li>
                <li>{{ article.pubdate | relativeTime }}</li>
              </ul>
            </div>
          </div>
        </template>
        <!-- 右侧内容 -->
        <template #default v-if="article.cover.images.length === 1">
          <div
            class="cover-item"
            v-for="(v, i) in article.cover.images"
            :key="',' + i"
          >
            <img :src="v" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  position: relative;
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 234px;
    height: 149px;
    padding-left: 25px;
    .cover-item {
      img {
        width: 234px;
        height: 149px;
        object-fit: cover;
      }
    }
  }
  .item-label {
    .cover-wrap {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        padding-right: 4px;
        &:last-child {
          padding-right: 0;
        }
        img {
          width: 232px;
          height: 149px;
          object-fit: cover;
        }
      }
    }
    .label-info-wrap {
      .info-item {
        display: flex;
        li {
          margin-right: 24px;
          font-size: 23px;
          color: #b4b4b4;
        }
      }
    }
  }
}
</style>
