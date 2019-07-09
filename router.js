import Vue from 'vue'
import Router from 'vue-router'
import { routes } from 'dimer-vue'
import * as mToString from 'mdast-util-to-string'

import LayoutComponent from '~/components/Layout'
import DocComponent from '~/components/Doc'

Vue.use(Router)

DocComponent.pageOptions = {
  scrollToTop: true,
  head () {
    let description = this.doc.seoSummary

    /**
     * Set description as text from the first paragraph when `seoSummary`
     * is missing.
     */
    if (!description) {
      const firstP = this.doc.content.children.find((node) => node.tag === 'p')
      if (firstP) {
        description = mToString(firstP)
      }
    }

    return {
      title: this.doc.title,
      meta: [
        { hid: 'description', name: 'description', content: description },
      ],
    }
  }
}

export function createRouter (ssrContext, createDefaultRouter) {
  const defaultRouter = createDefaultRouter(ssrContext)

  return new Router({
    ...defaultRouter.options,
    routes: defaultRouter.options.routes.concat(routes(LayoutComponent, DocComponent))
  })
}
