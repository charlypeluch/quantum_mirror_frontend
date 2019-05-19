import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject } from 'rxjs';

import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  isLoadingNavigation:Subject<boolean> = this.loaderService.isLoadingNavigation;
  isLoadingNetwork:Subject<boolean> = this.loaderService.isLoadingNetwork;

  mode:string = 'indeterminate';
  color:string = 'accent';
  value:number = 200;
  size:number = 1;
  message:string | undefined;

  constructor(private router: Router, private loaderService: LoaderService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart)
      this.loaderService.activateNavigation()

    if (event instanceof NavigationEnd)
      this.loaderService.deactivateNavigation()

    if (event instanceof NavigationCancel)
      this.loaderService.deactivateNavigation()

    if (event instanceof NavigationError)
      this.loaderService.deactivateNavigation()
  }

}
