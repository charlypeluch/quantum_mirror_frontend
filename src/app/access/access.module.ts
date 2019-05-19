import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared';
import { MaterialModule } from '../material.module';
import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AccessRoutingModule
  ],
  declarations: [
    AccessComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [AccessRoutingModule],
  bootstrap: [AccessComponent]
})
export class AccessModule { }
