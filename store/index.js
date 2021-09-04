export const strict = false

export const state = () => ({
    roomid: null,
    blockList: null,
    favoriteList: null
})

export const mutations = {
    setRoomid(state, id) {
        state.roomid = id
    },
    setBlockList(state, block) {
        state.blockList = block
    },
    setFavoriteList(state, favorite) {
        state.favoriteList = favorite
    }
}