import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //* データの様な扱い
    drawer: false,
    addresses: []
  },
  mutations: {
    //* 2.actionから指示を受けて動作する
    //* stateの状態を変更する
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    addAddress(state, address) {
      //? addressを引数で受け取り stateのaddresses配列に追加
      state.addresses.push(address)
    }
  },
  actions: {
    //* 1.コンポーネントから指示を受けて最初に動作する
    //* commitによってmutationを動かす
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress({ commit }, address) {
      //? address を引数に渡してmutasionを呼び出す
      commit('addAddress', address)
    }
  },
})
