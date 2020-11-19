import { appComponent } from "./app.component";
import { appHeader } from "./common/header";
import { appRoutes } from './app.routes'

const { FWModule } = require("../framework");

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
  routes: appRoutes
})