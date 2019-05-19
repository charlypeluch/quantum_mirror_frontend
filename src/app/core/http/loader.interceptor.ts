import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";

import { LoaderService } from '@app/shared/services/loader.service';

/**
 * Set authorization header in all requests.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.activateNetwork();
    return next.handle(req).pipe(
      finalize(() => {this.loaderService.deactivateNetwork()})
    );
  }

}
