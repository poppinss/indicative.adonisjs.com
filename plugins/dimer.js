import Vue from 'vue'
import { Dimer, DimerTree, DimerTabs } from 'dimer-vue'
import ClientOnly from 'vue-client-only'

import Tabs from '~/components/Tabs'

export default async function (ctx, inject) {
  Dimer.use(DimerTree)
  Dimer.use(DimerTabs)

  Dimer.addRenderer(function (node, rerender, createElement) {
    if (node.tag === 'h1' || node.props.className && node.props.className.includes('toc-container')) {
      return false
    }

    if (node.props.className && node.props.className.includes('dimer-highlight')) {
      return createElement(ClientOnly, [
        createElement('div', { attrs: { class: 'dimer-highlight' } }, node.children.map(rerender))
      ])
    }

    if (node.props.className && node.props.className.indexOf('tabs') > -1) {
      return createElement(Tabs, { props: { node } })
    }
  })

  /**
   * Refetch docs content using Server side events. Dimer publish change events
   * on `__events` endpoint.
   */
  if (process.browser && ctx.app.$env.NODE_ENV === 'development' && window.EventSource) {
    const source = new window.EventSource(`${ctx.app.$env.DIMER_BASE_URL}/__events`)
    source.ctx = ctx

    source.addEventListener('reload', function (e) {
      this.ctx.app.router.replace({
        path: this.ctx.route.fullPath,
        query: { __sse: e.lastEventId },
      })
    }, false)
  }

  /**
   * Injects handful of utility methods and loads the vuex
   * store with `dimer` module.
   */
  await Dimer.loadStore(ctx, inject)
  Vue.use(Dimer)
}
