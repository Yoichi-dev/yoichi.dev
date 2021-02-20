<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-card class="mx-auto my-12">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="250"
          :src="require('@/assets/img/minecraft.png')"
        ></v-img>

        <v-card-title>{{ minecraft.description.text }}</v-card-title>

        <v-card-text>
          <div class="subtitle-1">
            接続中のユーザ　{{ minecraft.players.online }} 人 /
            {{ minecraft.players.max }} 人中
          </div>
          <div class="subtitle-1">バージョン　{{ minecraft.version.name }}</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>サーバーURL<br />{{ server }}</v-card-title>

        <v-card-text></v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ env }) {
    let minecraft = null
    let server = null
    await axios.get(env.MINECRAFT_PING).then((response) => {
      minecraft = response.data
    })
    server = env.MINECRAFT_SERVER
    return { minecraft, server }
  },
  head() {
    return {
      title: 'Minecraft死活監視',
    }
  },
}
</script>
