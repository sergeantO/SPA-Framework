import { FWComponent, $ } from "FW/index"


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
    let $target  = $(target)
     
    if ( !$target.hasClass('collapsible-header') ) return

    let childs: Element[] = Array.from ( $target.parent().parent().get().children )

    for (let child of childs) {
      let $child = $(child)
      if ( $child.hasClass('active') )
        $child.removeClass('active')
    }

    $target.parent().addClass('active')
  }
}

export const tabsPageComponent = new TabsPageComponent({
  selector: 'app-tabs-page',
  template: `
  <div class="row row-tab">
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
  `,
  vtemplate: `
  .row .row-tab
    .s6 .offset-s3
      ul .collapsible .popout
        li
          .collapsible-header  
            i .material-icons > filter_drama 
            span > First
          .collapsible-body  
            span > Lorem ipsum dolor sit amet.
        li
          .collapsible-header 
            i .material-icons > place 
            span > Second
          .collapsible-body 
            span > Lorem ipsum dolor sit amet.
        li
          .collapsible-header 
            i .material-icons > whatshot 
            span > Third
          .collapsible-body 
            span > Lorem ipsum dolor sit amet.
  `,
  styles: `
    .row-tab { margin-top: 30px }
    
    .collapsible li.active .collapsible-body {
      display: block;
    }
  `


})