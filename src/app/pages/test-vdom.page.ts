import { componentConfig, FWComponent, vdom } from "FW/index"

class VdomPageComponent extends FWComponent {
  constructor(config: componentConfig) {
    super(config)
  }

  data = {
    title: "Наведи на меня",
    subtitle: "все работает"
  }
}

export const vdomPageComponent = new VdomPageComponent({
  selector: 'app-vdom-page',
  vtemplate: `
    #row1 .row 
      .col .s6 .offset-s3 .home__block
        h2 appHover="red" > {{ title }}
        h3 > {{ subtitle }}
      .row
        .col .s6 .offset-s3 .home__block
          .red-div
            p > Я красный блок 

  `,
  styles: `
    .red-div {
      background-color: red;
      height: 150px;
    }
  `,
})