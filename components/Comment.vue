<template>
  <v-row>
    <!-- <v-dialog v-model="dialog" width="800" v-if="listenerData != null">
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
                    <v-img
                      :src="listenerData.image"
                      alt=""
                      width="100px"
                    ></v-img>
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
                    v-for="(text, index) in listenerData.description.split(
                      '\n'
                    )"
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
                    <v-img :src="listenerData.room_profile.image" alt="">
                    </v-img>
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
                      :outlined="
                        !favoriteList.includes(listenerData.account_id)
                      "
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="grey lighten-3"
            @click="dialog = false"
            right
            rounded
            text
          >
            　閉じる　
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-dialog v-model="dialog" width="800" v-if="listenerData != null">
      <listener
        :listenerData="listenerData"
        :blockList="blockList"
        :favoriteList="favoriteList"
      />
    </v-dialog>
    <v-col cols="12">
      <v-card class="scrollbar" :height="heightSize" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-simple-table dense>
              <template>
                <!-- <thead>
                  <tr>
                    <th style="width: 25px" class="text-left"></th>
                    <th style="width: 15vw" class="text-left">リスナー名</th>
                    <th class="text-left">コメント</th>
                  </tr>
                </thead> -->
                <tbody>
                  <tr
                    v-for="(item, index) in commentData"
                    :key="index"
                    :class="
                      item.flg == 2
                        ? 'blue lighten-5'
                        : item.id == adminId
                        ? 'purple lighten-5'
                        : favoriteList.includes(item.id)
                        ? 'green lighten-5'
                        : blockList.includes(item.id)
                        ? 'black'
                        : ''
                    "
                  >
                    <td
                      style="width: 25px"
                      class="pa-0 pointer"
                      @click="userData(item.id)"
                    >
                      <img
                        alt=""
                        height="25px"
                        width="25px"
                        :src="
                          'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                          item.avatar +
                          '.png?v=85'
                        "
                        data-holder-rendered="true"
                      />
                    </td>
                    <td
                      style="width: 15vw"
                      class="pa-0 pointer"
                      @click="userData(item.id)"
                    >
                      {{ item.name }}
                    </td>
                    <td>{{ item.comment }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  props: ["commentData", "heightSize", "favoriteList", "blockList", "adminId"],
  data() {
    return {
      listenerData: null,
      dialog: false,
    };
  },
  methods: {
    userData(id) {
      this.listenerData = null;
      axios
        .get(`${process.env.API_URL}/api/live/listener/${id}`)
        .then((response) => {
          this.listenerData = response.data;
          this.dialog = true;
          this.listenerData.account_id = id;
        });
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