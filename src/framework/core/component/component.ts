import { _ } from '../../tools/util'
import { $ } from '../../tools/dom'
import { pipesFacrory } from '../pipes/pipes-factory'
import { vdom } from 'FW/index'

export type componentConfig = {
  template?: string
  vtemplate?: string
  selector: string
  styles: string
}

export class Component {
  template: string
  selector: string
  styles: string
  el: any
  data: { [key:string]: any }
 
 constructor (config: componentConfig) {
  if ( !_.isUndefined(config.vtemplate) ) {
    this.template = vdom(config.vtemplate)
  } else if ( !_.isUndefined(config.template) ) {
    this.template = config.template
  } else {
    throw new Error (`Component ${config.selector} hasn't template`)
  }
  
  this.selector = config.selector
  this.styles = config.styles
  this.el = null
 }

 afterRender() {}
  onInit() {}

 render () {

   initStyles(this.styles)

   this.el = $(this.selector)
   if (!this.el) throw new Error(`Component with selector ${this.selector} wasn't found`)
   
   this.el.html( compileTemplate(this.template, this.data) ) 

   initEvents.call(this)

 }

}

function initEvents() {

  if ( _.isUndefined(this.events) ) return 

  let events = this.events()

  Object.keys(events).forEach(key => {
    let listener = key.split(' ')

    this.el
      .find( listener[1] )
      .on( listener[0], this[ events[key] ].bind(this) )
  })

}

function compileTemplate(template: string, data: { [key:string]: any }): string {
  if ( _.isUndefined(data) ) return template

  let regex = /\{{(.*?)}}/g

  template = template.replace(regex, (str, d) => {
    let key: string = d.trim()
    let pipe: pipeData

    if ( hasPipe(key) ) {
      pipe = parsePipe(key)
      key = getKeyFromPipe(key)
    }
    
    if ( _.isUndefined(pipe) ) {
      return data[key]
    }

    return aplyPipe( pipe, data[key] )
  })

  return template
}

function initStyles (styles: string) {
  if ( _.isUndefined(styles) ) return

  let style = document.createElement('style')
  style.innerHTML = styles
  document.head.appendChild(style)
}

function hasPipe(key: string) {
  return key.includes('|')
}

function getKeyFromPipe(key: string) {
  return key.split('|')[0].trim()
}

type pipeData = {
  name: string;
  args: any[];
}

function  parsePipe(key: string) : pipeData {
  let pipe = key.split('|')[1].trim() 

  if ( !pipe.includes(':') ) return { name: pipe, args: [] }

  let pipeData = pipe.split(':')
  return {
    name: pipeData[0],
    args: pipeData.slice(1)
  }
}

function aplyPipe( pipeData: pipeData, value ) {
  let pipe = pipesFacrory.getPipe( pipeData.name )

  if ( _.isUndefined(pipe) ) throw new Error(`Pipe ${pipeData.name} wasn't found`)

  return pipe.transform(value, ...pipeData.args)
}