import { _ } from './util'

class DOMManipulator {
  isWFM: boolean
  elem: HTMLElement
  
  constructor(el) {
    if ( _.isString(el) ) {
      el = document.querySelector(el)
    }
    this.elem = el
    this.isWFM = true
  }

  get(): HTMLElement {
    return this.elem
  }

  on(eventName: string, func, context = null) {
    func = func.bind(context)
    this.elem.addEventListener(eventName, func)

    return this
  }

  off(eventName: string, func): DOMManipulator {
    this.elem.removeEventListener(eventName, func)

    return this
  }

  css (styles: string) {
    if (_.isUndefined(styles)) return this.elem.style

    Object.keys(styles).forEach(key => {
      this.elem.style[key] = styles[key]
    })

    return this
  }

  addClass (className: string): DOMManipulator {
    this.elem.classList.add(className)
    return this
  }

  removeClass(className: string): DOMManipulator {
    this.elem.classList.remove(className)
    return this
  }

  hasClass (className: string): boolean {
    return this.elem.classList.contains(className)
  }

  html(html): DOMManipulator{
    if (html.isWFM) html = html.elem.innerHTML
    this.elem.innerHTML = html
    return this
  }

  append(el): DOMManipulator {
    if (el.isWFM) el = el.elem
    this.elem.appendChild(el)
    return this
  }

  parent (): DOMManipulator {
    return $(this.elem.parentNode)
  }

  attr(name: string, value: string = null) {
    if ( _.isNull(value) ) {
      return this.elem.getAttribute(name)
    }

    this.elem.setAttribute(name, value)
    return this
  }

  find(selector: string): DOMManipulator {
    return $( this.elem.querySelector(selector) )
  }

  findAll(selector: string): DOMManipulator[] {
    return Array.from( this.elem.querySelectorAll(selector) ).map(e => $(e))
  }
}

export function $(el: string | (Node & ParentNode)) {
  return new DOMManipulator(el)
}