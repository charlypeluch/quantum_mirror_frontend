import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '../authentication/credentials.service';

/**
 * Set authorization header in all requests.
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public credentialsService: CredentialsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _token = this.credentialsService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + _token
      }
    });

    return next.handle(request);
  }
}
