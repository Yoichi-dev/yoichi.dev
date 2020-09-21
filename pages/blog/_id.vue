<template>
  <div>
    <v-parallax :src="currentPost.fields.image.fields.file.url">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">{{ currentPost.fields.title }}</h1>
          <h4 class="subheading">{{ formatDate(currentPost.fields.publishDate) }}</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" md="8">
          <template v-if="currentPost" class="container">
            <div class="post-content" v-html="$md.render(currentPost.fields.body)"></div>
          </template>
          <template v-else>お探しの記事は見つかりませんでした。</template>
        </v-col>
      </v-row>
    </v-container>
    <div class="py-12"></div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import Prism from '~/plugins/prism'
import moment from 'moment'

export default {
  async asyncData({ env, params }) {
    let currentPost = null
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.id,
      })
      .then((res) => (currentPost = res.items[0]))
      .catch(console.error)
    return { currentPost }
  },
  head() {
    return {
      title: this.currentPost.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPost.fields.title,
        },
        // { hid: 'og:site_name', property: 'og:site_name', content: this.post.fields.title + ' - Izm Log' },
        // { hid: 'og:type', property: 'og:type', content: 'website' },
        // { hid: 'og:url', property: 'og:url', content: 'https://izm51.com/posts/' + this.post.fields.slug },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.currentPost.fields.title,
        },
        // { hid: 'og:description', property: 'og:description', content: this.post.fields.description },
        // { hid: 'og:image', property: 'og:image', content: "https:"+this.post.fields.image.fields.file.url },
      ],
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  computed: {
    formatDate: () => (inputDate) => {
      return moment(inputDate).format('YYYY/MM/DD(ddd) HH:mm')
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep p > img {
  max-width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
}

::v-deep .v-parallax {
  height: 30em !important;
}

::v-deep .v-parallax__content {
  background-color: rgba(0, 0, 0, 0.5);
}

::v-deep .md img {
  margin-top: 3em;
  margin-bottom: 3em;
}

::v-deep h2 {
  margin-top: 3em;
  margin-bottom: 1em;
  padding-left: 0.5em;
  background: #99ccb7;
  font-weight: 600;
  border-left: 4px solid #77c7a6;
}

::v-deep .table-of-contents {
  position: relative;
  margin: 0 0 5em 0;
  display: inline-block;
  background: #fff;
  padding: 1em 3em 1.2em 1em;
  border-top: 1px solid #d9d9d9;
  border-right: 0;
  border-bottom: 1px solid #d9d9d9;
  border-left: 28px solid #99ccb7; /*アクセントカラー*/
  box-shadow: 1px 0 0 #959595d4, 2px 0 0 #fff, 3px 0 0 #898989de, 4px 0 0 #fff,
    5px 0 0 #858585de, 9px 3px 10px #ababab96;
}

::v-deep .table-of-contents::before {
  content: '目次';
  position: static;
  display: block;
  text-align: start;
  font-size: 120%;
  top: -30px;
  left: 10px;
  margin: 0;
  font-weight: normal;
  border-bottom: 5px solid #99ccb7;
}

::v-deep .table-of-contents a {
  color: #5a5a5a;
  display: block;
  text-decoration: none;
  background: linear-gradient(transparent 0, transparent 93%, #d8d8d8 100%);
  background-size: 100% 2em;
  line-height: 2em;
}

::v-deep .table-of-contents > li::before {
  font-family: 'blogicon';
  content: '\f024';
  font-weight: normal;
  color: #99ccb7; /*アクセントカラー*/
  position: absolute;
  top: 2px;
  left: -18px;
}

::v-deep .table-of-contents li {
  list-style-type: none;
  margin: 0 0 0 1.4em;
  position: relative;
  font-size: 1.1em;
}

::v-deep .table-of-contents li ul {
  margin: 0 0 1em 0.5em;
  padding: 0;
}

::v-deep .table-of-contents li ul li {
  list-style-type: disc;
  color: #99ccb7; /*アクセントカラー*/
  font-size: 0.9em;
}

::v-deep h3,
pre {
  margin-top: 2.5em;
}
</style>