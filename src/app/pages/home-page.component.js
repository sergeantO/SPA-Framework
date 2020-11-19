const { FWComponent } = require("../../framework");

class HomePageComponent extends FWComponent {
  constructor(config) {
    super(config)
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
    <div class="row">
      <div class="col s6 offset-s3" style="margin-top: 40px">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Главная страница</span>
            <p>пусто</p>
          </div>
          <div class="card-action">
            <a href="#">Другая страница</a>
          </div>
        </div>
      </div>
    </div>
  `
})