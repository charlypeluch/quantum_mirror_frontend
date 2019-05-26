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

  patchtUserProfile(params:any): Promise<any> {
    let _credentials = this.credentialsService.credentials;

    return this.httpClient.patch('/users/'+_credentials.id, params).toPromise();
  }

  uploadUserProfileFacial(params:any): Promise<any> {
    let _credentials = this.credentialsService.credentials;
    let _formData = new FormData();
    _formData.append('facial', params.file);

    return this.httpClient.post('/users/facial/'+_credentials.id, _formData).toPromise();
  }
}
