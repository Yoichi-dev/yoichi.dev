<template>
  <div class="mt-1">
    <search :fulldialog.sync="fulldialog" />
    <v-row justify="center" align="center" v-if="!connectBtn">
      <v-btn
        class="ma-2"
        :disabled="connectBtn"
        outlined
        color="indigo"
        @click="checkLive()"
      >
        ルームに接続
      </v-btn>
      <v-btn
        class="ma-2"
        :disabled="connectBtn"
        outlined
        color="red"
        @click="deleteData()"
      >
        初期化
      </v-btn>
    </v-row>
    <!-- 基本情報 -->
    <info :infoData="infoData" />
    <v-row>
      <v-col cols="12" sm="6">
        <!-- テロップ -->
        <telop :telop="telop" />
        <!-- コメント -->
        <comment
          :commentData="commentData"
          :heightSize="comentSize"
          :blockList="blockList"
          :favoriteList="favoriteList"
          :adminId="adminId"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-row>
          <v-col cols="12" lg="6">
            <!-- 無料ギフト -->
            <gift
              :gifts="freeGifts"
              :heightSize="giftSize"
              :blockList="blockList"
              :favoriteList="favoriteList"
              :adminId="adminId"
            />
            <!-- 有料ギフト -->
            <gift
              :gifts="preGifts"
              :heightSize="giftSize"
              :blockList="blockList"
              :favoriteList="favoriteList"
              :adminId="adminId"
            />
            <!-- カウント -->
            <count
              :countList="countList"
              :heightSize="giftSize"
              :blockList="blockList"
              :favoriteList="favoriteList"
              :adminId="adminId"
            />
          </v-col>
          <v-col cols="12" lg="6">
            <!-- ランキング -->
            <ranking
              :ranking="ranking"
              :heightSize="rankingSize"
              :blockList="blockList"
              :favoriteList="favoriteList"
              :dialog.sync="dialog"
              :adminId="adminId"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import Search from "~/components/Search.vue";
import Listener from "~/components/Listener.vue";
import Info from "~/components/Info.vue";
import Comment from "~/components/Comment.vue";
import Telop from "~/components/Telop.vue";
import Ranking from "~/components/Ranking.vue";
import Gift from "~/components/Gift.vue";

