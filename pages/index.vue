<template>
  <main class="pt-5">
    <div class="row m-0 p-0 mt-1">
      <div class="col-12 col-md-6" v-bind:style="styles">
        <div class="row">
          <div id="content" class="section section-device p-0">
            <div id="iphone-x" class="p-0">
              <div class="device device-iphone-x">
                <div class="device-frame">
                  <div class="bg-white radius frame-area">
                    <div class="line-area">
                      <div class="line-title">
                        <div class="row" style="display: flex">
                          <div class="col" id="now_time">time</div>
                          <div
                            class="col mt-1"
                            style="display: flex; padding-left: 10em"
                          >
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-bar-chart-fill mr-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="4" height="5" x="1" y="10" rx="1" />
                              <rect width="4" height="9" x="6" y="6" rx="1" />
                              <rect width="4" height="14" x="11" y="1" rx="1" />
                            </svg>
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-battery-half"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12 5H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z"
                              />
                              <path
                                d="M2 6h5v4H2V6zm12.5 3.5a1.5 1.5 0 0 0 0-3v3z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div class="row text-center py-2">
                          <div style="display: flex">
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              class="bi bi-chevron-left ml-1 mt-1"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                              />
                            </svg>
                            <div id="room_name"></div>
                          </div>
                        </div>
                      </div>
                      <div class="line-contents scroll mb-1" id="comment"></div>
                      <div
                        @click="scroll_btm()"
                        id="msg-btm"
                        class="p-2 bg-secondary"
                        style="
                          position: absolute;
                          bottom: 80px;
                          right: 40px;
                          cursor: pointer;
                          display: none;
                        "
                      >
                        <svg
                          width="2em"
                          height="2em"
                          viewBox="0 0 16 16"
                          class="bi bi-chevron-down text-light"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                          />
                        </svg>
                      </div>
                      <div
                        class="line-title"
                        style="border-radius: 0px 0px 20px 20px"
                      >
                        <div class="row" style="display: flex">
                          <div class="col mt-1" style="display: flex">
                            <svg
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              class="bi bi-plus mr-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                              />
                            </svg>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              class="bi bi-camera-fill mt-1 mr-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                              />
                            </svg>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 17 16"
                              class="bi bi-image mt-1 mr-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M14.002 2h-12a1 1 0 0 0-1 1v9l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15.002 9.5V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm4 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                              />
                            </svg>
                            <div
                              class="input-group"
                              style="display: flex; width: 200px"
                            >
                              <input
                                type="text"
                                style="border-radius: 1rem 0rem 0rem 1rem"
                                class="form-control"
                              />
                              <span class="input-group-text"
                                ><svg
                                  width="1.5em"
                                  height="1.5em"
                                  viewBox="0 0 16 16"
                                  class="bi bi-emoji-smile mt-1"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"
                                  />
                                  <path
                                    d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
                                  /></svg
                              ></span>
                            </div>
                            <svg
                              width="1.5em"
                              height="1.5em"
                              viewBox="0 0 16 16"
                              class="bi bi-mic-fill mt-1 ml-2"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                              <path
                                fill-rule="evenodd"
                                d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="device-stripe"></div>
                <div class="device-header"></div>
                <div class="device-sensors"></div>
                <div class="device-btns"></div>
                <div class="device-power"></div>
                <div class="device-home"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="row mt-3">
          <div class="mx-auto">
            <h1 class="fw-light">LINE風SRコメントビューワーβ版</h1>
            <p class="lead text-muted">
              配信者向けアプリケーション<br />
              SHOWROOMで配信中のコメントをLINE風に表示出来るWebアプリケーションになります。<br />
              β版（レビュー版）になりますので基本的な機能しか提供していません。<br />
              実際に使用して使用感をレビューして頂ける方の意見を取り入れて要望、機能追加を考えてます。<br />
              また、コメント表示のデザインもLINE以外要望があれば作ります。
            </p>
          </div>
        </div>
        <div class="row mt-5">
          <p class="h5">自分のルームID登録</p>
          <div class="mx-auto" id="loading" v-if="loadingRoom">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            読み込み中...
          </div>
          <div class="input-group">
            <input
              type="text"
              id="room-id"
              class="form-control"
              v-model="roomId"
              placeholder="https://www.showroom-live.com/room/profile?room_id=XXXXXX"
              aria-label="https://www.showroom-live.com/room/profile?room_id=XXXXXX"
              aria-describedby="room-id"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="room-id-btn"
              @click="check(roomId)"
              :disabled="btnDisabled"
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
        <div class="row mt-5">
          <p class="h5">登録中のデータ</p>
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
                    @click="connectRoom()"
                    v-if="roomData"
                  >
                    接続
                  </button>
                </td>
                <td>{{ roomData.room_id }}</td>
                <td>{{ roomData.room_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row mt-5">
          <p class="h5">背景色変更</p>
          <div>
            <input
              type="color"
              @change="saveColor()"
              v-model="styles.backgroundColor"
            />
            <label for="head">{{ styles.backgroundColor }}</label>
          </div>
        </div>
        <div class="row mt-5">
          <p class="h5">注意事項</p>
          <p class="lead text-muted">
            ・不具合があった際はリロードしてください<br />
            ・サイズ変更は今の所OBS側で変えてください<br />
            ・半角文字コメントが来たら突き抜けるかも<br />
            ・現在調整が面倒なので1980×1080で綺麗に表示されるようになってます<br />
            ・Google Chromeでしかテストしてません
          </p>
        </div>
        <div class="row mt-5">
          <p class="h5">追加予定機能</p>
          <p class="lead text-muted">
            ・特定のキーワードをスタンプ変換<br />
            ・文字サイズ、画面サイズ調整機能<br />
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      socket: null,
      roomId: '',
      btnDisabled: false,
      roomData: '',
      styles: {
        backgroundColor: '#FFFFFF',
      },
      loadingRoom: false,
      loadingKey: false,
    }
  },
  mounted() {
    this.socket = new WebSocket('wss://online.showroom-live.com')
    this.socket.onopen = (e) => {
      console.log('コネクションを開始しました')
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
            // カウント
          } else {
            this.addComments(getMessage)
          }
        }
      } catch (error) {
        console.log('=======')
        console.log(error)
        console.log('=======')
      }
    }

    setInterval(() => {
      let jikan = new Date()
      document.getElementById('now_time').innerText = `${(
        '0' + jikan.getHours()
      ).slice(-2)}:${('0' + jikan.getMinutes()).slice(-2)}`
    }, 1000)

    setTimeout(() => {
      if (this.$store.state.backgroundcolor != null) {
        this.styles.backgroundColor = this.$store.state.backgroundcolor
      }

      if (this.$store.state.roomid != null) {
        this.roomId = this.$store.state.roomid
        this.check(this.roomId)
      }
    }, 0)

    document.getElementById('comment').onscroll = () => {
      let beforDom = document.getElementById('comment')
      if (
        beforDom.scrollTop + beforDom.clientHeight <
        beforDom.scrollHeight - 300
      ) {
        document.getElementById('msg-btm').style.display = 'inline'
      } else {
        document.getElementById('msg-btm').style.display = 'none'
      }
    }
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
    saveColor() {
      console.log(this.styles.backgroundColor)
      this.$store.commit('setBackgroundColor', this.styles.backgroundColor)
    },
    addComments(data) {
      let dateTime = new Date(data.created_at * 1000)

      let insertHTML = `
      <div class="line-left">
        <figure>
          <img
            src="https://image.showroom-cdn.com/showroom-prod/image/avatar/${
              data.av
            }.png"
          />
        </figure>
        <div class="line-left-text">
          <div class="name"><br />${data.ac}</div>
          <div class="text">
            ${data.cm}
          </div>

          <div
            style="display: inline-block; margin-left: 0"
            class="time"
          >
            <span class="time">${('0' + dateTime.getHours()).slice(-2)}:${(
        '0' + dateTime.getMinutes()
      ).slice(-2)}</span>
          </div>
        </div>
      </div>
      `
      let greets = document.getElementById('comment')
      greets.insertAdjacentHTML('beforeend', insertHTML)

      let flg = true
      let beforDom = document.getElementById('comment')
      if (
        beforDom.scrollTop + beforDom.clientHeight <
        beforDom.scrollHeight - 300
      )
        flg = false
      let afterDom = document.getElementById('comment')
      if (flg) {
        afterDom.scroll(0, afterDom.scrollHeight - afterDom.clientHeight)
        document.getElementById('msg-btm').style.display = 'none'
      }
    },
    scroll_btm() {
      let afterDom = document.getElementById('comment')
      afterDom.scroll(0, afterDom.scrollHeight - afterDom.clientHeight)
      document.getElementById('msg-btm').style.display = 'none'
    },
    connectRoom() {
      this.loadingKey = true
      axios
        .get(
          'https://niconico-showroom-api.herokuapp.com/apis/live_info/' +
            this.roomId
        )
        .then((response) => {
          if (response.data != '') {
            if (response.data.bcsvr_key != '') {
              document.getElementById(
                'room_name'
              ).innerText = this.roomData.room_name
              this.socket.send('SUB	' + response.data.bcsvr_key)
              setInterval(() => {
                this.socket.send('PING	showroom')
              }, 60000)
              this.loadingKey = false
            } else {
              alert('配信停止中です')
              this.loadingKey = false
            }
          }
        })
    },
  },
}
</script>

