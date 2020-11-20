import { FWComponent } from "FW"


class TabsPageComponent extends FWComponent {
  constructor(config) {
    super(config)
  }

  events () {
    return {
      'click .collapsible': 'onTabClick'
    }
  }

  onTabClick ({target}) {
    if ( !target.classList.contains('collapsible-header') ) return

    let childs = target.parentNode.parentNode.children

    for (let child of childs) {
      if ( child.classList.contains('active') )
        child.classList.remove('active')
    }

    target.parentNode.classList.add('active')
  }
}

export const tabsPageComponent = new TabsPageComponent({
  selector: 'app-tabs-page',
  template: `
  <div class="row" style="margin-top: 30px">
    <div class="s6 offset-s3">
      <ul class="collapsible popout">
        <li>
          <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
          <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
        </li>
      </ul>
    </div>
  </div> 
  `
})