import Vue from 'vue'
import Router from 'vue-router'
import { routes } from 'dimer-vue'

import LayoutComponent from '~/components/Layout'
import DocComponent from '~/components/Doc'

Vue.use(Router)

DocComponent.pageOptions = {
  scrollToTop: true,
}

export function createRouter (ssrContext, createDefaultRouter) {
  const defaultRouter = createDefaultRouter(ssrContext)

  return new Router({
    ...defaultRouter.options,
    routes: defaultRouter.options.routes.concat(routes(LayoutComponent, DocComponent))
  })
}