<style>
.device {
  margin: 1rem auto;
}

.radius {
  background-color: #7494c0 !important;
  border-radius: 40px;
}

.frame-area {
  height: 100%;
}

.line-area {
  border-radius: 40px 40px 20px 20px;
  padding: 0;
  background: #7494c0;
  overflow: hidden;
  margin: auto;
  font-size: 80%;
}

.line-title {
  background: #273246;
  font-size: 150%;
  color: #ffffff;
}

.scroll {
  height: 698px;
  overflow-y: scroll !important;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.line-contents {
  padding: 10px;
  overflow: hidden;
  line-height: 135%;
}

.line-left {
  display: inline-block;
  position: relative;
  display: block;
  margin-bottom: 5px;
  max-width: 90%;
  clear: both;
}

.line-left figure {
  width: 50px;
  position: absolute;
  top: 15px;
  left: 0;
  padding: 0;
  margin: 0;
}

.line-left figure img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.line-left .line-left-text {
  margin-left: 60px;
}

.line-left .line-left-text .name {
  font-weight: 500;
  font-size: 2em;
  line-height: 1em;
  margin-bottom: 5px;
  color: #ffffff;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-left .text {
  margin: 0;
  display: inline-block;
  position: relative;
  padding: 10px;
  border-radius: 20px;
  background-color: #edf1ee;
  color: #000000;
  font-weight: 900;
  font-size: 2.5em;
  line-height: 1em;
  max-width: 97%;
}

.line-left .text::after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  left: -10px;
  top: 3px;
  border-right: 20px solid #edf1ee;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  transform: rotate(35deg);
  -webkit-transform: rotate(35deg);
}

.time {
  content: '';
  display: inline-block;
  width: 0px;
  text-align: left;
  right: 0px;
  bottom: 0px;
  font-weight: 500;
  color: #ffffff;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: white !important;
  border: 0px solid white !important;
  border-radius: 0rem 1rem 1rem 0rem !important;
}

#now_time {
  padding-left: 2em;
}

#room_name {
  width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
