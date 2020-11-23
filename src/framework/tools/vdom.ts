import { $ } from './dom'
import { _ } from './util';

class DomElem {
  private childs: DomElem[] = []
  private parent: DomElem
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

  addChild(child: DomElem){
    child.parent = this
    this.childs.push(child)
  }

  addChilds(slaveElems: DomElem[]) {
    this.childs.push(...slaveElems)
  }

  getParent () {
    return this.parent
  }
}

export function vdom (str: string): string {
  let root: DomElem
  let lastElem: DomElem

  let lines = str.split(/\r\n|\r|\n/);
  for (let line of lines) {
    let element = parseLine(line)
    if ( _.isUndefined(element) ) 
      continue

    if ( _.isUndefined(lastElem) ) {
      root = element
      lastElem = element
      continue
    }

    if ( element.level > lastElem.level ) {
      lastElem.addChild(element)
      lastElem = element
      continue
    }

    while (element.level < lastElem.level) {
      lastElem = lastElem.getParent()
    }

    lastElem.getParent().addChild(element)
    lastElem = element
  }

  return root.render()
}

function spacesBeforeFirstCharacter(str: string): number {
  let pttrn = /^\s*/;
  return str.match(pttrn)[0].length;
}

function parseLine(line: string): DomElem|undefined {
  let level = spacesBeforeFirstCharacter(line)
  if (level === 0) return

  line = line.trim()
  if (line.length === 0) return
  if ( isComment(line) ) return

  let { master, slaves } = getArray(line)

  let content: string
  if ( _.isUndefined(slaves) ) {
    [line, content] = line.split('>')
  } else {
    line = master
  }

  let lineArray = line.trim().split(' ')
  let tag = ( isTag(lineArray[0]) ) ? lineArray.shift() : "div"

  let classes: string[] = []
  let other: string[] = []
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

  let elem = new DomElem(level, tag, id, classes, other, content)
  if ( !_.isUndefined(slaves) ) {
    let slaveElems = slaves.map( slave => parseLine(slave) ) 
    elem.addChilds(slaveElems)
  }
  return elem 
}

function isComment(str: string) {
  let pttrn = /\s*\/\//;
  return pttrn.test(str); 
}

function getArray(str: string) {
  let pttrn = /(?<master>.+)\[(?<array>.+)\]/;
  let match = str.match(pttrn)

  let slaves: string[], master: string
  if (match) {
    slaves = match.groups.array.split(',')
    master = match.groups.master
  }

  return { master, slaves }
}

function isClass(param: string) {
  return param[0] === '.'
}

function isID(param: string) {
  return param[0] === '#'
}

function isTag(param: string) {
  return !isClass(param) && !isID(param)
}