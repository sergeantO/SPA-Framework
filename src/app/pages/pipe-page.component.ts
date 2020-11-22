import { FWComponent } from "FW/index"

class PipePageComponent extends FWComponent {
  constructor(config) {
    super(config)

    this.data = {
      num: 10
    }
  }
}

export const pipePageComponent = new PipePageComponent({
  selector: 'app-pipe-page',
  template: `
    <div class="row">
      <div class="col s6 offset-s3 home__block">
        <h2>{{ num }}</h2>
        <h2>{{ num | pow }}</h2>
      </div>
    </div>
  `,
  styles: `
  `
})