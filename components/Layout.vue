<template>
  <div>
    <site-header />
    <toc-header @onClick="expanded = !expanded" />
    <div class="layover" :class="{ visible: expanded }" @click="expanded = false"></div>

    <main>
      <div class="container">
        <div class="document-container">
          <article><nuxt-child :key="$route.fullPath" /></article>
          <sidebar :tree="tree" :expanded="expanded" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SiteHeader from '~/components/Header'
  import Sidebar from '~/components/Sidebar'
  import TocHeader from '~/components/TocHeader'

  export default {
    props: ['tree'],
    data () {
      return {
        expanded: false,
      }
    },
    components: { SiteHeader, Sidebar, TocHeader },
  }
</script>

<style>
  .document-container {
    display: flex;
    justify-content: space-between;
  }

  .layover {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    pointer-events: none;
    opacity: 0;
    transform: opacity 150ms ease;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
  }

  .layover.visible {
    pointer-events: initial;
    opacity: 1;
  }

  .document-container article {
    width: 100%;
  }
</style>
