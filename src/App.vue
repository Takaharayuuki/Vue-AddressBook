<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon @click="toggleSideMenu"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        マイアドレス帳
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <side-nav></side-nav>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//! mapactinos を使用した方が便利
import { mapActions } from 'vuex'
import SideNav from './components/SideNav'
import firebase from 'firebase'
export default {
  name: 'App',
  components: {
    SideNav
  },
  data () {
    return {

    }
  },
  methods: {
    //? 方法１
    //* store.jsのactionの'toggleSideMenu'を呼べる
    //* this.$store.dispatch でstoreのアクションにアクセスできる
    // openSideMenu() {
    //   this.$store.dispatch('toggleSideMenu')
    // }
    //? 方法２
    //! mapactinos を使用した方が便利
    ...mapActions(['toggleSideMenu', 'setLoginUser','deleteLoginUser','logout'])
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setLoginUser(user)
      } else {
        this.deleteLoginUser(user)
      }
    })
  }
}
</script>
