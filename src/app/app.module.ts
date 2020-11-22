import { FWModule } from "FW/index"
import { appComponent } from "./app.component";
import { appHeader } from "./common/header";
import { appRoutes } from './app.routes'
import { appHoverDirective } from "./common/directives/hover.directive"
import { appPowPipe } from './common/pipes/pow.pipe'

class AppModule extends FWModule {
  constructor(config) {
    super(config)
  }

}

export const appModule = new AppModule({
  components: [
    appHeader
  ],
  bootstrap: appComponent,
  routes: appRoutes,
  directives: [
    appHoverDirective
  ],
  pipes: [
    appPowPipe
  ]
})