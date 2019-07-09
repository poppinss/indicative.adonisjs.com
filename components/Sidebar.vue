<template>
  <div class="docs-nav" :class="{ expanded }">
    <div class="docs-nav-container">
      <nav>
        <div v-for="node in tree" :key="node.category">
          <h4> {{ node.category }} </h4>
          <ul>
            <li v-for="doc in node.docs" :key="doc.permalink">
              <nuxt-link :to="doc.permalink">
                {{ doc.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tree', 'expanded'],
  }
</script>

<style>
  .docs-nav {
    flex-shrink: 0;
  }

  .docs-nav-container {
    background: var(--sidebar-background);
    position: fixed;
    bottom: 0;
    right: 0;
    top: 0;
    margin-right: -999px;
    padding-right: 999px;
    transform: translateX(80vw);
    transition: transform 200ms ease;
    z-index: 4;
  }

  .expanded .docs-nav-container {
    transform: none;
  }

  .docs-nav-container ul {
    list-style: none;
  }

  .docs-nav-container nav {
    width: 75vw;
    padding: 0 3rem 4rem 3rem;
    height: 100%;
    -webkit-overflow-scrolling: touch;
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

  @media (min-width: 1024px) {
    .docs-nav-container {
      transform: none;
      right: auto;
      border-left: 1px solid rgba(0, 0, 0, .02);
      top: calc(var(--header-height));
    }

    .docs-nav-container nav {
      width: var(--sidebar-width);
      border-right: 1px solid rgba(0, 0, 0, .05);
    }

    .docs-nav {
      width: var(--sidebar-width);
    }
  }
</style>
