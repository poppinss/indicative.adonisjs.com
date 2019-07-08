<template>
  <div class="docs-nav">
    <div class="docs-nav-container">
      <nav>
        <ul v-for="node in tree">
          <h4> {{ node.category }} </h4>
          <li v-for="doc in node.docs">
            <nuxt-link :to="doc.permalink">
              {{ doc.title }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tree'],
  }
</script>

<style>
  .docs-nav {
    width: var(--sidebar-width);
    flex-shrink: 0;
  }

  .docs-nav-container {
    background: var(--sidebar-background);
    position: fixed;
    bottom: 0;
    top: var(--header-height);
    margin-right: -999px;
    padding-right: 999px;
    border-left: 1px solid rgba(0, 0, 0, .02);
  }

  .docs-nav-container ul {
    list-style: none;
  }

  .docs-nav-container nav {
    border-right: 1px solid rgba(0, 0, 0, .05);
    width: var(--sidebar-width);
    padding: 0 3rem 4rem 3rem;
    height: 100%;
    overflow: scroll;
  }

  .docs-nav-container h4 {
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--primary-color);
    letter-spacing: 0.5px;
    padding: 5rem 0 1.4rem 0;
    margin-bottom: 1.4rem;
    border-bottom: 1px solid rgba(0, 0 ,0 ,.10);
  }

  .docs-nav-container li a {
    color: var(--grey-800);
    text-decoration: none;
  }

  .docs-nav-container li a.nuxt-link-active {
    color: var(--links-color);
  }
</style>
