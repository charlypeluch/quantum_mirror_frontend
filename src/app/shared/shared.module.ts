import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { ThemeService } from './services/theme.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ],
  providers: [
    UserService,
    LoaderService,
    ThemeService,
    NotificationService
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
