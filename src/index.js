import { appModule } from './app/app.module'
import { bootstrap, _ } from 'FW'

_.delay().then(()=>{
  bootstrap(appModule)
})
