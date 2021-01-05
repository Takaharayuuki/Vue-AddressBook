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
    addAddress(state, { id, address}) {
      // addressを引数で受け取り stateのaddresses配列に追加
      address.id = id
      state.addresses.push(address)
    },
    updateAddress (state, { id, address}) {
      const index = state.addresses.findIndex(address => address.id === id)
      state.addresses[index] = address
    }
  },
  actions: {
    // 1.コンポーネントから指示を受けて最初に動作する
    // commitによってmutationを動かす
    toggleSideMenu({ commit }) {
      commit('toggleSideMenu')
    },
    addAddress({ getters, commit }, address) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address)
        .then( doc => { commit('addAddress',{ id: doc.id, address}) })
      }
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
          snapshot.forEach(doc => commit('addAddress',{ id: doc.id, address: doc.data()}))
      })
    },
    updateAddress ({ getters, commit}, {id, address}) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address)
        .then(() => { commit('updateAddress',{ id, address }) })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id)
  }
})
