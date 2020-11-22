import { appModule } from './app/app.module'
import { bootstrap, _ } from 'FW/index'

_.delay().then(()=>{
  bootstrap(appModule)
})
