export const state = () => ({
  roomid: null,
  comment: null,
  count: null,
  freegift: null,
  pregift: null,
  history: []
})

export const mutations = {
  setRoomid(state, roomid) {
    state.roomid = roomid
  },
  setComment(state, comment) {
    state.comment = comment
  },
  setCount(state, count) {
    state.count = count
  },
  setFreegift(state, freegift) {
    state.freegift = freegift
  },
  setPregift(state, pregift) {
    state.pregift = pregift
  },
  setHistory(state, data) {
    state.history.push(data)
  },
  deleteHistory(state, data) {
    state.history = data
  },
  reset(state, flg) {
    if (flg) {
      console.log('初期化')
      state.roomid = null
      state.comment = null
      state.count = null
      state.freegift = null
      state.pregift = null
      state.history = []
    }
  }
}