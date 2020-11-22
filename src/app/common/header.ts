import { FWComponent } from "FW/index"

class AppHeader extends FWComponent {
  constructor (config) {
    super(config)
  }


}

export const appHeader = new AppHeader({
  selector: 'app-header',
  template: `
    <nav class="indigo">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo header__logo">FW SPA</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">Главная</a></li>
          <li><a href="#tabs">Табы</a></li>
          <li><a href="#directive">Директивы</a></li>
          <li><a href="#pipe">Пайпы</a></li>
          <li><a href="#vdom">vdom</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: `
    .header__logo {
      margin-left: 20px
    }
  `
})

