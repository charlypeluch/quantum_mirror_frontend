import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DashboardDialog } from './dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardDialog,
  ],
  // exports: [DashboardSidenavComponent],
  entryComponents: [DashboardDialog],
  providers: []
})
export class DashboardModule { }
