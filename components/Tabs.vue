<template>
  <dimer-tabs :node="node">
    <template slot-scope="tabs">
      <div class="tabs-head">
        <a
          v-for="(link, index) in tabs.links"
          @click.prevent="activeTab(index)"
          :class="{ active: index === activeIndex }"
          ref="tabs"
        >
          {{ link }}
        </a>
        <div class="highlighter" ref="tabHighlighter"></div>
      </div>

      <div class="tabs-body">
        <div
          v-for="(pane, index) in tabs.panes"
          v-show="index === activeIndex"
        >
          <dimer-tree :node="pane" />
        </div>
      </div>
    </template>
  </dimer-tabs>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: 0
      }
    },

    mounted () {
      this.activeTab(0)
    },

    methods: {
      activeTab (index) {
        this.activeIndex = index
        const activeTab = this.$refs.tabs[this.activeIndex]
        this.$refs.tabHighlighter.style.left = `${activeTab.offsetLeft}px`
        this.$refs.tabHighlighter.style.width = `${activeTab.offsetWidth}px`
      }
    },

    props: ['node']
  }
</script>

<style>
  .tabs-head {
    display: flex;
    background: hsl(202, 32%, 20%);
    color: hsl(202, 32%, 90%);
    border-radius: 6px 6px 0 0;
    font-family: var(--pre-font);
    font-size: 1.4rem;
    padding: 0 30px;
    position: relative;
  }

  .tabs-head a {
    font-weight: 600;
    color: hsl(202, 32%, 80%);
    padding: 10px 20px;
    cursor: pointer;
    opacity: 0.5;
  }

  .tabs-head a.active {
    opacity: 1;
  }

  .tabs-head .highlighter {
    position: absolute;
    background: #fff;
    height: 2px;
    bottom: 0;
    transition: left 200ms ease, width 100ms ease 20ms;
  }

  .wysiwyg .tabs-body .dimer-highlight .filename {
    display: none;
  }

  .wysiwyg .tabs-body .dimer-highlight {
    border-radius: 0 0 6px 6px;
  }
</style>
