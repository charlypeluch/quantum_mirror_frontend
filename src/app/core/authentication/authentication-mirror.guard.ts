import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationMirrorGuard');

@Injectable()
export class AuthenticationMirrorGuard implements CanActivate {

  constructor(private router: Router,
              private credentialsService: CredentialsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.credentialsService.isAuthenticated())
      return true;

    if (state.url == '/quantum/quantum-access')
      return true;

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/quantum/quantum-access'], { queryParams: {}, replaceUrl: true });
    return false;
  }
}
