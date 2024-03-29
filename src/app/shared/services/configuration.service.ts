import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NotificationService } from './notification.service';

@Injectable()
export class ConfigurationService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) {}

  getUserConfigurations(): Promise<any> {
    return this.httpClient.get('/configurations/user').toPromise();
  }

  postUserConfiguration(configuration): Promise<any> {
    return this.httpClient.post('/configurations', configuration).toPromise();
  }

  deleteUserConfiguration(configurationId): Promise<any> {
    return this.httpClient.delete('/configurations/'+configurationId).toPromise();
  }

  // getMirrorUsers(mirrorId:number): Promise<any> {
  //   return this.httpClient.get('/mirrors/'+mirrorId+'/users').toPromise();
  // }
  //
  // assignUserMirror(data:string): Promise<any> {
  //   let _data = {'code': data}
  //   let _promise = this.httpClient.post('/user/mirrors', _data).toPromise();
  //
  //   _promise.then(
  //     r => this.notificationService.openNotification('Assigned correctly', 'Accept'),
  //     e => this.notificationService.openNotification(e.error.error.message, 'Accept')
  //   );
  //
  //   return _promise;
  // }
  //
  // unassignUserMirror(mirrorId:number): Promise<any> {
  //   let _promise = this.httpClient.delete('/user/mirrors/'+mirrorId).toPromise();
  //
  //   _promise.then(
  //     r => this.notificationService.openNotification('Unassigned correctly', 'Accept'),
  //     e => this.notificationService.openNotification(e.error.error.message, 'Accept')
  //   );
  //
  //   return _promise;
  // }
}
