import { _ } from './util'

export class EventEmitter {
  listeners: { [key: string]: Function[] }

  constructor() {
    this.listeners = {}
  }

  on ( eventName: string, func: Function ) {
    if ( _.isUndefined(this.listeners[eventName]) ) this.listeners[eventName] = []

    this.listeners[eventName].push(func)
  }

  emit ( eventName: string, data ) {
    if ( _.isUndefined(this.listeners[eventName]) ) return

    this.listeners[eventName].forEach( f => f(data) );
  }
}