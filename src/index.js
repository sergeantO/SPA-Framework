import { appModule } from './app/app.module'
import { bootstrap } from './framework/core/bootstrap'
import { wfm } from './framework/index'

wfm.delay().then(()=>{
  bootstrap(appModule)
})
