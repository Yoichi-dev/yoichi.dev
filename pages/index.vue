<template>
  <div column justify-center align-center>
    <section>
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top +'px)'"
          v-bind:src="require('@/assets/img/top.jpg')"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row align="center" class="white--text mx-auto" justify="center">
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                    class="font-weight-light"
                  >Welcom</span>
                  <br />
                  <span
                    :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                  >{{title}}</span>
                </v-col>
                <v-btn class="aligin-self-end" fab outlined @click="$vuetify.goTo('#about')">
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>
    <section id="about">
      <div class="py-12"></div>
      <v-container class="text-center">
        <h2 class="display-2 mb-3">About Me</h2>
        <v-responsive class="mx-auto mb-8" width="20%">
          <v-divider class="mb-1"></v-divider>
          <v-divider></v-divider>
        </v-responsive>
        <v-responsive class="mx-auto title mb-8">
          東京のSIerに勤めるエンジニア
          <br />実務ではJava、Shell、DataStage、Genexusを使っていたりいなかったり
          <br />ホントはJavaScript、PHPを使ってWebのフロント、バックをやりたいのは内緒
          <br />不定期更新でやっていこうと思う
        </v-responsive>
        <v-avatar class="elevation-12 mb-12" size="150">
          <v-img v-bind:src="require('@/assets/img/avatar.jpg')"></v-img>
        </v-avatar>
        <div></div>
        <v-btn class="ma-2" href="https://twitter.com/Yoichi_dev" target="_blank" large outlined>
          <v-icon>mdi-twitter</v-icon>
          <span class="text--darken-1">Twitter</span>
        </v-btn>
        <v-btn class="ma-2" href="https://github.com/Yoichi-dev" target="_blank" large outlined>
          <v-icon>mdi-github</v-icon>
          <span class="text--darken-1">GitHub</span>
        </v-btn>
        <v-btn
          class="ma-2"
          href="https://www.instagram.com/yoichiro.todaka"
          target="_blank"
          large
          outlined
        >
          <v-icon>mdi-instagram</v-icon>
          <span class="text--darken-1">Instagram</span>
        </v-btn>
      </v-container>
      <div class="py-12"></div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: 'Yoichi.dev',
    }
  },
  head() {
    return {
      title: 'ホーム',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'よーいちの気まぐれ技術ブログ',
        },
        { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
        {
          hid: 'og:title',
          property: 'og:title',
          content: process.env.BASE_TITLE,
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'よーいちの気まぐれ技術ブログ',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.BASE_IMG,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.BASE_TITLE,
        },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      ],
    }
  },
}
</script>
