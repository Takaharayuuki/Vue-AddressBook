<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>連絡先一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 >
        <router-link :to="{ name: 'Address_edit'}">
          <v-btn color="info">
            連絡先追加
          </v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='addresses'>
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.tel }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-center">
              <span>
                <router-link :to="{ name: 'Address_edit', params: { address_id: props.item.id }}">
                  <v-icon small class="mr-2">edit</v-icon>
                </router-link>
              </span>
              <span>
                <v-icon small class="ml-2" @click="deleteConfirm(props.item.id)">delete</v-icon>
              </span>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      headers: [
        { text: '名前', value: 'name' },
        { text: '電話番号', value: 'tel' },
        { text: 'メールアドレス', value: 'email' },
        { text: '住所', value: 'address' },
        { text: '操作', sortable: false }
      ],
      addresses: []
    }
  },
  created() {
    this.addresses = this.$store.state.addresses
  },
  methods: {
    ...mapActions(['deleteAddress']),
    deleteConfirm(id) {
      this.deleteAddress({id})
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>