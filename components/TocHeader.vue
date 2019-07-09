<template>
  <div class="toc-header">
    <div class="container">
      <div class="toc-header-container">
        <h3 class="header-title"> {{ $route.params.zone }} </h3>
        <a href="#" class="toc-trigger" @click.prevent="$emit('onClick')"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIyIDIwIj4KICA8cGF0aCBmaWxsPSIjMzczQzRGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xLjk5OSAyMEEyIDIgMCAxIDEgMiAxNi4wMDEgMiAyIDAgMCAxIDEuOTk5IDIwem01Ljk5Ni0xYTEgMSAwIDEgMSAwLTJoMTIuOTkxYTEgMSAwIDEgMSAwIDJINy45OTV6bS01Ljk5Ni03QTIgMiAwIDEgMSAyIDguMDAxIDIgMiAwIDAgMSAxLjk5OSAxMnptNS45OTYtMWExIDEgMCAxIDEgMC0yaDEyLjk5MWExIDEgMCAxIDEgMCAySDcuOTk1ek0xLjk5OSA0QTIgMiAwIDEgMSAyIC4wMDEgMiAyIDAgMCAxIDEuOTk5IDR6bTUuOTk2LTFhMSAxIDAgMSAxIDAtMmgxMi45OTFhMSAxIDAgMSAxIDAgMkg3Ljk5NXoiLz4KPC9zdmc+Cg==" /></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['onClick']
  }
</script>


<style>
  .toc-header {
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(55,60,79,.2);
  }

  .toc-header-container {
    height: var(--toc-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toc-trigger img {
    display: block;
  }

  .toc-header-container .header-title {
    font-size: 1.8rem;
    text-transform: capitalize;
  }

  @media (min-width: 1024px) {
    .toc-header {
      display: none;
    }
  }
</style>
