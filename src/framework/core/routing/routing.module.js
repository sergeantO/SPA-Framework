import { router } from './router'
import { _ } from '../../tools/util'
import { renderComponent } from '../component/render-component'

export class RoutingModule {
  constructor(routes) {
    this.routes = routes
  }

  init() {
    window.addEventListener('hashchange', renderRoute.bind(this) )
    renderRoute.call(this)
  }
}

function renderRoute() {
  let url = router.getUrl()
  let route = this.routes.find(r => r.path === url)

  if ( _.isUndefined(route) ) {
    route = this.routes.find(r => r.path === '**')
  }

  $('router-outlet').html( `<${route.component.selector}></${route.component.selector}>`)
  renderComponent( route.component )
}