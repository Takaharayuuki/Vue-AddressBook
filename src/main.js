import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

  const firebaseConfig = {
    apiKey: "AIzaSyByK57uFLA0UNfF0H2V3xsJau-VupOewVA",
    authDomain: "my-address-pj-f0dd4.firebaseapp.com",
    projectId: "my-address-pj-f0dd4",
    storageBucket: "my-address-pj-f0dd4.appspot.com",
    messagingSenderId: "79272006652",
    appId: "1:79272006652:web:dc3dce29834227cb711879"
  };
  firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
