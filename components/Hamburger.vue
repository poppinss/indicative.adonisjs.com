<template>
  <div class="hamburger" @click.prevent="$emit('onHamburgerClick')" :class="{ expanded }">
    <span class="hamburger-top-bun"></span>
    <span class="hamburger-bottom-bun"></span>
  </div>
</template>

<script>
  export default {
    props: ['onHamburgerClick', 'expanded']
  }
</script>

<style scoped>
  .hamburger {
    height: 48px;
    width: 18px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-top: -24px;
    right: 0;
  }

  .hamburger span {
    height: 2px;
    width: 17px;
    background-color: #fff;
    border-radius: 1.3px;
    position: absolute;
    transition: transform .25s;
    transform: rotate(0);
  }

  .hamburger span.hamburger-top-bun {
    top: 23px;
    transform: translateY(-5px);
  }

  .hamburger span.hamburger-bottom-bun {
    bottom: 23px;
    transform: translateY(5px);
  }

  .hamburger.expanded span.hamburger-top-bun {
    transform: rotate(45deg) translateY(0);
  }

  .hamburger.expanded span.hamburger-bottom-bun {
    transform: rotate(-45deg) translateY(0);
  }

  @media (min-width: 1024px) {
    .hamburger {
      display: none;
    }
  }
</style>
