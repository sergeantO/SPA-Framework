import { FWComponent, router } from "FW"

class DirectivePageComponent extends FWComponent {
  constructor(config) {
    super(config)

    this.data = {
    }
  }
}

export const directivePageComponent = new DirectivePageComponent({
  selector: 'app-directive-page',
  template: `
    <div class="row">
      <div class="col s6 offset-s3 home__block">
        <h2 appHover="red">Наведи на меня</h2>
      </div>
    </div>
  `,
  styles: `
  `
})