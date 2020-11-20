import { FWComponent, router } from "FW"

class HomePageComponent extends FWComponent {
  constructor(config) {
    super(config)

    this.data = {
      title: 'Главна страница работает!!!'
    }
  }

  goToTabs (event) {
    event.preventDefault()
    router.navigate('tabs')
  }

  events () {
    return {
      'click .link': 'goToTabs'
    }
  }

  onInit () {
    console.log('init')
  }

  afterRender() {
    console.log('after init')
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
    <div class="row">
      <div class="col s6 offset-s3 home__block">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title"> {{ title }} </span>
            <p>пусто</p>
          </div>
          <div class="card-action">
            <a href="#" class="link">Другая страница</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .home__block {
      margin-top: 40px;
    }
  `
})