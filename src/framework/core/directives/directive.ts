import { $, DOMManipulatorType } from '../../tools/dom'
import { _ } from '../../tools/util'

export type directiveConfig = {
  selector: string
  onInit: (el: DOMManipulatorType, string) => void
}

export class Directive {
  selector: string
  onInit: (el: DOMManipulatorType, string) => void

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

function getParamValue(el: DOMManipulatorType, selector: string) {
  return el.attr( selector.slice(1).slice(0, selector.length-2) )
}