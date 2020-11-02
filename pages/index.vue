<template>
  <v-main v-bind:style="styles">
    <v-container class="nonecss" id="userData">
      <div class="py-6"></div>
      <v-row justify="center" align="center">
        <v-btn outlined color="indigo" @click="getRoomData()" :disabled="btn">
          自分のルームへ接続
        </v-btn>
      </v-row>
      <div class="py-6"></div>
      <v-row justify="center" align="center">
        <v-btn outlined color="indigo" @click="getRoomRandom()" :disabled="btn">
          【テスト用】ON LIVE1位の部屋に接続
        </v-btn>
      </v-row>
      <div class="py-6"></div>
      <v-row v-if="loading" justify="center" align="center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="green"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      rules: [
        (value) => !!value || '入力してください',
        (value) => (value && value.length >= 5) || '5文字以上入力してください',
      ],
      roomData: '',
      roomId: '',
      socket: null,
      btn: false,
      commentCnt: 0,
      styles: {
        backgroundColor: '#FFFFFF',
        fontSize: '5em',
      },
      checkbox: false,
      speech: false,
      loading: false,
    }
  },
  head() {
    return {
      title: 'ホーム',
    }
  },
  // 離脱時
  beforeRouteLeave(to, from, next) {
    this.socket.close()
    this.$nuxt.$emit('openMenu', true)
    next()
  },
  mounted() {
    // 接続
    this.socket = new WebSocket('wss://online.showroom-live.com')
    // 接続確認
    this.socket.onopen = (e) => {
      console.log('コネクションを開始しました')
    }
    // エラー発生時
    this.socket.onerror = (error) => {
      alert('エラーが発生しました\nページをリロードしてください')
    }
    // メッセージ受信
    this.socket.onmessage = (data) => {
      // 死活監視
      if (data.data === 'ACK	showroom') {
        console.log('死活監視OK')
        return
      }
      // JSON変換
      let getMessage = JSON.parse(
        data.data.replace('MSG	' + this.roomData.bcsvr_key + '	', '')
      )
      // コメント
      if (getMessage.cm != undefined) {
        // カウント
        if (Number.isFinite(Number(getMessage.cm)) && getMessage.cm <= 50) {
          this.getCount(getMessage)
        } else {
          this.getComment(getMessage)
        }
      }
    }
    // 疎通確認
    setInterval(() => {
      if (this.roomData != '') {
        this.socket.send('PING	showroom')
      }
    }, 60000)
  },
  methods: {
    getRoomData() {
      if (this.$store.state.roomid === null) {
        console.log('ID無し')
        this.$router.push('/roomid')
      }
      this.btn = true
      this.loading = true
      // キー取得
      axios
        .get(
          'https://niconico-showroom-api.herokuapp.com/apis/live_info/' +
            this.$store.state.roomid
        )
        .then((response) => {
          if (response.data.room_name === undefined) {
            console.log('ページが存在しません')
            this.roomData = 'ページが存在しません'
            this.btn = false
            this.loading = false
            return
          }
          // console.log(response.data)
          this.roomData = response.data
          if (response.data.bcsvr_key != '') {
            this.setting()
            this.connectSocket()
          } else {
            alert('配信停止中です')
            this.roomData = '配信停止中です'
            this.btn = false
            this.loading = false
          }
        })
    },
    setting() {
      this.$nuxt.$emit('closeMenu', false)
      console.log('==setting==')
      console.log(this.$store.state.backgroundcolor)
      this.styles.backgroundColor = this.$store.state.backgroundcolor
      if (this.$store.state.fontsize != null) {
        this.styles.fontSize = this.$store.state.fontsize + 'em'
      }
      console.log(
        'フォントサイズ' +
          (this.$store.state.fontsize === null
            ? this.styles.fontSize
            : this.$store.state.fontsize)
      )
      this.speech = this.$store.state.voice
      console.log('読み上げ' + (this.speech ? 'する' : 'しない'))
      console.log('==setting==')
    },
    connectSocket() {
      console.log('接続開始')
      this.socket.send('SUB	' + this.roomData.bcsvr_key)
      document.getElementById('userData').style.display = 'none'
    },
    async getComment(data) {
      let niconicoText = document.createElement('div')
      niconicoText.className = 'niconico'
      // ID
      niconicoText.id = 'comment' + this.commentCnt
      this.commentCnt++

      niconicoText.style.left = document.documentElement.clientWidth + 'px'
      let random = Math.round(
        Math.random() * document.documentElement.clientHeight
      )
      // console.log(random + ':' + data.cm)
      // 見えなくなるから再度ランダム
      if (
        random > document.documentElement.clientHeight - 100 ||
        random <= 20
      ) {
        random = Math.round(
          Math.random() * document.documentElement.clientHeight
        )
      }
      niconicoText.style.top = random + 'px'
      niconicoText.appendChild(document.createTextNode(data.cm))
      document.getElementsByTagName('main')[0].appendChild(niconicoText)

      if (this.speech) {
        if (!/(.)\1+/.test(data.cm))
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.cm))
      }

      await gsap.to('#' + niconicoText.id, {
        duration: 15,
        x:
          -1 *
          (document.documentElement.clientWidth + niconicoText.clientWidth),
      })

      niconicoText.parentNode.removeChild(niconicoText)
    },
    getCount(data) {
      console.log('count')
    },
    getRoomRandom() {
      this.btn = true
      this.loading = true
      // キー取得
      axios
        .get('https://niconico-showroom-api.herokuapp.com/apis/onlive')
        .then((response) => {
          // console.log(response.data)
          if (response.data === undefined) {
            console.log('ページが存在しません')
            this.roomData = 'ページが存在しません'
            this.btn = false
            this.loading = false
            return
          }
          this.roomData = response.data
          if (response.data != '') {
            this.setting()
            this.connectSocket()
          } else {
            this.roomData = '配信停止中です'
            this.btn = false
            this.loading = false
          }
        })
    },
  },
}
</script>

<style scoped>
::v-deep .niconico {
  color: white;
  position: fixed;
  white-space: nowrap;
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
}

.nonecss {
  font-size: initial;
}
</style>