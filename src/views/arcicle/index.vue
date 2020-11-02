<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮 -->
          <follow-user />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="contentRef"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <!-- 评论列表 -->
        <commen-list @total_count="getCount" @show-reply="isReplyShow = true" />

        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="showPopup = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="total_count" color="#777" />
          <collect-article />
          <like-article />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus == 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 添加评论对话框 -->
    <van-popup v-model="showPopup" position="bottom" :style="{ height: '20%' }">
      <commen-post @addCommon="closePopup" />
    </van-popup>
    <!-- 回复评论弹框 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 95%">
      <commen-reply @click-close="closeReply" v-if="isReplyShow" />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-article'
import commenList from '@/views/arcicle/commen-list'
import CommenPost from '@/views/arcicle/commen-post'
import CommenReply from '@/views/arcicle/commoen-reply'

export default {
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: [],
      loading: true,
      errStatus: 0,
      total_count: null,
      showPopup: false,
      isReplyShow: false
    }
  },
  created () {
    this.getArticle()
  },
  computed: {

  },
  components: {
    FollowUser,
    collectArticle,
    likeArticle,
    commenList,
    CommenPost,
    CommenReply
  },
  methods: {
    async getArticle () {
      this.loading = true
      // 传递参数来分别获取评论或者回复评论
      this.$store.commit('setType', 'a')
      this.$store.commit('setSource', this.articleId)
      //
      const res = await getArticleById(this.articleId)
      // console.log(res)
      if (res) {
        this.article = res.data
        // 通过vuex传递关注状态参数
        this.$store.commit('setFollow', res.data.is_followed)
        this.$store.commit('setAut_id', res.data.aut_id)
        this.$store.commit('setCollected', res.data.is_collected)
        this.$store.commit('setArt_id', res.data.art_id)
        this.$store.commit('setAttitude', res.data.attitude)
        setTimeout(() => {
          this.preview()
        }, 0)
      } else {
        this.errStatus = 404
      }
      this.loading = false
    },
    // 预览图片功能
    preview () {
      const imags = this.$refs.contentRef.querySelectorAll('img')
      const images = []
      imags.forEach((v, i) => {
        images.push(v.src)
        v.onclick = () => {
          ImagePreview({
            images,
            startPosition: i
          })
        }
      })
    },
    getCount (val) {
      this.total_count = val
    },
    closePopup () {
      // console.log(111)
      // this.$store.commit('setFlag', false)
      this.showPopup = false
    },
    closeReply () {
      this.$store.commit('setFlag', true)
      this.$store.commit('setSource', this.articleId)
      this.$store.commit('setArticle_id', null)
      this.isReplyShow = false
    }
  }

}
</script>

<style lang="scss" scoped>
.article-container {
  .van-icon-arrow-left {
    color: #fff;
    font-size: 40px;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    ::v-deep.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
