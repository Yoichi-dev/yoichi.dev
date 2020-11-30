<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10" align="center" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="green"
        indeterminate
      ></v-progress-circular>
    </v-col>
    <v-col cols="12" md="10" align="center">
      <h1 class="text-h5 mt-10">現在集計中のイベント</h1>
    </v-col>
    <v-col cols="12" md="10">
      <v-row v-if="events.length">
        <v-col cols="12" sm="4" md="4" v-for="(event, i) in events" :key="i">
          <v-hover v-slot:default="{ hover }" close-delay="50">
            <v-card class="mx-auto" :elevation="hover ? 16 : 2">
              <v-img class="white--text align-end" :src="event.image"> </v-img>
              <v-card-subtitle class="pb-0"
                >{{ formatDate(event.started_at) }} ～
                {{ formatDate(event.ended_at) }}</v-card-subtitle
              >
              <v-card-text class="text--primary">
                <div>{{ event.event_name }}</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :to="'/event/' + event.event_id"
                  nuxt
                  text
                >
                  詳細
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <v-row v-else>
        分析サーバーのコストが割りに合わなかったため停止中…<br /><br />面白いから見たい、必要だって人は連絡ください<br /><br />再開するかも
        <!-- 現在集計中のイベントはありません<br /><br />又は、00分丁度はイベント更新中なので30秒ほど経ってから再度読み込んでください<br /><br />また、1時～7時はシステム休止中です -->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      events: [],
      endEvent: [],
      unixTime: null,
      loading: true,
    }
  },
  head() {
    return {
      title: 'ホーム',
    }
  },
  computed: {
    formatDate: () => (inputDate) => {
      return moment.unix(inputDate).format('YYYY/MM/DD(ddd) HH:mm')
    },
  },
  mounted() {
    // this.unixTime = Math.floor(new Date().getTime() / 1000)
    // axios
    //   .get(process.env.SHOWROOM_EVENT_ANALYZE_API_EVENT_LIST)
    //   .then((response) => {
    //     response.data.data.forEach((element) => {
    //       if (element.ended_at > this.unixTime) {
    //         this.events.push(element)
    //       } else {
    //         this.endEvent.push(element)
    //       }
    //     })
    //     this.loading = false
    //   })
  },
}
</script>
