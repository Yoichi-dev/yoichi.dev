<template>
  <v-hover v-slot:default="{ hover }" close-delay="50">
    <v-card
      max-width="400"
      class="mx-auto"
      :to="linkTo(cardData, propUrl)"
      :elevation="hover ? 16 : 2"
    >
      <v-img
        :src="setEyeCatch(cardData).url"
        :alt="setEyeCatch(cardData).title"
        :aspect-ratio="16/9"
        max-height="200"
        class="white--text"
      >
        <v-card-title class="align-end fill-height font-weight-bold">{{ cardData.fields.title }}</v-card-title>
      </v-img>
      <v-card-text>{{ formatDate(cardData.fields.publishDate) }}</v-card-text>
      <v-list-item three-line style="min-height: unset;">
        <v-list-item-subtitle>{{ cardData.fields.body }}</v-list-item-subtitle>
      </v-list-item>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" :to="linkTo(cardData, propUrl)">この記事を見る</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: ['cardData', 'propUrl'],
  computed: {
    ...mapGetters(['setEyeCatch']),
    linkTo: () => (obj, str) => {
      return { name: str + '-id', params: { id: obj.fields.slug } }
    },
    formatDate: () => inputDate => {
      return moment(inputDate).format('YYYY/MM/DD(ddd) HH:mm')
    }
  }
}
</script>

<style scoped>
.v-card__title {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>