export default {
  components: {
    Search,
    Listener,
    Info,
    Comment,
    Telop,
    Ranking,
    Gift,
  },
  data() {
    return {
      adminId: 3699368,
      roomId: "",
      fulldialog: true,
      dialog: false,
      title: "Watch Log",
      telop: "",
      infoData: [
        {
          title: "獲得ポイント",
          num: 0,
          icon: "mdi-file-powerpoint-box-outline",
        },
        {
          title: "現在のフォロワー数",
          num: 0,
          icon: "mdi-account-multiple-plus",
        },
        {
          title: "来場者数",
          num: 0,
          icon: "mdi-account-group",
        },
        {
          title: "配信開始時間",
          liveStartDate: "",
          icon: "mdi-clock-outline",
        },
      ],
      commentData: [],
      listenerData: null,
      ranking: [],
      freeGifts: [],
      preGifts: [],
      giftList: [],
      countList: [],
      streamData: null,
      connectBtn: false,
      socket: null,
      blockList: [],
      favoriteList: [],
      giftSize: "20vh",
      comentSize: "70vh",
      rankingSize: "70vh",
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  mounted() {
    // TODO
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
        this.giftSize = "30vh";
        this.comentSize = "50vh";
        this.rankingSize = "50vh";
        break;
      case "sm":
        this.giftSize = "20vh";
        this.comentSize = "130vh";
        this.rankingSize = "70vh";
        break;
      case "md":
        this.giftSize = "20vh";
        this.comentSize = "130vh";
        this.rankingSize = "70vh";
        break;
      case "lg":
        this.giftSize = "20vh";
        this.comentSize = "70vh";
        this.rankingSize = "70vh";
        break;
      case "xl":
        this.giftSize = "20vh";
        this.comentSize = "68vh";
        this.rankingSize = "70vh";
        break;
    }
    // ホワイトリスト・ブラックリスト読み込み
    setTimeout(() => {
      if (this.$store.state.roomid === null) {
        this.fulldialog = true;
      } else {
        this.fulldialog = false;
        this.roomId = this.$store.state.roomid;
      }
      if (this.$store.state.blockList != null) {
        this.blockList = this.$store.state.blockList;
      }
      if (this.$store.state.favoriteList != null) {
        this.favoriteList = this.$store.state.favoriteList;
      }
    }, 0);
  },
  methods: {
    async checkLive() {
      let flg = false;
      // 配信しているか確認
      await axios
        .get(`${process.env.API_URL}/api/users/${this.roomId}`)
        .then((response) => {
          // this.roomData = response.data;
          this.title = response.data.room_name;
          // フォロワー
          this.infoData[1].num = response.data.follower_num;
          // 配信中判定
          if (response.data.is_onlive) {
            flg = !flg;
            // 接続ボタン非表示
            this.connectBtn = true;
            // 開始時間
            this.infoData[3].liveStartDate =
              response.data.current_live_started_at;
            // 総視聴者
            this.infoData[2].num = response.data.view_num;
          } else {
            alert("配信停止中です");
          }
        });
      if (flg) {
        // テロップ取得
        await this.getTelop();
        // ライブランキング取得
        await this.getRanking();
        // 使えるギフトリスト取得
        await this.getUseGiftList();
        // 配信情報取得
        await this.getLiveData();
        // 接続
        this.connectSocket();
      }
    },
    async getTelop() {
      await axios
        .get(`${config.API_URL}/api/live/telop/${this.roomId}`)
        .then((response) => {
          this.telop = response.data.telop;
        });
    },
    async getRanking() {
      await axios
        .get(`${process.env.API_URL}/api/live/ranking/${this.roomId}`)
        .then((response) => {
          this.ranking = response.data.stage_user_list;
        });
    },
    async getUseGiftList() {
      await axios
        .get(`${process.env.API_URL}/api/live/giftlist/${this.roomId}`)
        .then((response) => {
          this.giftList = response.data.normal;
        });
    },
    async getLiveData() {
      await axios
        .get(`${process.env.API_URL}/api/users/live/${this.roomId}`)
        .then((response) => {
          this.streamData = response.data;
          this.title = response.data.room_name;
        });
    },
    connectSocket() {
      console.log("接続開始");
      // 接続
      this.socket = new WebSocket("wss://online.showroom-live.com");
      // 接続確認
      this.socket.onopen = (e) => {
        this.socket.send("SUB\t" + this.streamData.bcsvr_key);
        console.log("コネクションを開始しました");
      };
      // エラー発生時
      this.socket.onerror = (error) => {
        alert("エラーが発生しました\nページをリロードしてください");
        location.reload();
      };
      // 疎通確認
      setInterval(() => {
        this.socket.send("PING\tshowroom");
        this.update();
        this.getRanking();
      }, 60000);
      // メッセージ受信
      this.socket.onmessage = (data) => {
        // 死活監視
        if (data.data === "ACK\tshowroom") {
          console.log("死活監視OK");
          return;
        }

        if (data.data === "ERR") {
          alert("エラーが発生しました\nページをリロードしてください");
          location.reload();
          return;
        }

        // JSON変換
        let getJson = JSON.parse(
          data.data.split("MSG\t" + this.streamData.bcsvr_key)[1]
        );

        if (Object.keys(getJson).length === 9) {
          // コメントログ
          // カウント
          if (Number.isFinite(Number(getJson.cm)) && Number(getJson.cm) <= 50) {
            this.getCount(getJson);
          } else {
            // ブロックしている人は除去
            if (!this.blockList.includes(getJson.u)) {
              this.getComment(getJson);
            }
          }
        } else if (Object.keys(getJson).length === 12) {
          // ギフトログ
          if (getJson.gt == 2) {
            // 投票
            if (Number(getJson.g) > 10000 && Number(getJson.g) <= 10070) {
            } else if (getJson.g == 1601) {
              // 虹星
              this.getPreGift(getJson);
            } else {
              // 無料
              this.getfreeGift(getJson);
            }
          } else {
            // 有料
            this.getPreGift(getJson);
          }
        } else if (Object.keys(getJson).length === 5) {
          // テロップ
          this.telop = getJson.telop;
        } else if (Object.keys(getJson).length === 4) {
          if (getJson.t == 101) {
            this.socket.close();
            alert("配信が終了しました");
          }
          if (getJson.t == 5) {
            // 不明
          }
        } else {
        }
      };
    },
    getComment(commentObj) {
      if (commentObj.cm != "") {
        this.commentData.unshift({
          id: commentObj.u,
          name: commentObj.ac,
          comment: commentObj.cm,
          flg: commentObj.ua,
          avatar: commentObj.av,
        });
      }
    },
    getfreeGift(commentObj) {
      // 10連
      if (commentObj.n == 10) {
        this.infoData[0].num += Math.floor(commentObj.n * 1.25);
      } else {
        this.infoData[0].num += commentObj.n;
      }

      // 既に存在するか確認
      if (this.freeGifts.some((e) => e.id == commentObj.u)) {
        let flg = true;
        let targetId = "";

        // 加算
        for (let i = 0; i < this.freeGifts.length; i++) {
          if (this.freeGifts[i].id === commentObj.u) {
            this.freeGifts[i].num += commentObj.n;
            this.freeGifts[i].gitId = commentObj.g;
            this.freeGifts[i].name = commentObj.ac;
            this.freeGifts[i].avatar = commentObj.av;
            flg = false;
            targetId = this.freeGifts[i].id;
          }
        }
        if (!flg) {
          let freeGiftData = null;
          this.freeGifts.some((val, i) => {
            if (val.id == targetId) {
              freeGiftData = val;
              this.freeGifts.splice(i, 1);
            }
          });
          this.freeGifts.unshift(freeGiftData);
        }
      } else {
        this.freeGifts.unshift({
          id: commentObj.u,
          name: commentObj.ac,
          gitId: commentObj.g,
          num: commentObj.n,
          flg: commentObj.ua,
          avatar: commentObj.av,
        });
      }
    },
    getPreGift(commentObj) {
      let giftPoint = this.giftList.find((e) => e.gift_id == commentObj.g);
      if (giftPoint != undefined) {
        // 10連
        if (commentObj.n == 10) {
          this.infoData[0].num += Math.floor(
            giftPoint.point * commentObj.n * 2.5 * 1.25
          );
        } else {
          this.infoData[0].num += Math.floor(
            giftPoint.point * commentObj.n * 2.5
          );
        }
      }

      // 既に存在するか確認
      if (this.preGifts.some((e) => e.id == commentObj.u)) {
        let flg = true;
        let targetId = "";

        // 加算
        for (let i = 0; i < this.preGifts.length; i++) {
          if (
            this.preGifts[i].id === commentObj.u &&
            this.preGifts[i].gitId === commentObj.g
          ) {
            this.preGifts[i].num += commentObj.n;
            this.preGifts[i].gitId = commentObj.g;
            this.preGifts[i].name = commentObj.ac;
            this.preGifts[i].avatar = commentObj.av;
            flg = false;
            targetId = this.preGifts[i].id;
          }
        }
        if (!flg) {
          let preGiftData = null;
          this.preGifts.some((val, i) => {
            if (val.id == targetId) {
              preGiftData = val;
              this.preGifts.splice(i, 1);
            }
          });
          this.preGifts.unshift(preGiftData);
        }
      } else {
        this.preGifts.unshift({
          id: commentObj.u,
          name: commentObj.ac,
          gitId: commentObj.g,
          num: commentObj.n,
          flg: commentObj.ua,
          avatar: commentObj.av,
        });
      }
    },
    getCount(commentObj) {
      // 既に存在するか確認
      if (this.countList.some((e) => e.id == commentObj.u)) {
        let flg = true;
        let targetId = "";

        // 加算
        for (let i = 0; i < this.countList.length; i++) {
          if (this.countList[i].id === commentObj.u) {
            this.countList[i].num = commentObj.cm;
            this.countList[i].name = commentObj.ac;
            this.countList[i].avatar = commentObj.av;
            flg = false;
            targetId = this.countList[i].id;
            if (commentObj.cm == "50" && !this.countList[i].chFlg) {
              this.countList[i].chFlg = true;
              this.totalPoint += 50;
            }
          }
        }
        if (!flg) {
          let countData = null;
          this.countList.some((val, i) => {
            if (val.id == targetId) {
              countData = val;
              this.countList.splice(i, 1);
            }
          });
          this.countList.unshift(countData);
        }
      } else {
        this.countList.unshift({
          id: commentObj.u,
          name: commentObj.ac,
          num: commentObj.cm,
          flg: commentObj.ua,
          avatar: commentObj.av,
          chFlg: false,
        });
      }
    },
    update() {
      axios
        .get(`${process.env.API_URL}/api/users/${this.roomId}`)
        .then((response) => {
          // フォロワー
          this.folowerNum = response.data.follower_num;
          if (response.data.is_onlive) {
            // 総視聴者
            this.viewNum = response.data.view_num;
          }
        });
    },
    deleteData() {
      let result = window.confirm(
        "初期化しますか？\nルーム情報とお気に入り・ブロックリストが削除されます"
      );
      if (result) {
        this.$store.commit("setRoomid", null);
        this.$store.commit("setFavoriteList", null);
        this.$store.commit("setBlockList", null);
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}

.scrollbar {
  overflow: scroll;
}

.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>