import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security/security.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ProfileComponent, data: { title: extract('Profile') },
    children: [
      { path: 'security', component: SecurityComponent, data: { title: extract('security') }},
      { path: 'help', component: HelpComponent, data: { title: extract('Help') }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule { }
