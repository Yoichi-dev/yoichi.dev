<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-row class="mt-5">
        <v-col cols="12" md="4" v-for="(tool, i) in tools" :key="i">
          <v-hover v-slot:default="{ hover }" close-delay="50">
            <v-card class="mx-auto" :elevation="hover ? 16 : 2">
              <v-img
                class="white--text align-end"
                height="250px"
                v-bind:src="tool.img"
              >
                <v-card-title>{{ tool.title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{ tool.date }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ tool.content }}</div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green" :href="tool.url" target="_blnk" text>
                  使ってみる
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      tools: [
        {
          title: 'Watch Log',
          content: '配信中のコメント・ギフトログを確認できるアプリケーション',
          date: '2021/09/05(日)',
          url: 'https://watch-log.yoichi.dev/',
          img: require('@/assets/img/watch.jpg'),
        },
        {
          title: '現在時刻',
          content: '配信の隅に置いて表示できるアプリケーション',
          date: '2021/01/16(土)',
          url: 'https://clock.yoichi.dev/',
          img: require('@/assets/img/clock.png'),
        },
        {
          title: '配信日記（仮）',
          content:
            'SR配信中のコメント、ギフトのログを全部記録して後から見返す事が出来るアプリケーション',
          date: '2020/12/20(日)',
          url: 'https://showroom-streaming-surveillance.yoichi.dev/',
          img: require('@/assets/img/ShowroomStreamingSurveillance.png'),
        },
        {
          title: 'Niconico Showroom',
          content:
            'SHOWROOM配信中のコメントをニコニコ動画風に流すことのできるアプリケーション',
          date: '2020/11/03(火)',
          url: 'https://niconico-showroom.yoichi.dev/',
          img: require('@/assets/img/niconico.jpg'),
        },
        {
          title: 'すこアニフォント変更拡張機能',
          content:
            'すこアニのフォントを手軽に変更できる拡張機能（Google Chrome版）',
          date: '2020/07/11(土)',
          url: 'https://chrome.google.com/webstore/detail/showroom-%E3%81%99%E3%81%93%E3%82%A2%E3%83%8B-%E4%BB%AE-%CE%B2%E7%89%88%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E5%A4%89%E6%9B%B4%E6%A9%9F/nmknohiegmphpeadmmpkfdhddedfbool?hl=ja&authuser=0',
          img: require('@/assets/img/suko.png'),
        },
        {
          title: 'LINE風SRコメントビューワーβ版',
          content:
            'SHOWROOMのコメントをLINE風に表示して配信に使えるアプリケーション',
          date: '2020/12/10(木)',
          url: 'https://showroom-comment-viewer.yoichi.dev/',
          img: require('@/assets/img/line.png'),
        },
      ],
    }
  },
  head() {
    return {
      title: 'info',
    }
  },
}
</script>

<style scoped>
.v-card__title {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>