import { router } from './routing/router'
import { _ } from '../tools/util'
import { renderComponent } from './component/render-component'
import { RoutingModule } from './routing/routing.module'
import { initDirectives } from "./directives/initDirectives"
import { EventEmitter } from '../tools/event-emitter'
import { initPipes } from './pipes/init-pipes'
import { Pipe } from './pipes/pipe'
import { Component } from './component/component'
import { Directive } from './directives/directive'


export type moduleConfig = {
  components: Component[],
  bootstrap: Component,
  routes: { path: string, component: Component }[]
  directives: Directive[]
  pipes: Pipe[]
}

export class Module {
  components: Component[]
  bootstrapComponent: Component
  routes: { path: string; component: Component }[]
  directives: Directive[]
  pipes: Pipe[]
  dispatcher: EventEmitter

  constructor  (config: moduleConfig) {
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

function initComponents(bootstrap: Component, components: Component[]) {
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