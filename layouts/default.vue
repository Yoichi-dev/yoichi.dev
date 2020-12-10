<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">LINE風コメントβ版</a>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        lang: 'ja',
      },
    }
  },
}
</script>

<style>
</style>
