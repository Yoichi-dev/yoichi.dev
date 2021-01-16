export const state = () => ({
    backgroundcolor: null,
    fontsize: null,
    fontweight: null,
    fontcolor: null,
    format: null
})

export const mutations = {
    setBackgroundColor(state, color) {
        state.backgroundcolor = color
    },
    setFontSize(state, size) {
        state.fontsize = size
    },
    setfontWeight(state, weight) {
        state.fontweight = weight
    },
    setFontColor(state, color) {
        state.fontcolor = color
    },
    setFormat(state, format) {
        state.format = format
    },
}