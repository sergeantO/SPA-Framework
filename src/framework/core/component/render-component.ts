import { _ } from "../../tools/util"
import { Component } from "./component"

export function renderComponent(c: Component) {
  if ( !_.isUndefined(c.onInit) ) c.onInit()

  c.render()
  
  if ( !_.isUndefined(c.afterRender) ) c.afterRender()
}