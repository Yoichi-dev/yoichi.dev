<template>
  <div>
    <v-row class="mt-5 px-3" justify="center" v-if="endFlg">
      <v-alert outlined type="warning" prominent border="left">
        最終集計ptはあくまでも59分00秒時点での集計ptになります<br />
        （59分59秒時点のptではありません）
      </v-alert>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="userData.image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template>
            <tbody>
              <tr>
                <td>ルーム名</td>
                <td>{{ userData.room_name }}</td>
              </tr>
              <tr>
                <td>ルームレベル</td>
                <td>{{ userData.room_level }}</td>
              </tr>
              <tr>
                <td>ジャンル</td>
                <td>{{ userData.genre_name }}</td>
              </tr>
              <tr>
                <td>配信ページ</td>
                <td>
                  <a :href="userData.share_url_live" target="_blank">{{
                    userData.room_url_key
                  }}</a>
                </td>
              </tr>
              <tr>
                <td>プロフィールページ</td>
                <td>
                  <a :href="userData.share_url" target="_blank">{{
                    userData.room_id
                  }}</a>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-row class="mt-5 ml-1" v-if="userData.sns_list">
          <span v-for="(item, i) in userData.sns_list" :key="i">
            <a :href="item.url" target="_blank"
              ><v-img max-width="50" :src="item.icon"></v-img
            ></a>
          </span>
        </v-row>
      </v-col>
    </v-row>
    <v-row id="viewWidth">
      <!-- 順位 -->
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line v-if="this.eventHistory.length > 1">
            <v-list-item-content>
              <div class="text-overline mb-4">順位</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  eventHistory[this.eventHistory.length - 1].rank
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}位 <small>/ {{ aggregateData.length }}位中</small>
              </v-list-item-title>
              <v-list-item-subtitle>
                前回集計時の順位
                {{ eventHistory[this.eventHistory.length - 2].rank }}位
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-icon
              v-if="
                eventHistory[this.eventHistory.length - 2].rank -
                  eventHistory[this.eventHistory.length - 1].rank ==
                0
              "
              size="80"
              color="blue"
              >mdi-trending-neutral</v-icon
            >
            <v-icon
              v-else
              size="80"
              :color="
                eventHistory[this.eventHistory.length - 1].rank -
                  eventHistory[this.eventHistory.length - 2].rank <
                0
                  ? 'green'
                  : 'red'
              "
            >
              {{
                eventHistory[this.eventHistory.length - 1].rank -
                  eventHistory[this.eventHistory.length - 2].rank <
                0
                  ? 'mdi-trending-up'
                  : 'mdi-trending-down'
              }}
            </v-icon>
          </v-list-item>
          <v-list-item three-line v-else>
            <v-list-item-content>
              <div class="text-overline mb-4">順位</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  eventHistory[this.eventHistory.length - 1].rank
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}位 <small>/ {{ aggregateData.length }}位中</small>
              </v-list-item-title>
              <v-list-item-subtitle v-if="this.eventHistory.length > 1">
                前回集計時の順位
                {{ eventHistory[this.eventHistory.length - 2].rank }}位
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-icon v-if="this.eventHistory.length == 1" size="80" color="blue">
              mdi-swap-vertical
            </v-icon>
            <v-icon
              v-else-if="
                this.eventHistory.length > 2 &&
                eventHistory[this.eventHistory.length - 2].rank -
                  eventHistory[this.eventHistory.length - 1].rank ==
                  0
              "
              size="80"
              color="blue"
              >mdi-trending-neutral</v-icon
            >
            <v-icon
              v-else
              size="80"
              :color="
                this.eventHistory.length > 2 &&
                eventHistory[this.eventHistory.length - 1].rank -
                  eventHistory[this.eventHistory.length - 2].rank <
                  0
                  ? 'green'
                  : 'red'
              "
            >
              {{
                this.eventHistory.length > 2 &&
                eventHistory[this.eventHistory.length - 1].rank -
                  eventHistory[this.eventHistory.length - 2].rank <
                  0
                  ? 'mdi-trending-up'
                  : 'mdi-trending-down'
              }}
            </v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <!-- トータルポイント -->
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line v-if="this.eventHistory.length > 1">
            <v-list-item-content>
              <div class="text-overline mb-4">トータルポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  eventHistory[this.eventHistory.length - 1].point
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="eventHistory[this.eventHistory.length - 1].rank == 1"
                >2位との差
                {{
                  eventHistory[this.eventHistory.length - 1].gap
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt</v-list-item-subtitle
              >
              <v-list-item-subtitle v-else
                >次の順位との差
                {{
                  eventHistory[this.eventHistory.length - 1].gap
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon size="80" color="green">
              {{
                eventHistory[this.eventHistory.length - 1].rank == 1
                  ? 'mdi-crown'
                  : 'mdi-file-powerpoint-box-outline'
              }}
            </v-icon>
          </v-list-item>
          <v-list-item three-line v-else>
            <v-list-item-content>
              <div class="text-overline mb-4">トータルポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  this.eventHistory[this.eventHistory.length - 1].point
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="blue"> mdi-swap-vertical </v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <!-- 本日のポイント -->
      <v-col cols="12" sm="6" lg="4" xl="3" v-if="todayFlg">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line v-if="todayPointList.length > 1">
            <v-list-item-content>
              <div class="text-overline mb-4">本日のポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  (
                    todayPointList[todayPointList.length - 1] -
                    todayPointList[todayPointList.length - 2]
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </v-list-item-title>
              <v-list-item-subtitle v-if="todayPointList.length > 3">
                前日比
                {{
                  Math.round(
                    ((todayPointList[todayPointList.length - 1] -
                      todayPointList[todayPointList.length - 2]) /
                      (todayPointList[todayPointList.length - 2] -
                        todayPointList[todayPointList.length - 3])) *
                      100
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}%
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else>
                前日比
                {{
                  Math.round(
                    ((todayPointList[todayPointList.length - 1] -
                      todayPointList[todayPointList.length - 2]) /
                      todayPointList[todayPointList.length - 2]) *
                      100
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}%
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-icon
              v-if="todayPointList.length > 3"
              size="80"
              :color="
                Math.round(
                  ((todayPointList[todayPointList.length - 1] -
                    todayPointList[todayPointList.length - 2]) /
                    (todayPointList[todayPointList.length - 2] -
                      todayPointList[todayPointList.length - 3])) *
                    100
                ) >= 100
                  ? 'green'
                  : 'red'
              "
            >
              {{
                Math.round(
                  ((todayPointList[todayPointList.length - 1] -
                    todayPointList[todayPointList.length - 2]) /
                    (todayPointList[todayPointList.length - 2] -
                      todayPointList[todayPointList.length - 3])) *
                    100
                ) >= 100
                  ? 'mdi-trending-up'
                  : 'mdi-trending-down'
              }}
            </v-icon>
            <v-icon
              v-else
              size="80"
              :color="
                Math.round(
                  ((todayPointList[todayPointList.length - 1] -
                    todayPointList[todayPointList.length - 2]) /
                    todayPointList[todayPointList.length - 2]) *
                    100
                ) >= 100
                  ? 'green'
                  : 'red'
              "
            >
              {{
                Math.round(
                  ((todayPointList[todayPointList.length - 1] -
                    todayPointList[todayPointList.length - 2]) /
                    todayPointList[todayPointList.length - 2]) *
                    100
                ) >= 100
                  ? 'mdi-trending-up'
                  : 'mdi-trending-down'
              }}
            </v-icon>
          </v-list-item>
          <!-- 初回 -->
          <v-list-item three-line v-else>
            <v-list-item-content>
              <div class="text-overline mb-4">本日のポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  this.eventHistory[this.eventHistory.length - 1].point
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}pt
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="blue"> mdi-swap-vertical </v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <!-- フォロワー数 -->
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line v-if="this.eventHistory.length > 1">
            <v-list-item-content>
              <div class="text-overline mb-4">フォロワー数</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  eventHistory[this.eventHistory.length - 1].follower_num
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人
              </v-list-item-title>
              <v-list-item-subtitle v-if="this.eventHistory.length > 1"
                >前回集計時より
                {{
                  (
                    eventHistory[this.eventHistory.length - 1].follower_num -
                    eventHistory[this.eventHistory.length - 2].follower_num
                  )
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人増加</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon
              v-if="
                eventHistory[this.eventHistory.length - 1].follower_num -
                  eventHistory[this.eventHistory.length - 2].follower_num ==
                0
              "
              size="80"
              color="blue"
              >mdi-trending-neutral</v-icon
            >
            <v-icon
              v-else
              size="80"
              :color="
                eventHistory[this.eventHistory.length - 1].follower_num -
                  eventHistory[this.eventHistory.length - 2].follower_num >
                0
                  ? 'green'
                  : 'red'
              "
            >
              {{
                eventHistory[this.eventHistory.length - 1].follower_num -
                  eventHistory[this.eventHistory.length - 2].follower_num >
                0
                  ? 'mdi-trending-up'
                  : 'mdi-trending-down'
              }}
            </v-icon>
          </v-list-item>
          <v-list-item three-line v-else>
            <v-list-item-content>
              <div class="text-overline mb-4">フォロワー数</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  eventHistory[this.eventHistory.length - 1].follower_num
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="blue"> mdi-swap-vertical </v-icon>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">イベント内平均ポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ avgPoint.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') }}pt
              </v-list-item-title>
            </v-list-item-content>
            <v-icon
              size="80"
              :color="
                eventHistory[this.eventHistory.length - 1].point >= avgPoint
                  ? 'green'
                  : 'red'
              "
              >{{
                eventHistory[this.eventHistory.length - 1].point >= avgPoint
                  ? 'mdi-arrow-up-circle-outline'
                  : 'mdi-arrow-down-circle-outline'
              }}</v-icon
            >
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">イベント内平均フォロワー</div>
              <v-list-item-title class="text-h5 mb-1">
                {{
                  avgFollower.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                }}人
              </v-list-item-title>
            </v-list-item-content>
            <v-icon
              size="80"
              :color="
                eventHistory[this.eventHistory.length - 1].follower_num >=
                avgFollower
                  ? 'green'
                  : 'red'
              "
              >{{
                eventHistory[this.eventHistory.length - 1].follower_num >=
                avgFollower
                  ? 'mdi-arrow-up-circle-outline'
                  : 'mdi-arrow-down-circle-outline'
              }}</v-icon
            >
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-10" v-if="todayFlg">
      <p class="mt-10 title text--primary">本日の時間別ポイント</p>
      <Chart
        :chart-data="todayPointData"
        :options="pointOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10" v-if="todayFlg">
      <p class="mt-10 title text--primary">本日の時間別フォロワー</p>
      <Chart
        :chart-data="todayFollowerData"
        :options="followerOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10" v-if="todayFlg">
      <p class="mt-10 title text--primary">本日の時間別順位</p>
      <Chart
        :chart-data="todayRankData"
        :options="rankOptions"
        :styles="chartStyle"
      />
    </v-row>

    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">日別のポイント</p>
      <Chart
        :chart-data="dayPointData"
        :options="pointOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">日別のフォロワー</p>
      <Chart
        :chart-data="dayFollowerData"
        :options="followerOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">日別の順位</p>
      <Chart
        :chart-data="dayRankData"
        :options="rankOptions"
        :styles="chartStyle"
      />
    </v-row>

    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">全期間のポイント</p>
      <Chart
        :chart-data="allPointData"
        :options="pointOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">全期間のフォロワー</p>
      <Chart
        :chart-data="allFollowerData"
        :options="followerOptions"
        :styles="chartStyle"
      />
    </v-row>
    <v-row justify="center" class="mt-10">
      <p class="mt-10 title text--primary">全期間の順位</p>
      <Chart
        :chart-data="allRankData"
        :options="rankOptions"
        :styles="chartStyle"
      />
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Chart from '@/components/Chart.vue'

export default {
  components: {
    Chart,
  },
  async asyncData({ env, params }) {
    let userData = null
    await axios
      .get(env.API_URL + '/api/users/' + params.room_id)
      .then((response) => {
        userData = response.data
      })
    let eventHistory = null
    await axios
      .get(
        env.API_URL + '/api/histories/' + params.event + '/' + params.room_id
      )
      .then((response) => {
        eventHistory = response.data
      })
    let aggregateData = null
    await axios
      .get(env.API_URL + '/api/histories/aggregate/' + params.event)
      .then((response) => {
        aggregateData = response.data
      })

    let eventData = null
    await axios
      .get(env.API_URL + '/api/events/' + params.event)
      .then((response) => {
        eventData = response.data
      })

    let nowTime = Math.round(new Date().getTime() / 1000)
    let endFlg = false
    if (eventData[0].ended_at < nowTime) {
      endFlg = true
    }

    return { userData, aggregateData, eventHistory, endFlg }
  },
  data() {
    return {
      avgPoint: 0,
      avgFollower: 0,
      totalPoint: 0,
      totalFollower: 0,
      todayFlg: true,
      todayPointList: [],
      todayPointData: {},
      todayFollowerData: {},
      todayRankData: {},
      dayPointData: {},
      dayFollowerData: {},
      dayRankData: {},
      allPointData: {},
      allFollowerData: {},
      allRankData: {},
      pointOptions: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 1000,
        legend: {
          position: 'top',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                userCallback: (value, index, values) => {
                  if (Math.floor(value) === value) {
                    return value.toLocaleString() + 'pt'
                  }
                },
              },
            },
          ],
        },
      },
      followerOptions: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 1000,
        legend: {
          position: 'top',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                userCallback: (value, index, values) => {
                  if (Math.floor(value) === value) {
                    return value.toLocaleString() + '人'
                  }
                },
              },
            },
          ],
        },
      },
      rankOptions: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 1000,
        legend: {
          position: 'top',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                reverse: true,
                beginAtZero: true,
                userCallback: (value, index, values) => {
                  if (Math.floor(value) === value) {
                    return value.toLocaleString() + '位'
                  }
                },
              },
            },
          ],
        },
      },
      chartWidth: 0,
      chartStyle: {
        height: '80vh',
        width: '100px',
        position: 'relative',
      },
    }
  },
  head() {
    return {
      title: '配信者データ',
    }
  },
  mounted() {
    this.chartWidth = document.getElementById('viewWidth').clientWidth
    // 初期化
    this.todayPointData = {
      labels: [],
      datasets: [],
    }
    this.todayFollowerData = {
      labels: [],
      datasets: [],
    }
    this.todayRankData = {
      labels: [],
      datasets: [],
    }
    this.dayPointData = {
      labels: [],
      datasets: [],
    }
    this.dayFollowerData = {
      labels: [],
      datasets: [],
    }
    this.dayRankData = {
      labels: [],
      datasets: [],
    }
    this.allPointData = {
      labels: [],
      datasets: [],
    }
    this.allFollowerData = {
      labels: [],
      datasets: [],
    }
    this.allRankData = {
      labels: [],
      datasets: [],
    }
    this.getAggregate()
    // スマホ
    if (this.$vuetify.breakpoint.name == 'xs') {
      this.chartStyle = {
        height: '40vh',
        width: `${this.chartWidth}px`,
        position: 'relative',
      }
    }
    // iPad（タブレット）
    if (this.$vuetify.breakpoint.name == 'sm') {
      this.chartStyle = {
        height: '40vh',
        width: `${this.chartWidth}px`,
        position: 'relative',
      }
    }
    // iPad Pro（タブレット大）
    if (this.$vuetify.breakpoint.name == 'md') {
      this.chartStyle = {
        height: '40vh',
        width: `${this.chartWidth}px`,
        position: 'relative',
      }
    }
    // PC
    if (this.$vuetify.breakpoint.name == 'lg') {
      this.chartStyle = {
        height: '50vh',
        width: `${this.chartWidth}px`,
        position: 'relative',
      }
    }
    // PC FullHD
    if (this.$vuetify.breakpoint.name == 'xl') {
      this.chartStyle = {
        height: '40vh',
        width: `${this.chartWidth}px`,
        position: 'relative',
      }
    }
    this.createChart()
  },
  methods: {
    getAggregate() {
      // 平均ポイント
      let pointList = this.aggregateData.map((val) => val.point)
      let sumPoint = pointList.reduce((acc, cur) => {
        return acc + cur
      })
      // 平均フォロワー
      let followerList = this.aggregateData.map((val) => val.follower_num)
      let sumFollower = followerList.reduce((acc, cur) => {
        return acc + cur
      })

      this.avgPoint = Math.round(sumPoint / this.aggregateData.length)
      this.avgFollower = Math.round(sumFollower / this.aggregateData.length)
      this.totalPoint = this.eventHistory[this.eventHistory.length - 1].point
    },
    createChart() {
      let nowDate = new Date()
      let today = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate(),
        0,
        0,
        0
      )
      let todayUnixTime = Math.floor(today.getTime() / 1000)
      let todayEndUnixTime = todayUnixTime + 86399

      // 今日分だけ取得
      let todayData = []

      this.eventHistory.forEach((user, index) => {
        if (todayUnixTime <= user.get_at && user.get_at <= todayEndUnixTime) {
          todayData.push(user)
        }
      })
      if (todayData.length == 0) {
        this.todayFlg = false
      }

      // グラフの色
      let color = { r: 0, g: 0, b: 0 }
      for (let c in color) {
        color[c] = Math.floor(Math.random() * 256)
      }

      // 今日のチャート
      this.todayChart(this.userData.room_name, todayData, color, 0)
      // 日別のチャート
      this.dayChart(this.userData.room_name, this.eventHistory, color, 0)
      // 全期間のチャート
      this.allChart(this.userData.room_name, this.eventHistory, color, 0)
    },
    todayChart(room_name, todayData, color, index) {
      // 本日分ポイントグラフ作成
      this.todayPointData.datasets.push({
        tension: 0,
        label: room_name,
        data: todayData.map((e) => e.point),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 本日分フォロワーグラフ作成
      this.todayFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: todayData.map((e) => e.follower_num),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 本日分順位グラフ作成
      this.todayRankData.datasets.push({
        tension: 0,
        label: room_name,
        data: todayData.map((e) => e.rank),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // ラベル作成
      if (index === 0) {
        // 本日分ラベル設定
        todayData.forEach((v) => {
          this.todayPointData.labels.push(this.formatDateTime(v.get_at))
          this.todayFollowerData.labels.push(this.formatDateTime(v.get_at))
          this.todayRankData.labels.push(this.formatDateTime(v.get_at))
        })
      }
    },
    dayChart(room_name, userData, color, index) {
      let dayPoint = userData[0].point
      let dayFollower = userData[0].follower_num
      let dayRank = userData[0].rank
      let dayLabel = this.formatMdDate(userData[0].get_at)

      let dayFlg = this.formatDay(userData[0].get_at)

      let dayPointList = []
      let dayFollowerList = []
      let dayRankList = []

      let dayLabelList = []

      userData.map((v, idx) => {
        if (dayFlg != this.formatDay(v.get_at)) {
          dayPointList.push(dayPoint)
          dayFollowerList.push(dayFollower)
          dayRankList.push(dayRank)
          dayLabelList.push(dayLabel)

          dayFlg = this.formatDay(v.get_at)
        }

        dayPoint = v.point
        dayFollower = v.follower_num
        dayRank = v.rank
        dayLabel = this.formatMdDate(v.get_at)

        if (userData.length - 1 == idx) {
          dayPointList.push(dayPoint)
          dayFollowerList.push(dayFollower)
          dayRankList.push(dayRank)
          dayLabelList.push(dayLabel)
        }
      })

      this.todayPointList = dayPointList

      // 日別ポイントグラフ作成
      this.dayPointData.datasets.push({
        tension: 0,
        label: room_name,
        data: dayPointList,
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 日別フォロワーグラフ作成
      this.dayFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: dayFollowerList,
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 日別順位グラフ作成
      this.dayRankData.datasets.push({
        tension: 0,
        label: room_name,
        data: dayRankList,
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // ラベル作成
      if (index === 0) {
        // 日別ラベル設定
        dayLabelList.map((e) => {
          this.dayPointData.labels.push(e)
          this.dayFollowerData.labels.push(e)
          this.dayRankData.labels.push(e)
        })
      }
    },
    allChart(room_name, userData, color, index) {
      // 全期間ポイントグラフ作成
      this.allPointData.datasets.push({
        tension: 0,
        label: room_name,
        data: userData.map((e) => e.point),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 全期間フォロワー作成
      this.allFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: userData.map((e) => e.follower_num),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0.5)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 全期間順位グラフ作成
      this.allRankData.datasets.push({
        tension: 0,
        label: room_name,
        data: userData.map((e) => e.rank),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // ラベル作成
      if (index === 0) {
        // 全期間ポイントラベル設定
        userData.forEach((v) => {
          this.allPointData.labels.push(this.formatDate(v.get_at))
          this.allFollowerData.labels.push(this.formatDate(v.get_at))
          this.allRankData.labels.push(this.formatDate(v.get_at))
        })
      }
    },
    formatDate(inputDate) {
      return moment.unix(inputDate).format('MM/DD HH:mm')
    },
    formatYmdDate(inputDate) {
      return moment.unix(inputDate).format('YYYY/MM/DD HH:mm')
    },
    formatYmdhm(inputDate) {
      return moment.unix(inputDate).format('YYYY/MM/DD')
    },
    formatMdDate(inputDate) {
      return moment.unix(inputDate).format('MM/DD')
    },
    formatDateTime(inputDate) {
      return moment.unix(inputDate).format('HH時')
    },
    formatDay(inputDate) {
      return moment.unix(inputDate).format('DD')
    },
  },
}
</script>
