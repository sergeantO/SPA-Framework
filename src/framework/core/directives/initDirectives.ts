import { _ } from '../../tools/util'
import { Directive } from './directive';

export function initDirectives(directives: Directive[]) {
  if ( _.isUndefined(directives) ) return

  directives.forEach( d => d.init() );
}