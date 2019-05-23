import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CredentialsService } from '../../core/authentication/credentials.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) { }

  getUserProfile(): Promise<any> {
    let _credentials = this.credentialsService.credentials;

    return this.httpClient.get('/users/'+_credentials.id).toPromise();
  }
}
