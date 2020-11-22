<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-row justify="center" cols="10">
        バグ、不具合、要望などありましたらTwitterにてご連絡ください
      </v-row>
      <v-row justify="center" cols="10" class="mb-5">
        <v-btn
          class="ma-2"
          href="https://twitter.com/yoichiro_sub"
          target="_blank"
          rel="noopener"
          large
          outlined
        >
          <v-icon>mdi-twitter</v-icon>
          <span class="text--darken-1">Twitter</span>
        </v-btn>
        <v-btn
          class="ma-2"
          href="https://yoichi.dev/"
          target="_blank"
          rel="noopener"
          large
          outlined
        >
          <v-icon>mdi-web</v-icon>
          <span class="text--darken-1">HP</span>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'info',
    }
  },
}
</script>
