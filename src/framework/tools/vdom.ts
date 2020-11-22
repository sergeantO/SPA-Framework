import { $ } from './dom'
import { _ } from './util';

export function vdom (str: string): string {
  let lines = str.split(/\r\n|\r|\n/);
  let elements = lines.map( line => { 
    let elem = parseLine(line)
      
    if ( !_.isUndefined(elem) ) {
      return elem 
    }
  }).filter( (el) => {
    return ( !_.isNull(el) && !_.isUndefined(el) )
  });

  let root: DomElem
  let currElem
  for (let element of elements) {
    if ( _.isString(element) ) {
      currElem.content = <String> element
      continue
    } 

    element = <DomElem>element

    if ( _.isUndefined(currElem) ) {
      root = element
      currElem = element
      continue
    }

    if ( element.level > currElem.level ) {
      element.parent = currElem
      currElem.childs.push(element)
      currElem = element
      continue
    }

    while (element.level < currElem.level) {
      currElem = currElem.parent
    }

    element.parent = currElem.parent
    currElem.parent.childs.push(element)
    currElem = element

  }

  return root.render()
}

class DomElem {
  childs: DomElem[] = []
  parent: DomElem
  classes: string[]
  id: string
  otherParam: string[]
  tag: string
  level: number
  content: string;

  constructor(level, tag, id, classes, other, content) {
    this.level = level
    this.tag = tag
    this.id = id
    this.classes = classes
    this.otherParam = other
    this.content = content
  }

  render() {
    let param = (this.id) ? `id="${this.id}" ` : ''
    param += (this.classes.length > 0) ? `class="${ this.classes.join(' ') }" ` : ''
    param += (this.otherParam.length > 0) ? this.otherParam.join(' ')  : ''

    let content = ( _.isUndefined(this.childs) ) ? '' : this.childs.map( child => child.render() ).join('')
    content += ( _.isUndefined(this.content) ) ? '' : this.content
    return `<${this.tag} ${param}>${ content }</${this.tag}>`
  }

}

function spacesBeforeFirstCharacter(str: string): number {
  let pttrn = /^\s*/;
  return str.match(pttrn)[0].length;
}

function parseLine(line: string): DomElem|undefined|string {
  let level = spacesBeforeFirstCharacter(line)
  if (level === 0) return

  line = line.trim()
  if (line.length === 0) return

  let content: string
  let lineArray = line.split('>') 
  if ( lineArray.length > 1 ){
    content = lineArray[1]
  }

  let tag: string
  lineArray = lineArray[0].trim().split(' ')
  if ( isClass(lineArray[0]) || isID(lineArray[0]) ) {
    tag = "div"
  } else {
    tag = lineArray.shift();
  }

  if ( tag === "" ){
    if ( !_.isUndefined(content) ) return content
    debugger
    throw new Error(`В шаблоне допущена ошибка: ${line}`)
  }

  let classes: string[] = []
  let other:string[] = []
  let id: string

  lineArray.forEach(param => {
    if ( isClass(param) ) {
      classes.push(param.slice(1))
      return
    } 

    if ( isID(param) ) {
      id = param.slice(1)
      return
    } 

    other.push(param)
  })

  return new DomElem(level, tag, id, classes, other, content)
}

function isClass(param: string) {
  return param[0] === '.'
}

function isID(param: string) {
  return param[0] === '#'
}