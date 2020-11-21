import { router } from './routing/router'
import { _ } from '../tools/util'
import { renderComponent } from './component/render-component'
import { RoutingModule } from './routing/routing.module'
import { initDirectives } from "./directives/initDirectives"
import { EventEmitter } from '../tools/event-emitter'
import { initPipes } from './pipes/init-pipes'

export class Module {
  constructor  (config) {
    this.components = config.components
    this.bootstrapComponent = config.bootstrap
    this.routes = config.routes
    this.directives = config.directives
    this.pipes = config.pipes 

    this.dispatcher = new EventEmitter()
  }

  start () {
    initPipes(this.pipes)
    initComponents(this.bootstrapComponent, this.components)
    initRouting(this.routes, this.dispatcher)
    initDirectives(this.directives)

    this.dispatcher.on('routing.change-page', () => {
      initDirectives(this.directives)
    })
  }
}

function initComponents(bootstrap, components) {
  if ( _.isUndefined(bootstrap) ) {
    throw new Error('Bootstrap component is not defined')
  }
  
  [bootstrap, ...components].forEach( renderComponent )
}

function initRouting(routes, dispatcher) {
  if ( _.isUndefined(routes) ) return

  let routing = new RoutingModule(routes, dispatcher)
  routing.init()
}