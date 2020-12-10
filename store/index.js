export const state = () => ({
    roomid: null,
    backgroundcolor: null,
})

export const mutations = {
    setRoomid(state, id) {
        state.roomid = id
    },
    setBackgroundColor(state, color) {
        state.backgroundcolor = color
    }
}