<template>
  <v-card>
    <v-tabs color="deep-purple accent-4">
      <v-tab>リスナー情報</v-tab>
      <v-tab v-if="listenerData.room_profile != null">配信者情報</v-tab>
      <v-tab>設定</v-tab>

      <v-tab-item>
        <v-container fluid>
          <v-row>
            <v-col cols="2" align="center">
              <v-row>
                <v-img :src="listenerData.image" alt="" width="100px"></v-img>
                <v-img
                  :src="listenerData.avatar_url"
                  alt=""
                  width="100px"
                ></v-img>
              </v-row>
              <v-row v-if="listenerData.sns_list != null">
                <span v-for="(item, i) in listenerData.sns_list" :key="i">
                  <a :href="item.url" target="_blank"
                    ><v-img max-width="50" :src="item.icon"></v-img
                  ></a>
                </span>
              </v-row>
            </v-col>

            <v-col cols="10">
              <div class="mb-5">
                {{ listenerData.name }}
                <div v-if="listenerData.account_id == adminId">
                  私がこのアプリの開発者です
                </div>
              </div>
              <div
                class="caption"
                v-for="(text, index) in listenerData.description.split('\n')"
                :key="index"
              >
                {{ text }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item v-if="listenerData.room_profile != null">
        <v-container fluid>
          <v-row class="ma-2">
            <v-col cols="4" align="center">
              <v-row>
                <v-img :src="listenerData.room_profile.image" alt=""> </v-img>
              </v-row>
              <v-row v-if="listenerData.room_profile.sns_list != null">
                <span
                  v-for="(item, i) in listenerData.room_profile.sns_list"
                  :key="i"
                >
                  <a :href="item.url" target="_blank"
                    ><v-img max-width="50" :src="item.icon"></v-img
                  ></a>
                </span>
              </v-row>
            </v-col>

            <v-col cols="8">
              <div class="mb-5">
                {{ listenerData.room_profile.room_name }}
              </div>
              <div
                class="caption"
                v-for="(
                  text, index
                ) in listenerData.room_profile.description.split('\n')"
                :key="index"
              >
                {{ text }}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container fluid>
          <v-row class="ma-2">
            <v-col cols="6" align="center">
              <v-row>
                <v-btn
                  class="ma-2"
                  :outlined="!favoriteList.includes(listenerData.account_id)"
                  color="teal"
                  @click="favoriteAdd(listenerData.account_id)"
                >
                  {{
                    !favoriteList.includes(listenerData.account_id)
                      ? "お気に入り登録"
                      : "お気に入り解除"
                  }}
                </v-btn>
              </v-row>
              <v-row>
                <v-btn
                  class="ma-2"
                  :outlined="!blockList.includes(listenerData.account_id)"
                  color="red"
                  @click="blockAdd(listenerData.account_id)"
                >
                  {{
                    !blockList.includes(listenerData.account_id)
                      ? " 　 ブロック 　"
                      : "ブロック解除"
                  }}
                </v-btn>
              </v-row>
            </v-col>

            <v-col cols="6" align="center">
              <v-row> </v-row>
              <v-row> </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>

    <!-- <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="grey lighten-3" @click="dialog = false" right rounded text>
        　閉じる　
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  props: ["dialog", "listenerData", "favoriteList", "blockList", "adminId"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    blockAdd(id) {
      // チェック
      if (this.favoriteList.includes(Number(id))) {
        alert("お気に入りを解除してから登録してください");
        return;
      }

      if (this.blockList.includes(Number(id))) {
        // 解除
        this.blockList.some((v, i) => {
          if (v == Number(id)) this.blockList.splice(i, 1);
        });
      } else {
        // 登録
        this.blockList.push(Number(id));
        this.$store.commit("setBlockList", this.blockList);
      }
    },
    favoriteAdd(id) {
      // チェック
      if (this.blockList.includes(Number(id))) {
        alert("ブロックを解除してから登録してください");
        return;
      }

      if (this.favoriteList.includes(Number(id))) {
        // 解除
        this.favoriteList.some((v, i) => {
          if (v == Number(id)) this.favoriteList.splice(i, 1);
        });
      } else {
        // 登録
        this.favoriteList.push(Number(id));
        this.$store.commit("setFavoriteList", this.favoriteList);
      }
    },
  },
};
</script>
