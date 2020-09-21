<template>
  <v-col class="text-center">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn :href="source" icon large target="_blank" v-on="on">
          <v-icon large>mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <span>Source</span>
    </v-tooltip>
  </v-col>
</template>