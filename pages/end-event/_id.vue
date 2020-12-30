<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">全期間ポイント集計</p>
              <v-card-subtitle>※集計開始時からの</v-card-subtitle>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="allPointChartdata"
              :options="pointOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">全期間フォロワー遷移</p>
              <v-card-subtitle>※集計開始時からの</v-card-subtitle>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="allFollowerChartdata"
              :options="followerOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">全期間順位遷移</p>
              <v-card-subtitle>※集計開始時からの</v-card-subtitle>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="allRankChartdata"
              :options="rankOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">日別ポイント集計</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="dayPointChartdata"
              :options="pointOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">日別フォロワー遷移</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="dayFollowerChartdata"
              :options="followerOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">日別順位遷移</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="dayRankChartdata"
              :options="rankOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">本日の時間別ポイント集計</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="pointChartdata"
              :options="pointOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">本日の時間別フォロワー遷移</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="followerChartdata"
              :options="followerOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <p class="display-1 text--primary">本日の時間別順位遷移</p>
            </v-card-text>
            <Chart
              v-if="loaded"
              :chartdata="rankChartdata"
              :options="rankOptions"
              :height="height"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
      .get(env.SHOWROOM_EVENT_ANALYZE_API_UEL + params.id + '.json')
      .then((response) => {
        eventData = response.data
      })
    return { eventData }
  },
  data() {
    return {
      loaded: false,
      height: 400,
      pointChartdata: {
        labels: [],
        datasets: [],
      },
      followerChartdata: {
        labels: [],
        datasets: [],
      },
      rankChartdata: {
        labels: [],
        datasets: [],
      },
      dayPointChartdata: {
        labels: [],
        datasets: [],
      },
      dayFollowerChartdata: {
        labels: [],
        datasets: [],
      },
      dayRankChartdata: {
        labels: [],
        datasets: [],
      },
      allPointChartdata: {
        labels: [],
        datasets: [],
      },
      allFollowerChartdata: {
        labels: [],
        datasets: [],
      },
      allRankChartdata: {
        labels: [],
        datasets: [],
      },
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
                userCallback: (value, index, values) =>
                  value.toLocaleString() + '位',
                stepSize: 1,
                reverse: true,
              },
            },
          ],
        },
      },
    }
  },
  head() {
    return {
      title: this.eventData.event_name,
    }
  },
  mounted() {
    this.unixTime = Math.floor(new Date().getTime() / 1000)
    this.hourChart()
    this.dayChart()
    this.allChart()
    if (this.eventData.data.length > 10) {
      if (window.parent.screen.width < 600) {
        this.height = 800
      } else {
        this.height = 600
      }
    }
  },
  methods: {
    hourChart() {
      this.loaded = true
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
      let yestadayUnixTime = todayUnixTime + 86399

      for (let i in this.eventData.data) {
        let hoursPoint = []
        let hoursFollower = []
        let hoursRank = []

        for (let j in this.eventData.data[i].point) {
          // 時間別
          if (
            todayUnixTime <= this.eventData.data[i].point[j].create_at &&
            this.eventData.data[i].point[j].create_at <= yestadayUnixTime
          ) {
            if (i == 1) {
              this.pointChartdata.labels.push(
                moment
                  .unix(this.eventData.data[i].point[j].create_at)
                  .format('YYYY/MM/DD HH:mm')
              )
              this.followerChartdata.labels.push(
                moment
                  .unix(this.eventData.data[i].point[j].create_at)
                  .format('YYYY/MM/DD HH:mm')
              )
              this.rankChartdata.labels.push(
                moment
                  .unix(this.eventData.data[i].point[j].create_at)
                  .format('YYYY/MM/DD HH:mm')
              )
            }
            hoursPoint.push(this.eventData.data[i].point[j].point)
            hoursFollower.push(this.eventData.data[i].point[j].follower_num)
            hoursRank.push(this.eventData.data[i].point[j].rank)
          }
        }

        let color = { r: 0, g: 0, b: 0 }
        for (let c in color) {
          color[c] = Math.floor(Math.random() * 256)
        }

        // 時間別
        this.pointChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursPoint,
        })

        this.followerChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursFollower,
        })

        this.rankChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursRank,
        })
      }
    },
    dayChart() {
      let check = ''

      // 無理やり（リファクタリングすること）
      for (let i in this.eventData.data) {
        let testLabel = []
        let testData = []
        let testData2 = []
        let testData3 = []

        let arrayLength = this.eventData.data[i].point.length
        for (let j in this.eventData.data[i].point) {
          let val = moment
            .unix(this.eventData.data[i].point[j].create_at)
            .format('YYYY/MM/DD')

          if (j == 0) {
            check = val
            if (j == arrayLength - 1) {
              // 最後
              testLabel.push(
                moment
                  .unix(this.eventData.data[i].point[j].create_at)
                  .format('YYYY/MM/DD')
              )
              testData.push(this.eventData.data[i].point[j].point)
              testData2.push(this.eventData.data[i].point[j].follower_num)
              testData3.push(this.eventData.data[i].point[j].rank)
            }
          } else {
            if (check != val) {
              testLabel.push(
                moment
                  .unix(this.eventData.data[i].point[Number(j) - 1].create_at)
                  .format('YYYY/MM/DD')
              )
              testData.push(this.eventData.data[i].point[Number(j) - 1].point)
              testData2.push(
                this.eventData.data[i].point[Number(j) - 1].follower_num
              )
              testData3.push(this.eventData.data[i].point[Number(j) - 1].rank)
              check = val
            }
            if (j == arrayLength - 1) {
              // 最後
              testLabel.push(
                moment
                  .unix(this.eventData.data[i].point[j].create_at)
                  .format('YYYY/MM/DD')
              )
              testData.push(this.eventData.data[i].point[j].point)
              testData2.push(this.eventData.data[i].point[j].follower_num)
              testData3.push(this.eventData.data[i].point[j].rank)
            }
          }
        }

        let color = { r: 0, g: 0, b: 0 }
        for (let c in color) {
          color[c] = Math.floor(Math.random() * 256)
        }
        if (i == 0) {
          this.dayPointChartdata.labels = testLabel
          this.dayFollowerChartdata.labels = testLabel
          this.dayRankChartdata.labels = testLabel
        }
        this.dayPointChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: testData,
        })
        this.dayFollowerChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: testData2,
        })
        this.dayRankChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: testData3,
        })
      }
    },
    allChart() {
      // 時間毎のコピペ要修正
      for (let i in this.eventData.data) {
        let hoursPoint = []
        let hoursFollower = []
        let hoursRank = []

        for (let j in this.eventData.data[i].point) {
          if (i == 1) {
            this.allPointChartdata.labels.push(
              moment
                .unix(this.eventData.data[i].point[j].create_at)
                .format('YYYY/MM/DD HH:mm')
            )
            this.allFollowerChartdata.labels.push(
              moment
                .unix(this.eventData.data[i].point[j].create_at)
                .format('YYYY/MM/DD HH:mm')
            )
            this.allRankChartdata.labels.push(
              moment
                .unix(this.eventData.data[i].point[j].create_at)
                .format('YYYY/MM/DD HH:mm')
            )
          }
          hoursPoint.push(this.eventData.data[i].point[j].point)
          hoursFollower.push(this.eventData.data[i].point[j].follower_num)
          hoursRank.push(this.eventData.data[i].point[j].rank)
        }

        let color = { r: 0, g: 0, b: 0 }
        for (let c in color) {
          color[c] = Math.floor(Math.random() * 256)
        }

        this.allPointChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursPoint,
        })

        this.allFollowerChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursFollower,
        })

        this.allRankChartdata.datasets.push({
          label: this.eventData.data[i].room_name,
          backgroundColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',0.01)',
          borderColor:
            'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ',1)',
          lineTension: 0,
          data: hoursRank,
        })
      }
    },
  },
}
</script>
