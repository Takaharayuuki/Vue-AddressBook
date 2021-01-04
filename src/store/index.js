import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //* データの様な扱い
    drawer: false
  },
  mutations: {
    //* 2.actionから指示を受けて動作する
    //* stateの状態を変更する
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    }
  },
  actions: {
    //* 1.コンポーネントから指示を受けて最初に動作する
    //* commitによってmutationを動かす
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    }
  },
})
