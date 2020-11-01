<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="10">
          <v-text-field
            label="https://www.showroom-live.com/room/profile?room_id="
            hide-details="auto"
            v-model="roomId"
            :rules="rules"
          >
            <template v-slot:append-outer>
              <v-btn outlined color="indigo" @click="getRoomData(roomId)">
                ルーム情報取得
              </v-btn>
            </template></v-text-field
          >
        </v-col>
      </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" md="10">
          <div class="py-6"></div>
          <div v-if="roomData" class="text-h5">
            ステータス：<span class="green--text">登録済み</span>
          </div>
          <div v-else class="text-h5">
            ステータス：<span class="red--text">未登録</span>
          </div>
          <div class="py-6"></div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">key</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ルームID</td>
                  <td>{{ roomData.room_id }}</td>
                </tr>
                <tr>
                  <td>ルーム名</td>
                  <td>{{ roomData.room_name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      rules: [(value) => !!value || '入力してください'],
      roomData: '',
      roomId: '',
    }
  },
  head() {
    return {
      title: this.roomData.room_name || 'SHOWROOM',
    }
  },
  mounted() {
    if (this.$store.state.roomid != null) {
      this.getRoomData(this.$store.state.roomid)
    }
  },
  methods: {
    getRoomData(inputRoomId) {
      // 念のため
      if (inputRoomId === '' || inputRoomId.length < 5) {
        console.log('validation error')
        return
      }
      let replaceRoomId = String(inputRoomId).replace(
        'https://www.showroom-live.com/room/profile?room_id=',
        ''
      )
      // キー取得
      axios
        .get('http://localhost:3001/apis/live_info/' + replaceRoomId)
        .then((response) => {
          if (response.data.room_name === undefined) {
            alert('ページが存在しません')
            this.roomData = ''
            this.roomId = ''
          }
          console.log(response.data)
          this.roomData = response.data
          this.roomId = response.data.room_id
          this.$store.commit('setRoomid', response.data.room_id)
        })
        .catch((err) => {
          alert('ページが存在しません')
          this.roomData = ''
          this.roomId = ''
        })
    },
  },
}
</script>
