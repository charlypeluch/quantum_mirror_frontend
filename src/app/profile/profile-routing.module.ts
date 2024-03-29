import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security/security.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HelpComponent } from './help/help.component';

import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ProfileComponent, data: { title: extract('Profile') }, resolve: { userProfile: ProfileResolver },
    children: [
      { path: 'security', component: SecurityComponent, data: { title: extract('Security') }},
      { path: 'configuration', component: ConfigurationComponent, data: { title: extract('Configuration') }},
      { path: 'help', component: HelpComponent, data: { title: extract('Help') }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileResolver]
})
export class ProfileRoutingModule { }
