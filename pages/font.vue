<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <p>フォントサイズ</p>
          <v-btn class="ma-2" outlined color="indigo" @click="fontSmall()">
            小さく
          </v-btn>
          <v-btn class="ma-2" outlined color="indigo" @click="fontBig()">
            大きく
          </v-btn>
          <br />
        </v-col>
        <v-col cols="12">
          <p>フォントファミリー</p>
          　無料版はデフォルトフォントしか使えません
          <br />
        </v-col>
        <v-col cols="12">
          <p>フォントカラー</p>
          　無料版は白字に黒ふちになります
          <br />
        </v-col>
        <v-col cols="12">
          <p>テロップスピード</p>
          　無料版は変更できません
          <v-slider
            v-model="speed"
            step="10"
            ticks="always"
            tick-size="4"
            disabled
          ></v-slider>
          <br />
        </v-col>
      </v-row>
      <v-row justify="center" align="center" v-bind:style="styles">
        <span class="font">サンプルフォント</span>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      fontsize: 5,
      speed: 50,
      styles: {
        color: 'white',
        fontSize: '5em',
        backgroundColor: '#DCFFDC',
      },
    }
  },
  head() {
    return {
      title: 'SHOWROOM',
    }
  },
  mounted() {
    if (this.$store.state.fontsize != null) {
      this.fontsize = this.$store.state.fontsize
      this.styles.fontSize = this.$store.state.fontsize + 'em'
    }
    if (this.$store.state.backgroundcolor != null) {
      this.styles.backgroundColor = this.$store.state.backgroundcolor
    }
  },
  methods: {
    fontSmall() {
      if (this.fontsize - 1 != 0) {
        this.fontsize -= 1
        this.styles.fontSize = this.fontsize + 'em'
        this.$store.commit('setFontSize', this.fontsize)
      }
    },
    fontBig() {
      this.fontsize += 1
      this.styles.fontSize = this.fontsize + 'em'
      this.$store.commit('setFontSize', this.fontsize)
    },
  },
}
</script>

<style scoped>
.font {
  font-family: '';
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
  text-stroke: 1px #000;
}
</style>