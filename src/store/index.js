import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('Token'),
    is_followed: false,
    aut_id: null,
    is_collected: false,
    art_id: null,
    attitude: null,
    commonList: {},
    reply: {},
    type: '',
    source: null,
    article_id: null,
    flag: true
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('Token', state.user)
    },
    setFollow (state, data) {
      state.is_followed = data
    },
    setAut_id (state, data) {
      state.aut_id = data
    },
    setCollected (state, data) {
      state.is_collected = data
    },
    setArt_id (state, data) {
      state.art_id = data
    },
    setAttitude (state, data) {
      state.attitude = data
    },
    setcommonPost (state, data) {
      state.commonList = data
    },
    setReply (state, data) {
      state.reply = data
    },
    setType (state, data) {
      state.type = data
    },
    setSource (state, data) {
      state.source = data
    },
    setArticle_id (state, data) {
      state.article_id = data
    },
    setFlag (state, data) {
      state.flag = data
    }
  },
  actions: {
  },
  modules: {
  }
})
