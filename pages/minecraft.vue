<template>
  <v-container fluid>
    <v-row class="mt-12 px-5" justify="center">
      <p class="title text--primary">
        配信での使用、参加型で使用可のJavaエディションサーバー
      </p>
    </v-row>
    <v-row class="px-5" justify="center">
      <p class="text--primary">ご自由にお使いください</p>
    </v-row>
    <v-row align="center" justify="center">
      <v-card class="mx-auto my-12" v-if="Object.keys(minecraft).length === 4">
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

      <v-card class="mx-auto my-12" v-else>
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

        <v-card-title>現在サーバー停止中</v-card-title>

        <v-card-text>
          <div class="subtitle-1">接続中のユーザ　0 人 / 0 人中</div>
          <div class="subtitle-1">バージョン　error</div>
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
    server = env.MINECRAFT_SERVER

    await axios.get(env.API_URL + '/api/game').then((response) => {
      minecraft = response.data
    })

    return { minecraft, server }
  },
  head() {
    return {
      title: 'Minecraftサーバー',
    }
  },
}
</script>
