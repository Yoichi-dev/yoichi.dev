<template>
  <div>
    <div class="mt-10" v-if="avatars.length != 0">
      <v-row class="mt-12 px-5" justify="center">
        <p class="title text--primary">
          集計に登録されているユーザのアバター一覧
        </p>
      </v-row>
      <v-row class="px-5" justify="center">
        <p class="text--primary">タップでルームへ飛べます</p>
      </v-row>
      <v-row justify="space-around">
        <div v-for="(avatar, i) in avatars" :key="i">
          <v-avatar style="cursor: pointer" size="70">
            <img
              :src="
                'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                avatar.avatar_id
              "
              :alt="avatar.room_id"
              @click="moveLink(avatar.room_id)"
            />
          </v-avatar>
        </div>
      </v-row>
    </div>
    <div class="mt-10" v-else>
      <v-row class="mt-12 px-5" justify="center">
        <p class="title text--primary">
          集計に登録されているユーザのアバター一覧
        </p>
      </v-row>
      <v-row class="px-5" justify="center">
        <p class="text--primary">現在登録されているアバターはありません</p>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ env }) {
    let avatars = null
    await axios.get(env.API_URL + '/api/avatars').then((response) => {
      avatars = response.data
    })
    return { avatars }
  },
  methods: {
    moveLink(room_id) {
      window.open(
        'https://www.showroom-live.com/room/profile?room_id=' + room_id,
        '_blank'
      )
    },
  },
  head() {
    return {
      title: 'アバター一覧',
    }
  },
}
</script>
