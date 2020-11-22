<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10">
        <!-- <v-row v-if="posts.length">
          <v-col v-for="(post, i) in posts" :key="i" cols="12" sm="6" lg="4" xl="3">
            <ListCard :cardData="post" :propUrl="propUrl" cols="12" sm="6" lg="4" xl="3"></ListCard>
          </v-col>
        </v-row>-->
        <div class="text-center">投稿された日記はありません</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import client from '~/plugins/contentful'
// import ListCard from '~/components/ListCard.vue'

export default {
  // comments: {
  //   ListCard,
  // },
  // async asyncData({ env }) {
  //   let posts = []
  //   await client
  //     .getEntries({
  //       content_type: env.CTF_DIARY_TYPE_ID,
  //       order: '-fields.publishDate',
  //     })
  //     .then((res) => (posts = res.items))
  //     .catch(console.error)
  //   return { posts }
  // },
  data() {
    return {
      propUrl: 'diary',
    }
  },
  head() {
    return {
      title: '日記一覧',
    }
  },
}
</script>