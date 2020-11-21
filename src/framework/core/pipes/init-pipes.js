import { $ } from '../../tools/dom'
import { _ } from '../../tools/util'
import { pipesFacrory } from './pipes-factory'

export function initPipes(pipes) {
  if ( _.isUndefined(pipes) ) return

  pipes.forEach( pipe => pipesFacrory.registerPipe(pipe) );
}