import { _ } from '../../tools/util'
import { $ } from '../../tools/dom'
import { pipesFacrory } from '../pipes/pipes-factory'

export class Component {
 constructor (config) {
  this.template= config.template
  this.selector = config.selector
  this.styles = config.styles
  this.el = null
 }

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

function compileTemplate(template, data) {
  if ( _.isUndefined(data) ) return template

  let regex = /\{{(.*?)}}/g

  template = template.replace(regex, (str, d) => {
    let key = d.trim()
    let pipe

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

function initStyles (styles) {
  if ( _.isUndefined(styles) ) return

  let style = document.createElement('style')
  style.innerHTML = styles
  document.head.appendChild(style)
}

function hasPipe(key) {
  return key.includes('|')
}

function getKeyFromPipe(key) {
  return key.split('|')[0].trim()
}

function  parsePipe(key) {
  let pipe = key.split('|')[1].trim() 

  if ( !pipe.includes(':') ) return { name: pipe, args: [] }

  let pipeData = pipe.split(':')
  return {
    name: pipeData[0],
    args: pipeData.slice(1)
  }
}

function aplyPipe( pipeData, value ) {
  let pipe = pipesFacrory.getPipe( pipeData.name )

  if ( _.isUndefined(pipe) ) throw new Error(`Pipe ${pipeData.name} wasn't found`)

  return pipe.transform(value, ...pipeData.args)
}