<template>
  <div>
    <nav class="uk-navbar-container uk-margin" uk-navbar>
      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo" href="#">現在時刻</a>
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
