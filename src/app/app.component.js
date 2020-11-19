const { FWComponent } = require("../framework");

class AppComponent extends FWComponent {

}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>
  `
})