import { Pipe } from "./pipe"

class PipesFacrory {
  pipes: { [name: string]: Pipe }

  constructor () {
    this.pipes = {}
  }

  registerPipe(pipe: Pipe)  {
    this.pipes[pipe.name] = pipe
  }

  getPipe(name: string): Pipe {
    return this.pipes[name]
  }
}

export const pipesFacrory = new PipesFacrory()