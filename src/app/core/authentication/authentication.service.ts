import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Credentials, CredentialsService } from './credentials.service';


export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  alias: string;
  email: string;
  password: string;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private credentialsService: CredentialsService) { }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Promise<Credentials> {
    // Replace by proper authentication call
    let authData = {
      email: context.username,
      password: context.password
    };

    var promise = new Promise<Credentials>((resolve, reject) => {
      this.httpClient.disableToken().post('/auth', authData).toPromise().then(
        result => {
          let _t = this.credentialsService.decodeToken(result['token']);
          let _credentials: Credentials = {username: _t.alias, token: result['token']};
          this.credentialsService.setCredentials(_credentials, context.remember);
          resolve({username: _t.alias, token: result['token']});
        },
        () => {
          reject();
        }
      )
    });
    return promise;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  register(context: RegisterContext): Promise<boolean> {

    var promise = new Promise<boolean>((resolve, reject) => {
      this.httpClient.disableToken().post('/users', context).toPromise().then(
        result => {
          resolve(true);
        },
        () => {
          reject();
        }
      )
    });
    return promise;
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

}
