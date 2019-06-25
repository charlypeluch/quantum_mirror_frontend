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

import { QuantumDashboardService } from './quantum-dashboard/quantum-dashboard.service';

import { MomentModule } from 'ngx-moment';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    QuantumRoutingModule,
    MomentModule,
    AngularWeatherWidgetModule.forRoot({
      key: '02c5a2e26bfa702fb2d879b31ffe4477',
      name: WeatherApiName.OPEN_WEATHER_MAP,
      baseUrl: 'http://api.openweathermap.org/data/2.5'
    })
  ],
  declarations: [
    QuantumComponent,
    QuantumAccessComponent,
    QuantumDashboardComponent
  ],
  providers: [
    QuantumDashboardService
  ],
  exports: [QuantumRoutingModule],
  bootstrap: [QuantumComponent]
})
export class QuantumModule { }
