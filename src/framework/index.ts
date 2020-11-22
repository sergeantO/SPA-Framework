import { Module as FWModule, moduleConfig } from './core/module'
import { Component as FWComponent, componentConfig } from './core/component/component'
import { bootstrap } from './core/functions/bootstrap'
import { Directive as FWDirective, directiveConfig } from './core/directives/directive'
import { _ } from './tools/util'
import { $ } from './tools/dom'
import { router } from './core/routing/router'
import { EventEmitter } from './tools/event-emitter'
import { http } from './tools/http'
import { Pipe as FWPipe, pipeConfig } from './core/pipes/pipe'

export {
  FWModule,
  FWComponent,
  FWDirective,
  EventEmitter,
  FWPipe,
  bootstrap,
  $,
  _,
  router,
  http,

  moduleConfig,
  componentConfig,
  directiveConfig,
  pipeConfig
}