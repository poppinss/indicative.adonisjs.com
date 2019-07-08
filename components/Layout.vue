<template>
  <div>
    <site-header />

    <main>
      <div class="container">
        <div class="document-container">
          <article><nuxt-child :key="$route.fullPath" /></article>
          <sidebar :tree="tree" />
        </div>
      </div>
    </main>

    <footer></footer>
  </div>
</template>

<script>
  import SiteHeader from '~/components/Header'
  import Sidebar from '~/components/Sidebar'

  export default {
    props: ['tree'],
    components: { SiteHeader, Sidebar },
  }
</script>

<style>
  .document-container {
    display: flex;
    justify-content: space-between;
  }

  .document-container article {
    flex: 1;
  }
</style>
