<template>
  <div class="container">
    <div class="row">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-6">配信日記</h1>
        <p class="lead">配信内容の記録を保存することができます</p>
      </div>
    </div>
    <div class="row col-12 col-md-10 col-lg-6 mx-auto">
      <div class="mx-auto" id="loading" v-if="loadingRoom">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        読み込み中...
      </div>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="roomId"
          placeholder="https://www.showroom-live.com/room/profile?room_id="
          aria-label="RoomId"
          aria-describedby="room-id"
        />
        <button
          class="btn btn-outline-secondary"
          @click="check(roomId)"
          :disabled="btnDisabled"
          type="button"
          id="room-id"
        >
          登録
        </button>
      </div>
      <small
        ><a
          href="https://www.showroom-live.com/room/profile?room_id=317313"
          target="_blank"
          rel="noopener"
          >例：ルームIDとは？</a
        ></small
      >
    </div>
    <div class="mt-5 row col-12 col-md-10 col-lg-6 mx-auto">
      <p class="h5">登録中のルーム</p>
      <div class="mx-auto" id="loading" v-if="loadingKey">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        読み込み中...
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">ルーム名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="getStreamKey()"
                v-if="streamBtnDisabled && this.roomData"
              >
                接続
              </button>
              <button
                class="btn btn-outline-danger"
                type="button"
                @click="end()"
                v-if="!streamBtnDisabled"
              >
                配信終了
              </button>
            </td>
            <td>{{ roomData.room_id }}</td>
            <td>{{ roomData.room_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-5 row col-12 col-md-10 col-lg-6 mx-auto" v-if="history">
      <p class="h5">履歴一覧</p>
      <a
        @click="$router.push('/history')"
        rel="noopener"
        class="btn btn-outline-primary col-12 col-md-10 col-lg-6 mx-auto"
        >一覧を見る</a
      >
    </div>
    <div class="mt-5 row col-12 col-md-10 col-lg-6 mx-auto">
      コメント件数： {{ commentList.length }}件<br />
      <!-- カウント人数： {{ countList.length }}人<br /> -->
      フリーギフト人数：{{ freeGiftList.length }}人<br />
      有料ギフト人数：{{ preGiftList.length }}人<br />
      <button
        v-if="!streamBtnDisabled"
        class="btn btn-outline-danger"
        type="button"
        disabled
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        記録中……
      </button>
    </div>
    <div class="mt-5 row col-12 col-md-10 col-lg-6 mx-auto" v-if="tabShow">
      <button type="button" class="btn btn-outline-primary" @click="save()">
        この内容を保存する
      </button>
    </div>
    <div class="mt-5 mb-5 row col-12 mx-auto" v-if="tabShow">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            class="nav-link active"
            id="nav-comment-tab"
            data-bs-toggle="tab"
            href="#nav-comment"
            role="tab"
            aria-controls="nav-comment"
            aria-selected="true"
            >コメント</a
          >
          <!-- <a
            class="nav-link"
            id="nav-count-tab"
            data-bs-toggle="tab"
            href="#nav-count"
            role="tab"
            aria-controls="nav-count"
            aria-selected="false"
            >カウント</a
          > -->
          <a
            class="nav-link"
            id="nav-free-gift-tab"
            data-bs-toggle="tab"
            href="#nav-free-gift"
            role="tab"
            aria-controls="nav-free-gift"
            aria-selected="false"
            >フリーギフト</a
          >
          <a
            class="nav-link"
            id="nav-pre-gift-tab"
            data-bs-toggle="tab"
            href="#nav-pre-gift"
            role="tab"
            aria-controls="nav-pre-gift"
            aria-selected="false"
            >有料ギフト</a
          >
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-comment"
          role="tabpanel"
          aria-labelledby="nav-comment-tab"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">コメント</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(comment, i) in commentList" :key="i">
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      comment.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      comment.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />{{ comment.user_name }}
                </td>
                <td>{{ comment.comment }}</td>
                <td>{{ formatDate(comment.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- <div
          class="tab-pane fade"
          id="nav-count"
          role="tabpanel"
          aria-labelledby="nav-count-tab"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">カウント</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(count, i) in countList" :key="i">
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      count.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      count.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />{{ count.user_name }}
                </td>
                <td>{{ count.comment }}</td>
                <td>{{ formatDate(count.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div> -->
        <div
          class="tab-pane fade"
          id="nav-free-gift"
          role="tabpanel"
          aria-labelledby="nav-free-gift-tab"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">ギフト</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(freeGift, i) in freeGiftList" :key="i">
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      freeGift.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      freeGift.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  {{ freeGift.user_name }}
                </td>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                      freeGift.gift_img +
                      '_s.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  × {{ freeGift.count }}個
                </td>
                <td>{{ formatDate(freeGift.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div
          class="tab-pane fade"
          id="nav-pre-gift"
          role="tabpanel"
          aria-labelledby="nav-pre-gift-tab"
        >
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ユーザ名</th>
                <th scope="col">ギフト</th>
                <th scope="col">日時</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(preGift, i) in preGiftList" :key="i">
                <th scope="row">
                  <a
                    target="_blank"
                    class="btn btn-outline-secondary"
                    rel="nofollow"
                    :href="
                      'https://www.showroom-live.com/social/twitter/redirect_to_twitter?user_id=' +
                      preGift.user_id
                    "
                    >SNS</a
                  >
                </th>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                      preGift.avatar +
                      '.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  {{ preGift.user_name }}
                </td>
                <td>
                  <img
                    style="max-width: 50px; max-height: 50px"
                    :src="
                      'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                      preGift.gift_img +
                      '_s.png'
                    "
                    class="card-img-top"
                    alt=""
                  />
                  × {{ preGift.count }}個
                </td>
                <td>{{ formatDate(preGift.create * 1000) }}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="my-5"></div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      socket: null,
      roomId: '',
      btnDisabled: false,
      streamBtnDisabled: true,
      roomData: '',
      loadingRoom: false,
      loadingKey: false,
      start: null,
      commentList: [],
      countList: [],
      freeGiftList: [],
      preGiftList: [],
      tabShow: false,
      history: false,
    }
  },
  // 離脱時
  beforeRouteLeave(to, from, next) {
    if (this.socket != null) {
      this.socket.close()
    }
    next()
  },
  mounted() {
    setTimeout(() => {
      // this.$store.commit('reset', true)
      if (this.$store.state.roomid != null) {
        this.roomId = this.$store.state.roomid
        this.check(this.roomId)
      }
      if (this.$store.state.history.length != 0) {
        this.history = true
      }
    }, 0)
  },
  computed: {
    formatDate: () => (inputDate) => {
      return moment(inputDate).format('YYYY/MM/DD HH:mm')
    },
  },
  methods: {
    check(inputRoomId) {
      this.loadingRoom = true
      if (inputRoomId === '' || inputRoomId.length < 5) {
        console.log('validation error')
        this.loadingRoom = false
        return
      }
      let replaceRoomId = String(inputRoomId).replace(
        'https://www.showroom-live.com/room/profile?room_id=',
        ''
      )
      this.btnDisabled = true

      axios
        .get(
          'https://niconico-showroom-api.herokuapp.com/apis/live_info/' +
            replaceRoomId
        )
        .then((response) => {
          if (response.data.room_name === undefined) {
            alert('ページが存在しません')
          } else {
            this.roomData = response.data
            this.roomId = replaceRoomId
            this.$store.commit('setRoomid', replaceRoomId)
          }
        })
        .catch((err) => {
          alert('ページが存在しません')
        })
        .finally(() => {
          this.btnDisabled = false
          this.loadingRoom = false
        })
    },
    addComments(data) {
      let comment = {
        start: this.start,
        user_id: data.u,
        user_name: data.ac,
        comment: data.cm,
        avatar: data.av,
        flg: data.ua,
        create: data.created_at,
        at: data.at,
        d: data.d,
        t: data.t,
      }
      this.commentList.push(comment)
      this.$store.commit('setComment', JSON.stringify(this.commentList))
    },
    async addCount(data) {
      let flg = true
      let countData = {
        start: this.start,
        user_id: data.u,
        user_name: data.ac,
        comment: data.cm,
        avatar: data.av,
        flg: data.ua,
        create: data.created_at,
        at: data.at,
        d: data.d,
        t: data.t,
      }
      for (let i = 0; i < this.countList.length; i++) {
        if (this.countList[i].user_id === countData.user_id) {
          this.countList[i].comment = countData.comment
          flg = false
        }
      }
      if (flg) {
        this.countList.push(countData)
      }
      await this.$store.commit('setCount', JSON.stringify(this.countList))
    },
    async addFreeGifts(data) {
      let flg = true
      let freeGiftData = {
        start: this.start,
        user_id: data.u,
        user_name: data.ac,
        avatar: data.av,
        count: data.n,
        gift_img: data.g,
        flg: data.ua,
        create: data.created_at,
        at: data.at,
        d: data.d,
        gt: data.gt,
        h: data.h,
        t: data.t,
      }

      for (let i = 0; i < this.freeGiftList.length; i++) {
        if (this.freeGiftList[i].user_id === freeGiftData.user_id) {
          this.freeGiftList[i].count += freeGiftData.count
          this.freeGiftList[i].gift_img = freeGiftData.gift_img
          flg = false
        }
      }
      if (flg) {
        this.freeGiftList.push(freeGiftData)
      }
      await this.$store.commit('setFreegift', JSON.stringify(this.freeGiftList))
    },
    async addPreGifts(data) {
      let flg = true
      let preGiftData = {
        start: this.start,
        user_id: data.u,
        user_name: data.ac,
        avatar: data.av,
        count: data.n,
        gift_img: data.g,
        flg: data.ua,
        create: data.created_at,
        at: data.at,
        d: data.d,
        gt: data.gt,
        h: data.h,
        t: data.t,
      }

      for (let i = 0; i < this.preGiftList.length; i++) {
        if (
          this.preGiftList[i].user_id === preGiftData.user_id &&
          this.preGiftList[i].gift_img === preGiftData.gift_img
        ) {
          this.preGiftList[i].count += preGiftData.count
          flg = false
        }
      }
      if (flg) {
        this.preGiftList.push(preGiftData)
      }
      await this.$store.commit('setPregift', JSON.stringify(this.preGiftList))
    },
    getStreamKey() {
      this.loadingKey = true
      axios
        .get(
          'https://niconico-showroom-api.herokuapp.com/apis/live_info/' +
            this.roomId
        )
        .then((response) => {
          if (response.data != '') {
            if (response.data.bcsvr_key != '') {
              this.roomData = response.data
              this.connectRoom(response.data.bcsvr_key)
            } else {
              alert('配信停止中です')
            }
          }
        })
        .finally(() => {
          this.loadingKey = false
        })
    },
    connectRoom(key) {
      let date = new Date()
      let time = date.getTime()
      this.start = Math.floor(time / 1000)

      this.socket = new WebSocket('wss://online.showroom-live.com')
      this.socket.onopen = (e) => {
        this.socket.send('SUB	' + key)
        setInterval(() => {
          if (this.socket != null) {
            this.socket.send('PING	showroom')
          }
        }, 60000)
        this.streamBtnDisabled = false
        this.tabShow = false
        this.history = false
      }
      this.socket.onclose = (e) => {
        console.log('接続が切断されました')
        this.socket = null
      }
      this.socket.onerror = (error) => {
        alert('エラーが発生しました\nページをリロードします')
        location.reload()
      }
      this.socket.onmessage = (data) => {
        if (data.data === 'ACK	showroom') return

        try {
          let getMessage = JSON.parse(
            data.data.replace('MSG	' + this.roomData.bcsvr_key + '	', '')
          )
          if (getMessage.cm != undefined) {
            if (Number.isFinite(Number(getMessage.cm)) && getMessage.cm <= 50) {
              this.addCount(getMessage)
            } else {
              this.addComments(getMessage)
            }
          }
          // ギフト
          if (getMessage.g != undefined) {
            if (getMessage.gt === 1) {
              // 有料
              this.addPreGifts(getMessage)
            } else {
              // 無料
              this.addFreeGifts(getMessage)
            }
          }
        } catch (error) {
          console.log('=======')
          console.log(error)
          console.log('=======')
        }
      }
    },
    end() {
      this.streamBtnDisabled = true
      this.socket.close()
      this.tabShow = true
      setTimeout(() => {
        let triggerTabList = [].slice.call(
          document.querySelectorAll('#nav-tab a')
        )
        triggerTabList.forEach(function (triggerEl) {
          let tabTrigger = new bootstrap.Tab(triggerEl)

          triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
          })
        })
      }, 0)
    },
    save() {
      let history = {
        date: this.start,
        comment: this.commentList,
        count: this.countList,
        free: this.freeGiftList,
        pre: this.preGiftList,
      }
      this.$store.commit('setHistory', history)
      this.start = null
      this.commentList = []
      this.countList = []
      this.freeGiftList = []
      this.preGiftList = []
      this.tabShow = false
      this.history = true
    },
  },
}
</script>

<style>
</style>
