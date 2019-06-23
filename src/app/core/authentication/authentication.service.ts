import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Credentials, CredentialsService } from './credentials.service';


export interface LoginContext {
  email: string;
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
    let _context = Object.assign({}, context);
    delete _context.remember;

    var promise = new Promise<Credentials>((resolve, reject) => {
      this.httpClient.disableToken().post('/auth', _context).toPromise().then(
        result => {
          let _t = this.credentialsService.decodeToken(result['token']);
          let _credentials: Credentials = {id: _t.id, alias: _t.alias, email: _t.email, token: result['token']};
          this.credentialsService.setCredentials(_credentials, context.remember);
          resolve(_credentials);
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
  loginMirror(pattern: number): Promise<Credentials> {
    var promise = new Promise<Credentials>((resolve, reject) => {
      this.httpClient.disableToken().post('/auth-mirror', pattern).toPromise().then(
        result => {
          let _t = this.credentialsService.decodeToken(result['token']);
          let _credentials: Credentials = {id: _t.id, alias: _t.alias, email: _t.email, token: result['token']};
          this.credentialsService.setCredentials(_credentials, true);
          resolve(_credentials);
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
    this.credentialsService.setCredentials();
    return of(true);
  }

}
