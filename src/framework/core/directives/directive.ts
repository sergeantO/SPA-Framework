import { $ } from '../../tools/dom'
import { _ } from '../../tools/util'

export type directiveConfig = {
  selector: string
  onInit: Function
}

export class Directive {
  selector: string
  onInit: Function

  constructor (config: directiveConfig) {
    this.selector = config.selector
    this.onInit = config.onInit
  }

  init() {
    let elems = $(document).findAll(this.selector)
    
    if ( !_.isUndefined(this.onInit) && !_.isEmpty(elems) ) {
      elems.forEach(e => {
        this.onInit(e, getParamValue(e, this.selector))
      })
    }
  }
}

function getParamValue(el, selector: string) {
  return el.attr( selector.slice(1).slice(0, selector.length-2) )
}