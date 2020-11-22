import { $ } from '../../tools/dom'
import { _ } from '../../tools/util'
import { Pipe } from './pipe';
import { pipesFacrory } from './pipes-factory'

export function initPipes(pipes: Pipe[]) {
  if ( _.isUndefined(pipes) ) return

  pipes.forEach( pipe => pipesFacrory.registerPipe(pipe) );
}