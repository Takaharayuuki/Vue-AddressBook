<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        マイアドレス帳
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <side-nav></side-nav>
    <v-content>
    </v-content>
  </v-app>
</template>

<script>
import SideNav from './components/SideNav'
export default {
  name: 'App',
  components: {
    SideNav
  },
  data () {
    return {
      
    }
  }
}
</script>
