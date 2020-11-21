import { homePageComponent } from './pages/home-page.component'
import { tabsPageComponent } from './pages/tabs-page.component'
import { notFound } from './common/not-found.component'
import { directivePageComponent } from './pages/directive-page.component.js'
import { pipePageComponent } from './pages/pipe-page.component'

export const appRoutes = [
  { path: '', component: homePageComponent },
  { path: 'tabs', component: tabsPageComponent },
  { path: 'directive', component: directivePageComponent }, 
  { path: 'pipe', component: pipePageComponent },
  { path: '**', component: notFound },
]