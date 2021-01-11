<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row class="mt-10">
        <v-col cols="12" md="5">
          <v-img :src="roomData.image"></v-img>
        </v-col>
        <v-col cols="12" md="7">
          <v-row>
            <v-simple-table>
              <template>
                <tbody>
                  <tr>
                    <td>参加イベント</td>
                    <td>
                      <a :href="eventData.event_url" target="_blank">{{
                        eventData.event_name
                      }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>ルーム名</td>
                    <td>{{ roomData.room_name }}</td>
                  </tr>
                  <tr>
                    <td>ルームレベル</td>
                    <td>{{ roomData.room_level }}</td>
                  </tr>
                  <tr>
                    <td>ジャンル</td>
                    <td>{{ roomData.genre_name }}</td>
                  </tr>
                  <tr>
                    <td>配信ページ</td>
                    <td>
                      <a :href="roomData.share_url_live" target="_blank">{{
                        roomData.room_url_key
                      }}</a>
                    </td>
                  </tr>
                  <tr>
                    <td>プロフィールページ</td>
                    <td>
                      <a :href="roomData.share_url" target="_blank">{{
                        roomData.room_id
                      }}</a>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
          <v-row class="mt-5 ml-1">
            <span
              v-if="roomData.sns_list"
              v-for="(item, i) in roomData.sns_list"
              :key="i"
            >
              <a :href="item.url" target="_blank"
                ><v-img max-width="50" :src="item.icon"></v-img
              ></a>
            </span>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="10">
      <v-row class="mt-5">
        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-card-text>
              <div>順位</div>
              <p class="display-1 text--primary">
                {{
                  userData[0].point[userData[0].point.length - 1].rank
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}位 <small>/ {{ eventData.data.length }}位中</small>
                <span
                  v-if="
                    userData[0].point[userData[0].point.length - 1].rank ==
                    userData[0].point[userData[0].point.length - 2].rank
                  "
                  class="blue--text"
                  >ー</span
                >
                <span
                  v-else-if="
                    userData[0].point[userData[0].point.length - 1].rank <
                    userData[0].point[userData[0].point.length - 2].rank
                  "
                  class="green--text"
                  >↑</span
                >
                <span v-else class="red--text">↓</span>
              </p>
              <div>
                <div
                  class="text--primary"
                  v-if="
                    userData[0].point[userData[0].point.length - 1].rank ==
                    userData[0].point[userData[0].point.length - 2].rank
                  "
                >
                  順位変動無し<span class="yellow--text">　-　</span>
                </div>
                <div
                  v-else-if="
                    userData[0].point[userData[0].point.length - 1].rank >
                    userData[0].point[userData[0].point.length - 2].rank
                  "
                >
                  前回集計時順位<span class="red--text"
                    >　{{
                      userData[0].point[userData[0].point.length - 2].rank
                    }}位　</span
                  >
                </div>
                <div v-else>
                  前回集計時順位<span class="green--text"
                    >　{{
                      userData[0].point[userData[0].point.length - 2].rank
                    }}位　</span
                  >
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-card-text>
              <div>トータルポイント</div>
              <p class="display-1 text--primary">
                {{
                  userData[0].point[userData[0].point.length - 1].point
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </p>
              <div class="text--primary">
                {{
                  userData[0].point[userData[0].point.length - 1].rank != 1
                    ? '次の順位まであと'
                    : '2位との差'
                }}
                {{
                  userData[0].point[userData[0].point.length - 1].gap
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-card-text>
              <div>フォロワー数</div>
              <p class="display-1 text--primary">
                {{
                  roomData.follower_num
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人
                <span
                  v-if="
                    roomData.follower_num ==
                    userData[0].point[userData[0].point.length - 2].follower_num
                  "
                  class="blue--text"
                  >ー</span
                >
                <span
                  v-else-if="
                    roomData.follower_num >
                    userData[0].point[userData[0].point.length - 2].follower_num
                  "
                  class="green--text"
                  >↑</span
                >
                <span v-else class="red--text">↓</span>
              </p>
              <div
                class="text--primary"
                v-if="
                  roomData.follower_num ==
                  userData[0].point[userData[0].point.length - 2].follower_num
                "
              >
                フォロワー変動無し<span class="yellow--text">　-　</span>
              </div>
              <div
                v-else-if="
                  roomData.follower_num <
                  userData[0].point[userData[0].point.length - 2].follower_num
                "
              >
                前回集計時より<span class="red--text"
                  >　-{{
                    userData[0].point[userData[0].point.length - 2]
                      .follower_num - roomData.follower_num
                  }}人　</span
                >
              </div>
              <div v-else>
                前回集計時より<span class="green--text"
                  >　+{{
                    roomData.follower_num -
                    userData[0].point[userData[0].point.length - 2]
                      .follower_num
                  }}人　</span
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-card-text>
              <div>イベント内平均ポイント</div>
              <p class="display-1 text--primary">
                {{ pointAvg.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') }}pt
                <span
                  v-if="
                    userData[0].point[userData[0].point.length - 1].point >
                    pointAvg
                  "
                  class="green--text"
                  >↑</span
                >
                <span v-else class="red--text">↓</span>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto">
            <v-card-text>
              <div>イベント内フォロワー平均人数</div>
              <p class="display-1 text--primary">
                {{
                  followerAvg.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人
                <span
                  v-if="
                    userData[0].point[userData[0].point.length - 1]
                      .follower_num > followerAvg
                  "
                  class="green--text"
                  >↑</span
                >
                <span v-else class="red--text">↓</span>
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" v-if="dayPoint.length > 2">
          <v-card class="mx-auto">
            <v-card-text>
              <div>本日の獲得ポイント</div>
              <p class="display-1 text--primary">
                {{
                  (
                    dayPoint[dayPoint.length - 1] -
                    dayPoint[dayPoint.length - 2]
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
                <small class="text-caption"
                  >/ 前日比
                  {{
                    Math.round(
                      ((dayPoint[dayPoint.length - 1] -
                        dayPoint[dayPoint.length - 2]) /
                        (dayPoint[dayPoint.length - 2] -
                          dayPoint[dayPoint.length - 3])) *
                        100
                    )
                  }}%</small
                >
                <span
                  v-if="
                    Math.round(
                      ((dayPoint[dayPoint.length - 1] -
                        dayPoint[dayPoint.length - 2]) /
                        (dayPoint[dayPoint.length - 2] -
                          dayPoint[dayPoint.length - 3])) *
                        100
                    ) >= 100
                  "
                  class="green--text"
                  >↑</span
                >
                <span v-else class="red--text">↓</span>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-else-if="dayPoint.length > 1">
          <v-card class="mx-auto">
            <v-card-text>
              <div>本日の獲得ポイント</div>
              <p class="display-1 text--primary">
                {{
                  (
                    dayPoint[dayPoint.length - 1] -
                    dayPoint[dayPoint.length - 2]
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" v-else>
          <v-card class="mx-auto">
            <v-card-text>
              <div>本日の獲得ポイント</div>
              <p class="display-1 text--primary">
                {{
                  (dayPoint[dayPoint.length - 1] - 0)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="10" v-if="contribution">
      <v-col>
        <h1 class="text-caption">貢献100位までのユーザー</h1>
      </v-col>
      <v-col>
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="text-left">ランキング</th>
                <th class="text-left">貢献ユーザー</th>
                <th class="text-left">支援ポイント</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in contribution" :key="i">
                <td>{{ item.rank }}</td>
                <td>{{ item.user }}</td>
                <td>{{ item.point }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Chart from '@/components/Chart.vue'
import firebase from '@/plugins/firebase'

export default {
  components: {
    Chart,
  },
  async asyncData({ env, params }) {
    const db = firebase.firestore()

    let eventData = []
    let userData = null
    let roomData = null
    await db
      .collection('event')
      .doc(String(params.event))
      .get()
      .then(function (doc) {
        eventData = doc.data()
        userData = eventData.data.filter((val) => {
          return val.room_id == params.id
        })
      })

    await axios
      .get(
        'https://niconico-showroom-api.herokuapp.com/apis/profile/' + params.id
      )
      .then((response) => {
        roomData = response.data
      })

    let contribution = null
    let url = eventData.event_url.split('/')

    await axios
      .get(
        'https://niconico-showroom-api.herokuapp.com/apis/contribution/' +
          url[url.length - 1] +
          '/' +
          params.id
      )
      .then((response) => {
        contribution = response.data
      })
      .catch((e) => {})
    return { eventData, userData, roomData, contribution }
  },
  data() {
    return {
      loaded: false,
      height: 400,
      dayPoint: [],
      pointAvg: 0,
      followerAvg: 0,
    }
  },
  head() {
    return {
      title: this.roomData.room_name,
      htmlAttrs: {
        lang: 'ja',
      },
    }
  },
  mounted() {
    let followerSum = 0
    let pointSum = 0

    for (let i = 0; i < this.eventData.data.length; i++) {
      pointSum += this.eventData.data[i].point[
        this.eventData.data[i].point.length - 1
      ].point
      followerSum += this.eventData.data[i].point[
        this.eventData.data[i].point.length - 1
      ].follower_num
    }

    this.pointAvg = Math.round(pointSum / this.eventData.data.length)
    this.followerAvg = Math.round(followerSum / this.eventData.data.length)

    this.dayChart()
  },
  methods: {
    dayChart() {
      let check = ''

      for (let i in this.eventData.data) {
        if (this.eventData.data[i].room_id == this.roomData.room_id) {
          let testData = []
          // let testData2 = []
          // let testData3 = []

          let arrayLength = this.eventData.data[i].point.length
          for (let j in this.eventData.data[i].point) {
            let val = moment
              .unix(this.eventData.data[i].point[j].create_at)
              .format('YYYY/MM/DD')

            if (j == 0) {
              check = val
              if (j == arrayLength - 1) {
                testData.push(this.eventData.data[i].point[j].point)
                // testData2.push(this.eventData.data[i].point[j].follower_num)
                // testData3.push(this.eventData.data[i].point[j].rank)
              }
            } else {
              if (check != val) {
                testData.push(this.eventData.data[i].point[Number(j) - 1].point)
                // testData2.push(
                //   this.eventData.data[i].point[Number(j) - 1].follower_num
                // )
                // testData3.push(this.eventData.data[i].point[Number(j) - 1].rank)
                check = val
              }
              if (j == arrayLength - 1) {
                testData.push(this.eventData.data[i].point[j].point)
                // testData2.push(this.eventData.data[i].point[j].follower_num)
                // testData3.push(this.eventData.data[i].point[j].rank)
              }
            }
          }
          this.dayPoint = testData
        }
      }
    },
  },
}
</script>
