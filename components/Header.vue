<template>
  <div class="site-header-wrapper">
    <header class="site-header">
      <div class="container">
        <div class="header-container">
          <header-logo />
          <header-nav />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import HeaderNav from '~/components/Nav'
  import HeaderLogo from '~/components/Logo'

  export default {
    components: { HeaderNav, HeaderLogo },
  }
</script>

<style>
  .site-header-wrapper {
    height: var(--header-height);
  }

  .site-header {
    background-color: var(--primary-color);
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
  }

  .header-container {
    height: var(--header-height);
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
</style>
