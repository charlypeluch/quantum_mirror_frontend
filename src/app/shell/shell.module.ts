import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { MomentModule } from 'ngx-moment';

import { DashboardSidenavComponent } from '@app/dashboard/dashboard-sidenav/dashboard-sidenav.component';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    MomentModule,
    RouterModule,
  ],
  declarations: [
    DashboardSidenavComponent,
    ShellComponent
  ],
})
export class ShellModule {
}
