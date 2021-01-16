<template>
  <div>
    <div class="uk-container">
      <div class="uk-child-width-expand@s uk-text-center" uk-grid>
        <div>
          <p>フォントサイズ</p>
          <p uk-margin>
            <button class="uk-button uk-button-default" @click="fontSmall()">
              小さく
            </button>
            <button class="uk-button uk-button-default" @click="fontBig()">
              大きく
            </button>
          </p>
        </div>
        <div>
          <p>太さ</p>
          <p uk-margin>
            <button class="uk-button uk-button-default" @click="fontSmallB()">
              　細く　
            </button>
            <button class="uk-button uk-button-default" @click="fontBigB()">
              　太く　
            </button>
          </p>
          <p class="uk-text-danger">{{ text }}</p>
        </div>
        <div>
          <p>文字色</p>
          <div>
            <input type="color" @change="saveColorF()" v-model="styles.color" />
            <label for="head">{{ styles.color }}</label>
          </div>
        </div>
        <div>
          <p>背景色</p>
          <div>
            <input
              type="color"
              @change="saveColor()"
              v-model="styles.backgroundColor"
            />
            <label for="head">{{ styles.backgroundColor }}</label>
          </div>
        </div>
        <div>
          <p>形式</p>
          <div class="">
            <label
              ><input
                class="uk-radio"
                type="radio"
                @change="formatDate()"
                name="radio2"
                :checked="isFormat"
              />
              時間秒</label
            >
            <label
              ><input
                class="uk-radio"
                type="radio"
                @change="formatDate()"
                name="radio2"
                :checked="!isFormat"
              />
              年月日時間秒</label
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="uk-padding" id="clockList" v-bind:style="styles">
        <span class="cinecaptionFont">{{ time }}</span
        ><br />
        <span class="dsegFont">{{ time }}</span
        ><br />
        <span class="yuzuFont">{{ time }}</span
        ><br />
        <span class="tamanegiFont">{{ time }}</span
        ><br />
        <span class="dohetaFont">{{ time }}</span
        ><br />
        <span class="sayonaraFont">{{ time }}</span
        ><br />
        <span class="framboiseFont">{{ time }}</span
        ><br />
        <span class="sasagakiFont">{{ time }}</span
        ><br />
        <span class="takibiFont">{{ time }}</span
        ><br />
        <span class="mojiFont">{{ time }}</span
        ><br />
        <span class="sharpFont">{{ time }}</span
        ><br />
        <span class="syokakiFont">{{ time }}</span
        ><br />
        <span class="minecraftFont">{{ time }}</span
        ><br />
        <span class="gi851Font">{{ time }}</span
        ><br />
        <span class="puikkoFont">{{ time }}</span
        ><br />
        <span class="albertellaFont">{{ time }}</span
        ><br />
        <span class="waptiaFont">{{ time }}</span
        ><br />
        <span class="kaisoFont">{{ time }}</span
        ><br />
        <span class="popFont">{{ time }}</span
        ><br />
        <span class="pigmoFont">{{ time }}</span
        ><br />
      </div>
    </div>
    <div class="uk-container">
      <table class="uk-table uk-table-hover uk-table-divider">
        <thead>
          <tr>
            <th>News</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(news, i) in newsLists" :key="i">
            <td>{{ news.title[0] }}</td>
            <td v-html="news.content"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="uk-margin"></div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  data() {
    return {
      time: null,
      fontsize: 0,
      weight: 0,
      isFormat: null,
      format: '',
      text: '',
      newsLists: [],
      styles: {
        color: '',
        fontSize: '',
        backgroundColor: '',
        fontFamily: '',
      },
    }
  },
  head() {
    return {
      title: '現在時刻 | Yoichi.dev',
    }
  },
  mounted() {
    setTimeout(() => {
      // this.$store.commit('setFontSize', 3)
      // this.$store.commit('setBackgroundColor', '#ffffff')
      // this.$store.commit('setFormat', 'H:mm:ss')
      // this.$store.commit('setFontColor', '#000000')
      // this.$store.commit('setfontWeight', 600)

      if (this.$store.state.fontsize != null) {
        this.fontsize = this.$store.state.fontsize
        this.styles.fontSize = this.$store.state.fontsize + 'em'
      } else {
        this.fontsize = 3
        this.styles.fontSize = '3em'
      }

      if (this.$store.state.fontweight != null) {
        this.styles.fontWeight = this.$store.state.fontweight
      } else {
        this.styles.fontWeight = 600
      }

      if (this.$store.state.backgroundcolor != null) {
        this.styles.backgroundColor = this.$store.state.backgroundcolor
      } else {
        this.styles.backgroundColor = '#ffffff'
      }
      if (this.$store.state.fontcolor != null) {
        this.styles.color = this.$store.state.fontcolor
      } else {
        this.styles.color = '#000000'
      }
      if (this.$store.state.format != null) {
        this.format = this.$store.state.format
        this.isFormat = this.format == 'H:mm:ss' ? true : false
      } else {
        this.format = 'H:mm:ss'
        this.isFormat = true
      }
    }, 0)
    setInterval(() => {
      this.time = moment(new Date()).format(this.format)
    }, 1000)
    axios
      .get('https://yoichi.microcms.io/api/v1/news', {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.MICROCMSKEY,
        },
      })
      .then((response) => {
        this.newsLists = response.data.contents
      })
    axios
      .get('https://niconico-showroom-api.herokuapp.com/analyze/clock')
      .then((response) => {})
  },
  methods: {
    fontSmall() {
      if (this.fontsize - 1 > 0) {
        this.fontsize -= 0.2
        this.styles.fontSize = this.fontsize + 'em'
        this.$store.commit('setFontSize', this.fontsize)
      }
    },
    fontBig() {
      this.fontsize += 0.2
      this.styles.fontSize = this.fontsize + 'em'
      this.$store.commit('setFontSize', this.fontsize)
      console.log(this.styles.fontSize)
    },

    fontSmallB() {
      this.text = ''
      if (this.styles.fontWeight - 1 > 0) {
        this.styles.fontWeight -= 100
        this.$store.commit('setfontWeight', this.styles.fontWeight)
        console.log(this.styles.fontWeight)
      } else {
        this.text = 'それ以上は変わりません'
      }
    },
    fontBigB() {
      this.text = ''
      if (this.styles.fontWeight < 900) {
        this.styles.fontWeight += 100
        this.$store.commit('setfontWeight', this.styles.fontWeight)
        console.log(this.styles.fontWeight)
      } else {
        this.text = 'それ以上は変わりません'
      }
    },

    saveColor() {
      console.log(this.styles.backgroundColor)
      this.$store.commit('setBackgroundColor', this.styles.backgroundColor)
    },
    saveColorF() {
      console.log(this.styles.color)
      this.$store.commit('setFontColor', this.styles.color)
    },
    formatDate() {
      this.isFormat = !this.isFormat
      if (this.isFormat) {
        this.format = 'H:mm:ss'
      } else {
        this.format = 'YYYY/MM/DD(ddd) H:mm:ss'
      }
      this.$store.commit('setFormat', this.format)
    },
  },
}
</script>

<style scoped>
.yuzuFont {
  font-family: 'yuzuFont';
}
.mojiFont {
  font-family: 'mojiFont';
}
.sharpFont {
  font-family: 'sharpFont';
}
.syokakiFont {
  font-family: 'syokakiFont';
}
.tamanegiFont {
  font-family: 'tamanegiFont';
}
.dohetaFont {
  font-family: 'dohetaFont';
}
.sayonaraFont {
  font-family: 'sayonaraFont';
}
.framboiseFont {
  font-family: 'framboiseFont';
}
.sasagakiFont {
  font-family: 'sasagakiFont';
}
.takibiFont {
  font-family: 'takibiFont';
}
.puikkoFont {
  font-family: 'puikkoFont';
}
.albertellaFont {
  font-family: 'albertellaFont';
}
.waptiaFont {
  font-family: 'waptiaFont';
}
.kaisoFont {
  font-family: 'kaisoFont';
}
.popFont {
  font-family: 'popFont';
}
.pigmoFont {
  font-family: 'pigmoFont';
}
.minecraftFont {
  font-family: 'minecraftFont';
}
.gi851Font {
  font-family: '851Font';
}
.dsegFont {
  font-family: 'dsegFont';
}
</style>