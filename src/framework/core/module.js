import { router } from './routing/router'
import { _ } from '../tools/util'
import { renderComponent } from './component/render-component'
import { RoutingModule } from './routing/routing.module'


export class Module {
  constructor  (config) {
    this.components = config.components
    this.bootstrapComponent = config.bootstrap
    this.routes = config.routes
  }

  start () {
    initComponents(this.bootstrapComponent, this.components)
    initRouting(this.routes)
  }
}

function initComponents(bootstrap, components) {
  if ( _.isUndefined(bootstrap) ) throw new Error('Bootstrap component is not defined')

  // [ bootstrap, ...components ].forEach( renderComponent )
  bootstrap.render()
  components.forEach( renderComponent );
}

function initRouting(routes) {
  if ( _.isUndefined(routes) ) return

  let routing = new RoutingModule(routes)
  routing.init()
}