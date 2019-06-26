import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SecurityComponent } from './security/security.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    SecurityComponent,
    ConfigurationComponent,
    HelpComponent,
  ],
  providers: []
})
export class ProfileModule { }
