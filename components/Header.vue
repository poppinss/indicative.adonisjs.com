<template>
  <div>
    <div class="header-notification">
      <div class="container">
        <p>
          Using older version of Indicative or <code>@adonisjs/validator</code>?.
          <a href="https://indicative-v5.adonisjs.com/" target="_blank" rel="noopener">Click here</a> to access the old version documentation.
        </p>
      </div>
    </div>
    <div class="site-header-wrapper" :class="{ expanded }">
      <header class="site-header">
        <div class="container">
          <div class="header-container">
            <div class="logo-wrapper">
              <header-logo />
              <hamburger :expanded="expanded" @onHamburgerClick="expanded = !expanded" />
            </div>
            <div class="nav-wrapper">
              <header-nav />
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
  import HeaderNav from '~/components/Nav'
  import HeaderLogo from '~/components/Logo'
  import Hamburger from '~/components/Hamburger'

  export default {
    components: { HeaderNav, HeaderLogo, Hamburger },
    data () {
      return {
        expanded: false,
      }
    }
  }
</script>

<style>
  .header-notification {
    height: 40px;
    position: fixed;
    top: 0;
    background: #091e2d;
    right: 0;
    left: 0;
    line-height: 40px;
    z-index: 2;
  }

  .header-notification p {
    color: #c0c7cc;
    font-size: 1.4rem;
  }

  .header-notification p a {
    color: #fff;
  }

  .site-header-wrapper {
    height: var(--header-height);
    background-color: var(--primary-color);
    transition: height 200ms ease;
  }

  .site-header {
    background-color: var(--primary-color);
    position: fixed;
    z-index: 2;
    top: 40px;
    left: 0;
    width: 100%;
  }

  .header-container {
    height: var(--header-height);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: height 200ms ease;
  }

  .logo-wrapper {
    height: var(--header-height);
    flex-shrink: 0;
    display: flex;
    position: relative;
    align-items: center;
  }

  .site-header-wrapper.expanded, .site-header-wrapper.expanded .header-container {
    height: 300px;
  }

  .site-header-wrapper.expanded .header-container {
    overflow: scroll;
  }

  @media (min-width: 1024px) {
    .header-container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
