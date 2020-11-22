import { homePageComponent } from './pages/home-page.component'
import { tabsPageComponent } from './pages/tabs-page.component'
import { notFound } from './common/not-found.component'
import { directivePageComponent } from './pages/directive-page.component'
import { pipePageComponent } from './pages/pipe-page.component'
import { routeType } from 'FW/core/routing/routing.module'
import { vdomPageComponent } from './pages/test-vdom.page'

export const appRoutes: routeType[] = [
  { path: '', component: homePageComponent },
  { path: 'tabs', component: tabsPageComponent },
  { path: 'directive', component: directivePageComponent }, 
  { path: 'pipe', component: pipePageComponent }, 
  { path: 'vdom', component: vdomPageComponent},
  { path: '**', component: notFound },
]