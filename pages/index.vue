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
          【テスト用】適当な部屋に接続
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
      <v-row justify="center">
        <v-dialog v-model="commentDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="cyan" dark>
              <v-btn icon>
                <v-icon>mdi-comment-processing-outline</v-icon>
              </v-btn>
              <v-toolbar-title>【実験機能】コメントログ</v-toolbar-title>
            </v-toolbar>
            <v-list three-line>
              <v-subheader
                >実験機能なので開くと不具合発生する可能性有り</v-subheader
              >
              <template v-for="(comment, index) in comments">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="comment.name + '' + index"
                  :id="comment.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        comment.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="comment.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="comment.comment"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
        <v-dialog v-model="freeGiftDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="green" dark>
              <v-btn icon>
                <v-icon>mdi-gift-outline</v-icon>
              </v-btn>
              <v-toolbar-title>【実験機能】ギフトログ（無料）</v-toolbar-title>
            </v-toolbar>

            <v-list three-line>
              <v-subheader
                >実験機能なので開くと不具合発生する可能性有り</v-subheader
              >
              <template v-for="(freeGift, index) in freeGifts">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="freeGift.name + '' + index"
                  :id="freeGift.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        freeGift.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="freeGift.name"
                    ></v-list-item-title>
                    <v-img
                      max-height="50"
                      max-width="50"
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                        freeGift.giftimg +
                        '_s.png'
                      "
                    ></v-img>
                    × {{ freeGift.count }}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
        <v-dialog v-model="preGiftDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="green" dark>
              <v-btn icon>
                <v-icon>mdi-gift-outline</v-icon>
              </v-btn>
              <v-toolbar-title>【実験機能】ギフトログ（有料）</v-toolbar-title>
            </v-toolbar>

            <v-list three-line>
              <v-subheader
                >実験機能なので開くと不具合発生する可能性有り</v-subheader
              >
              <template v-for="(preGift, index) in preGifts">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="preGift.name + '' + index"
                  :id="preGift.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        preGift.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="preGift.name"
                    ></v-list-item-title>
                    <v-img
                      max-height="50"
                      max-width="50"
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                        preGift.giftimg +
                        '_s.png'
                      "
                    ></v-img>
                    × {{ preGift.count }}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
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
      target: 0,
      commentDialog: false,
      freeGiftDialog: false,
      preGiftDialog: false,
      comments: [],
      freeGifts: [],
      preGifts: [],
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
  created() {
    this.setListener()
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
          this.commentLog(getMessage)
          this.getComment(getMessage)
        }
      }
      // ギフト
      if (getMessage.g != undefined) {
        this.giftLog(getMessage)
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
    setListener() {
      this.$nuxt.$on('commentModalOpen', this.commentModalOpen)
      this.$nuxt.$on('freeGiftModalOpen', this.freeGiftModalOpen)
      this.$nuxt.$on('preGiftModalOpen', this.preGiftModalOpen)
    },
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
    commentLog(data) {
      this.comments.push({ avatar: data.av, name: data.ac, comment: data.cm })
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
      // 見えなくなるから再度ランダム
      while (
        random > document.documentElement.clientHeight - 100 ||
        random <= 20 ||
        (this.target - 100 <= random && this.target + 100 >= random)
      ) {
        random = Math.round(
          Math.random() * document.documentElement.clientHeight
        )
      }
      this.target = random
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
          console.log(response.data.room_name)
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
    commentModalOpen() {
      this.commentDialog = true
    },
    freeGiftModalOpen() {
      this.freeGiftDialog = true
    },
    preGiftModalOpen() {
      this.preGiftDialog = true
    },
    giftLog(data) {
      // TODO:要修正
      // 有料
      if (data.gt === 1) {
        let flg = this.preGifts.some((value) => {
          // ユーザを特定
          if (value.userid === data.u && value.giftimg === data.g) {
            // ギフト数加算
            value.count = Number(value.count) + Number(data.n)
            return true
          }
        })
        // 新規
        if (!flg) {
          this.preGifts.push({
            avatar: data.av,
            userid: data.u,
            name: data.ac,
            count: data.n,
            giftimg: data.g,
          })
        }
      } else {
        // 扱いが難しい虹星
        if (data.g === 1601) {
          // 無料
          let nijiflg = this.freeGifts.some((value) => {
            // ユーザを特定
            if (value.userid === data.u && value.giftimg === data.g) {
              // ギフト数加算
              value.count = Number(value.count) + Number(data.n)
              return true
            }
          })
          // 新規
          if (!nijiflg) {
            this.freeGifts.push({
              avatar: data.av,
              userid: data.u,
              name: data.ac,
              count: data.n,
              giftimg: data.g,
            })
          }
        } else {
          // 無料
          let flg = this.freeGifts.some((value) => {
            // ユーザを特定
            if (value.userid === data.u) {
              // ギフト数加算
              value.count = Number(value.count) + Number(data.n)
              // ギフトアイコン更新
              value.giftimg = data.g
              return true
            }
          })
          // 新規
          if (!flg) {
            this.freeGifts.push({
              avatar: data.av,
              userid: data.u,
              name: data.ac,
              count: data.n,
              giftimg: data.g,
            })
          }
        }
      }
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