import { Module as FWModule } from './core/module'
import { Component as FWComponent } from './core/component/component'
import { bootstrap } from './core/functions/bootstrap'
import { Directive as FWDirective } from './core/directives/directive'
import { _ } from './tools/util'
import { $ } from './tools/dom'
import { router } from './core/routing/router'
import { EventEmitter } from './tools/event-emitter'

export {
  FWModule,
  FWComponent,
  FWDirective,
  EventEmitter,
  bootstrap,
  _,
  $,
  router,
  
}