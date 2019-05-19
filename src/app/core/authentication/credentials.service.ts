import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface Credentials {
  username: string;
  token: string;
}

export interface TokenData {
  id: number,
  email: string,
  alias: string,
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable()
export class CredentialsService {
  private jwt: JwtHelperService = new JwtHelperService();

  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  // [Token Management]

  /**
   * Checks is the token is expired.
   * @return True if the token is not expired.
   */
  isTokenExpired(): boolean {
    return this.jwt.isTokenExpired(this._credentials.token);
  }

  /**
   * Gets the user credentials token.
   * @return The user credentials token or null if the user is not authenticated.
   */
  getToken(): string | null {
    return this._credentials.token;
  }

  decodeToken(token:string = undefined): TokenData | null {
    if (token)
      return this.jwt.decodeToken(token);

    return this.jwt.decodeToken(this._credentials.token);
  }

}
