<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>連絡先編集</h1>
      </v-flex>

      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="address.name" label="名前"></v-text-field>
              <v-text-field v-model="address.tel" label="電話番号"></v-text-field>
              <v-text-field v-model="address.email" label="メールアドレス"></v-text-field>
              <v-text-field v-model="address.address" label="住所"></v-text-field>
              <!-- $router.push({{ // }})でrouteを指定できる -->
              <v-btn @click="$router.push({ name: 'Addresses' })">キャンセル</v-btn>
              <v-btn color="info" @click="submit">保存</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      address: {}
    }
  },
  methods: {
    submit() {
      //* storeのアクションにthis.addressを渡す
      this.addAddress(this.address)
      //* アドレス画面一覧に遷移する
      this.$router.push({ name: 'Addresses' })
      //* アドレスの中身を初期化する
      this.address = {}
    },
    //? storeからactionを使える様にする
    ...mapActions(['addAddress'])
  },
}
</script>