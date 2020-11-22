import { FWPipe } from "FW/index"

class AppPowPipe extends FWPipe {
  constructor(config){
    super(config)
  }
}

export const appPowPipe = new AppPowPipe({
  name: 'pow',
  transform(value: number, number = 2) {
    return Math.pow(value, number)
  }
})