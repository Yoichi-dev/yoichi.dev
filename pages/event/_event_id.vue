<template>
  <div>
    <v-row class="mt-5 px-3" justify="center">
      <v-alert outlined type="warning" prominent border="left">
        イベント中、途中参加・辞退した人が発生した場合グラフ表示が崩れるバグが発生する事があります。<br />（現在修正中…）
      </v-alert>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="eventData[0].image"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-simple-table>
          <template>
            <tbody>
              <tr>
                <td>イベント名</td>
                <td>
                  <a :href="eventData[0].event_url" target="_blank">{{
                    eventData[0].event_name
                  }}</a>
                </td>
              </tr>
              <tr>
                <td>イベントID</td>
                <td>{{ eventData[0].event_id }}</td>
              </tr>
              <tr>
                <td>開始日</td>
                <td>{{ formatYmdDate(eventData[0].started_at) }}</td>
              </tr>
              <tr>
                <td>終了日</td>
                <td>{{ formatYmdDate(eventData[0].ended_at) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">イベント内平均ポイント</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ avgPoint.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') }}pt
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="green">
              mdi-file-powerpoint-box-outline
            </v-icon>
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
            <v-icon size="80" color="green">mdi-account-multiple-plus</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">イベント期間</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ period.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') }}日間
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="green">mdi-calendar-month</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" lg="4" xl="3">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">参加人数</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ entry.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') }}人
              </v-list-item-title>
            </v-list-item-content>
            <v-icon size="80" color="green">mdi-account-group</v-icon>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-5">
      <v-expansion-panels mandatory="true" id="list" popout>
        <v-expansion-panel>
          <v-expansion-panel-header>参加者リスト</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="user in userList" :key="user.room_id">
                    <td>{{ user.room_name }}</td>
                    <td>
                      <v-btn
                        class="ma-2"
                        outlined
                        color="green"
                        :to="user.event_id + '/' + user.room_id"
                      >
                        個別分析
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <!-- <v-row justify="center" class="my-10 px-5">
      <v-select :items="selectItems" label="表示件数" outlined></v-select>
    </v-row> -->
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
    let eventData = null
    await axios
      .get(env.API_URL + '/api/events/' + params.event_id)
      .then((response) => {
        eventData = response.data
      })

    let userList = null
    await axios
      .get(env.API_URL + '/api/events/' + params.event_id + '/users')
      .then((response) => {
        userList = response.data
      })

    let eventHistory = null
    await axios
      .get(env.API_URL + '/api/histories/' + params.event_id)
      .then((response) => {
        eventHistory = response.data
      })

    let aggregateData = null
    await axios
      .get(env.API_URL + '/api/histories/aggregate/' + params.event_id)
      .then((response) => {
        aggregateData = response.data
      })

    return { eventData, userList, eventHistory, aggregateData }
  },
  data() {
    return {
      avgPoint: 0,
      avgFollower: 0,
      period: 0,
      entry: 0,
      todayFlg: true,
      selectItems: ['全体', '上位', '下位'],
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
                userCallback: (value, index, values) =>
                  value.toLocaleString() + 'pt',
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
                userCallback: (value, index, values) =>
                  value.toLocaleString() + '人',
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
      title: this.eventData[0].event_name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            this.eventData[0].event_name +
            'のポイント集計履歴を確認する事ができます',
        },
        {
          hid: 'twitter:creator',
          property: 'twitter:creator',
          content: '@yoichiro_sub',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.eventData[0].event_name + '| Point History',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.eventData[0].event_name +
            'のポイント集計履歴を確認する事ができます',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.eventData[0].image,
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    }
  },
  mounted() {
    this.chartWidth = document.getElementById('list').clientWidth
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
      if (this.entry <= 10) {
        // 10人以下
        this.chartStyle = {
          height: '80vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else if (this.entry > 10 && this.entry <= 15) {
        // 15人以下
        this.chartStyle = {
          height: '100vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else if (this.entry > 15 && this.entry <= 25) {
        // 25人以下
        this.chartStyle = {
          height: '160vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else {
        // 25人以上
        this.chartStyle = {
          height: '200vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      }
    }
    // iPad（タブレット）
    if (this.$vuetify.breakpoint.name == 'sm') {
      if (this.entry <= 15) {
        // 15人以下
        this.chartStyle = {
          height: '80vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else if (this.entry > 15 && this.entry <= 25) {
        // 25人以下
        this.chartStyle = {
          height: '100vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else {
        // 25人以上
        this.chartStyle = {
          height: '150vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      }
    }
    // iPad Pro（タブレット大）
    if (this.$vuetify.breakpoint.name == 'md') {
      if (this.entry <= 25) {
        // 25人以下
        this.chartStyle = {
          height: '80vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else {
        // 25人以上
        this.chartStyle = {
          height: '100vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      }
    }
    // PC
    if (this.$vuetify.breakpoint.name == 'lg') {
      if (this.entry <= 25) {
        // 25人以下
        this.chartStyle = {
          height: '75vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else {
        // 25人以上
        this.chartStyle = {
          height: '100vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      }
    }
    // PC FullHD
    if (this.$vuetify.breakpoint.name == 'xl') {
      if (this.entry <= 25) {
        // 25人以下
        this.chartStyle = {
          height: '80vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
      } else {
        // 25人以上
        this.chartStyle = {
          height: '100vh',
          width: `${this.chartWidth}px`,
          position: 'relative',
        }
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
      // イベント期間
      let startDate = new Date(this.eventData[0].started_at * 1000)
      let endDate = new Date(this.eventData[0].ended_at * 1000)

      this.avgPoint = Math.round(sumPoint / this.aggregateData.length)
      this.avgFollower = Math.round(sumFollower / this.aggregateData.length)
      this.entry = this.aggregateData.length
      this.period = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
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

      this.userList.forEach((user, index) => {
        // ユーザ情報
        let userData = this.eventHistory.filter(
          (val) => val.room_id == user.room_id
        )
        // 今日分だけ取得
        let todayData = userData.filter(
          (e) => todayUnixTime <= e.get_at && e.get_at <= todayEndUnixTime
        )
        if (todayData.length == 0) {
          this.todayFlg = false
        }

        // グラフの色
        let color = { r: 0, g: 0, b: 0 }
        for (let c in color) {
          color[c] = Math.floor(Math.random() * 256)
        }

        // 今日のチャート
        this.todayChart(user.room_name, todayData, color, index)
        // 日別のチャート
        this.dayChart(user.room_name, userData, color, index)
        // 全期間のチャート
        this.allChart(user.room_name, userData, color, index)
      })
    },
    todayChart(room_name, todayData, color, index) {
      // 本日分ポイントグラフ作成
      this.todayPointData.datasets.push({
        tension: 0,
        label: room_name,
        data: todayData.map((e) => e.point),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 本日分フォロワーグラフ作成
      this.todayFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: todayData.map((e) => e.follower_num),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
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

      // 日別ポイントグラフ作成
      this.dayPointData.datasets.push({
        tension: 0,
        label: room_name,
        data: dayPointList,
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 日別フォロワーグラフ作成
      this.dayFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: dayFollowerList,
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
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
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
        borderColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1)',
      })

      // 全期間フォロワー作成
      this.allFollowerData.datasets.push({
        tension: 0,
        label: room_name,
        data: userData.map((e) => e.follower_num),
        backgroundColor:
          'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 0)',
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
