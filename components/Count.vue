<template>
  <v-row>
    <v-dialog v-model="dialog" width="800" v-if="listenerData != null">
      <listener
        :listenerData="listenerData"
        :blockList="blockList"
        :favoriteList="favoriteList"
      />
    </v-dialog>
    <v-col cols="12">
      <v-card class="mx-auto scrollbar" :height="heightSize" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(count, index) in countList"
                    :key="index"
                    @click="userData(count.id)"
                    class="pointer"
                  >
                    <td class="pa-0" style="width: 25px">
                      <img
                        alt=""
                        height="25px"
                        width="25px"
                        :src="
                          'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                          count.avatar +
                          '.png?v=85'
                        "
                        data-holder-rendered="true"
                      />
                    </td>
                    <td>{{ count.name }}</td>
                    <td style="width: 100px">{{ count.num }}</td>
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
  props: ["countList", "heightSize", "favoriteList", "blockList", "adminId"],
  data() {
    return {
      dialog: false,
      listenerData: null,
    };
  },
  mounted() {},
  methods: {
    userData(id) {
      this.listenerData = null;
      axios
        .get(`${process.env.API_URL}/api/live/listener/${id}`)
        .then((response) => {
          this.listenerData = response.data;
          this.dialog = !this.dialog;
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