<template>
  <div>
    <v-row class="mt-5" v-if="nowEvents.length != 0">
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
            <v-img :src="event.image"></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="mt-12" justify="center" v-else>
      <p class="title text--primary">現在集計してるイベントはありません</p>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData() {
    let events = null
    await axios.get('/api/events').then((response) => {
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
    }
  },
}
</script>
