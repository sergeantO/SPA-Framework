import { FWComponent } from "FW/index"

class AppComponent extends FWComponent {
  constructor(config){
    super(config)
  }

}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>
  `
})