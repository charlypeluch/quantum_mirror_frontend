import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NotificationService } from './notification.service';

@Injectable()
export class ModulesService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) {}

  getModules(): Promise<any> {
    return this.httpClient.get('/modules').toPromise();
  }
}
