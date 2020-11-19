const { FWComponent } = require("../../framework");

class NotFound extends FWComponent {
  constructor (config) {
    super(config)
  }


}

export const notFound = new NotFound({
  selector: 'app-not-found',
  template: `
    <div style="display: flex; align-items: center; justify-content: center">
      <div>
        <h1>Страница не найдена</h1>
        <a href="#">На главную</a>
      </div>  
    </div>
  `
})

