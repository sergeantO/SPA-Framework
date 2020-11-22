import { FWComponent } from "FW/index"

class NotFound extends FWComponent {
  constructor (config) {
    super(config)
  }


}

export const notFound = new NotFound({
  selector: 'app-not-found',
  template: `
    <div class="not-found__block">
      <div>
        <h1>Страница не найдена</h1>
        <a href="#">На главную</a>
      </div>  
    </div>
  `,
  styles: `
    .not-found__block {
      display: flex; 
      align-items: center; 
      justify-content: center
    }
  `
})

