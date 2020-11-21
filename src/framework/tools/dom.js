import { _ } from './util'

class DOMManipulator {
  constructor(el) {
    if ( _.isString(el) ) {
      el = document.querySelector(el)
    }
    this.elem = el
    this.isWFM = true
  }

  get() {
    return this.elem
  }

  on(eventName, func, context = null) {
    func = func.bind(context)
    this.elem.addEventListener(eventName, func)

    return this
  }

  off(eventName, func) {
    this.elem.removeEventListener(eventName, func)

    return this
  }

  css (styles) {
    if (_.isUndefined(styles)) return this.elem.style

    Object.keys(styles).forEach(key => {
      this.elem.style[key] = styles[key]
    })

    return this
  }

  addClass (className) {
    this.elem.classList.add(className)
    return this
  }

  removeClass(className) {
    this.elem.classList.remove(className)
    return this
  }

  hasClass (className) {
    return this.elem.classList.contains(className)
  }

  html(html){
    if (html.isWFM) html = html.elem.innerHTML
    this.elem.innerHTML = html
    return this
  }

  append(el) {
    if (el.isWFM) el = el.elem
    this.elem.appendChild(el)
    return this
  }

  parent () {
    return $(this.elem.parentNode)
  }

  attr(name, value = null) {
    if ( _.isNull(value) ) {
      return this.elem.getAttribute(name)
    }

    this.elem.setAttribute(name, value)
    return this
  }

  find(selector) {
    return $( this.elem.querySelector(selector) )
  }

  findAll(selector) {
    return Array.from( this.elem.querySelectorAll(selector) ).map(e => $(e))
  }
}

export function $(el) {
  return new DOMManipulator(el)
}