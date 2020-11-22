import { FWComponent, router, http } from "FW/index"

class HomePageComponent extends FWComponent {
  constructor(config) {
    super(config)

    this.data = {
      title: 'Главная страница работает!!!',
      ip: 'Loading...'
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

  afterRender() {
    http.get('https://api.ipify.org?format=json')
      .then( ({ ip }) => {
        this.data.ip = ip
        this.render()
      })
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
            <p>{{ ip }}</p>
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