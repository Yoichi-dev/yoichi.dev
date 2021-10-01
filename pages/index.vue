<template>
  <div>
    <v-row class="mt-5 px-3" justify="center">
      <v-alert outlined type="error" prominent border="left">
        このサイトのURLが新しくなりました（<a
          href="https://point-history.showroom-app.com/"
          target="_blank"
          >Point History</a
        >）今後はこちらをお使いください
      </v-alert>
    </v-row>
    <!-- <v-row class="mt-5" v-if="nowEvents.length != 0">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        xl="3"
        v-for="(event, i) in nowEvents"
        :key="i"
      >
        <v-hover v-slot:default="{ hover }" close-delay="50">
          <v-card
            :elevation="hover ? 16 : 2"
            @click="$router.push('/event/' + event.event_id)"
          >
            <v-img
              :src="
                event.image
                  .replace('_s.png', '_l.png')
                  .replace('_s.jpeg', '_l.jpeg')
              "
            ></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="mt-12" justify="center" v-else>
      <p class="title text--primary">現在集計してるイベントはありません</p>
    </v-row> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ env }) {
    let events = null
    await axios.get(env.API_URL + '/api/events').then((response) => {
      events = response.data
    })

    let nowTime = Math.round(new Date().getTime() / 1000)

    let nowEvents = events.filter(
      (event) => event.started_at < nowTime && event.ended_at > nowTime
    )

    return { nowEvents }
  },
  head() {
    return {
      title: 'HOME',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'SHORWOOMイベントのポイント集計履歴を確認する事ができます',
        },
        {
          hid: 'twitter:creator',
          property: 'twitter:creator',
          content: '@yoichiro_sub',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'SRイベントポイント集計履歴',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'SHORWOOMイベントのポイント集計履歴を確認する事ができます',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://yoichi.dev/common/ogp_img.png',
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary',
        },
      ],
    }
  },
}
</script>
