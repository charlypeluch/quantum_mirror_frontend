import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared';
import { MaterialModule } from '../material.module';
import { QuantumRoutingModule } from './quantum-routing.module';
import { QuantumComponent } from './quantum.component';
import { QuantumAccessComponent } from './quantum-access/quantum-access.component';
import { QuantumDashboardComponent } from './quantum-dashboard/quantum-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    QuantumRoutingModule
  ],
  declarations: [
    QuantumComponent,
    QuantumAccessComponent,
    QuantumDashboardComponent
  ],
  exports: [QuantumRoutingModule],
  bootstrap: [QuantumComponent]
})
export class QuantumModule { }
