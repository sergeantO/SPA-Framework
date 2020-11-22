export type pipeConfig = {
  name: string,
  transform: <T>(value: T, data: any) => T
}

export class Pipe {
  name: string
  transform: <T>(value: T, ...data: any) => T

  constructor(config: pipeConfig) {
    this.name = config.name
    this.transform = config.transform
  }
}