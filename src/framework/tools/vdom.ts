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

  constructor(level, tag, id, classes = [], other = [], content) {
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

function parseLine(line: string): DomElem|undefined {
  let level = spacesBeforeFirstCharacter(line)
  line = line.trim()
  if (line.length === 0) return
  if ( isComment(line) ) return

  let { tag, id, classes, other, content, childs } = getData(line)
  let elem = new DomElem(level, tag, id, classes, other, content)
  if ( !_.isUndefined(childs) ) 
    elem.addChilds(childs)
  

  return elem 
}

function getData(str: string) {
  let pttrn = /^(?<tag>[^.|#|>|\[|\s]+)?\s*(?<params>[^\[|>]+)?\s*((\[(?<array>((.+,)*.+))\])|(>(?<content>[^\[]+)))?/
  let match = str.match(pttrn)
  if (match) {
    let tag = match.groups.tag || "div"
    let content = match.groups.content
    let childs = getChilds(match.groups.array) || []
    let classes = getClasses(match.groups.params) || []
    let other = getOther(match.groups.params) || []
    let id = getID(match.groups.params)

    return { tag, id, classes, other, content, childs }
  }
}

function getChilds(childs: string) {
  if ( _.isUndefined(childs) ) return 
  return childs.split(',')
    .map( child => parseLine( child.trim() ) )
}

function getClasses(params: string) {
  if ( _.isUndefined(params) ) return
  return params.split(' ')
    .filter( param => isClass(param) )
    .map( clas => clas.slice(1))
}

function getID(params: string) {
  if ( _.isUndefined(params) ) return
  let IDs = params.split(' ').filter( param => isID(param) )
  if (IDs.length === 1) return IDs[0].slice(1)
  if (IDs.length > 1) throw new Error('Узел может содержать только 1 id')
}

function getOther(params: string) {
  if ( _.isUndefined(params) ) return
  return params.split(' ').filter( param => !isID(param) && !isClass(param) && param.length>0 )
}

function isClass(param: string): boolean {
  return param[0] === '.'
}

function isID(param: string): boolean {
  return param[0] === '#'
}

function isComment(str: string): boolean {
  let pttrn = /\s*\/\//;
  return pttrn.test(str); 
}

function spacesBeforeFirstCharacter(str: string): number {
  let pttrn = /^\s*/;
  return str.match(pttrn)[0].length;
}