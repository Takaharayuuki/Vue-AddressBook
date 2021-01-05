import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  // データの様な扱い
  state: {
    login_user: null,
    drawer: false,
    addresses: []
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state) {
      state.login_user = null
    },
    // 2.actionから指示を受けて動作する
    // stateの状態を変更する
    toggleSideMenu(state) {
      state.drawer = !state.drawer
    },
    addAddress(state, address) {
      // addressを引数で受け取り stateのaddresses配列に追加
      state.addresses.push(address)
    }
  },
  actions: {
    // 1.コンポーネントから指示を受けて最初に動作する
    // commitによってmutationを動かす
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress({ getters, commit }, address) {
      if(getters.uid) firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address)
      // address を引数に渡してmutasionsを呼び出す
      commit('addAddress', address)
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      // googleの認証画面にリダイレクトする
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    setLoginUser({ commit}, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser')
    },
    logout() {
      firebase.auth().signOut()
    },
    fetchAddresses({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
          snapshot.forEach(doc => commit('addAddress', doc.data()))
        })
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null
  }
})
