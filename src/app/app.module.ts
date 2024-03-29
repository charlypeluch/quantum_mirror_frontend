import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';


import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShellModule } from './shell/shell.module';
import { AccessModule } from './access/access.module';
import { QuantumModule } from './quantum/quantum.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    DashboardModule,
    AccessModule,
    QuantumModule,
    BrowserAnimationsModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
