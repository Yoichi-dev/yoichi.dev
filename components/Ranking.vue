<template>
  <v-row>
    <v-dialog v-model="dialog" width="800" v-if="listenerData != null">
      <listener
        @parentMethod="updateDialog"
        :listenerData="listenerData"
        :blockList="blockList"
        :favoriteList="favoriteList"
      />
    </v-dialog>

    <v-col cols="12">
      <v-card class="mx-auto scrollbar" :height="heightSize" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">配信内ランキング(100位まで)</div>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="rank in ranking"
                    :key="rank.rank"
                    :class="
                      rank.flg == 2
                        ? 'pointer blue lighten-5'
                        : rank.user.user_id == adminId
                        ? 'pointer purple lighten-5'
                        : favoriteList.includes(rank.user.user_id)
                        ? 'pointer green lighten-5'
                        : blockList.includes(rank.user.user_id)
                        ? 'pointer black'
                        : 'pointer'
                    "
                    @click="userData(rank.user.user_id)"
                  >
                    <td>{{ rank.rank }}</td>
                    <td class="pa-0">
                      <img
                        alt=""
                        height="25px"
                        width="25px"
                        :src="rank.user.avatar_url"
                        data-holder-rendered="true"
                      />
                    </td>
                    <td>
                      {{ rank.user.name }}
                    </td>
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
import Listener from "~/components/Listener.vue";

export default {
  props: ["ranking", "heightSize", "favoriteList", "blockList", "adminId"],
  components: {
    Listener,
  },
  data() {
    return {
      dialog: false,
      listenerData: null,
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
    updateDialog(flg) {
      this.dialog = flg;
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