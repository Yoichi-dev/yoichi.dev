<template>
  <v-row justify="center" align="center">
    <h1 class="text-h5 mt-10">現在集計中のイベント一覧</h1>
    <v-col cols="12" md="10">
      <v-row>
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
    this.unixTime = Math.floor(new Date().getTime() / 1000)
    axios
      .get(process.env.SHOWROOM_EVENT_ANALYZE_API_EVENT_LIST)
      .then((response) => {
        response.data.data.forEach((element) => {
          if (element.ended_at > this.unixTime) {
            this.events.push(element)
          } else {
            this.endEvent.push(element)
          }
        })
      })
  },
}
</script>
