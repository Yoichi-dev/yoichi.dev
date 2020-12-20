<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal" @click="$router.push('/')">
        Showroom Streaming Surveillance
      </h5>
    </div>
    <Nuxt />
  </div>
</template>

<style>
h5 {
  cursor: pointer;
}
</style>
