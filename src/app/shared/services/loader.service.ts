import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    isLoadingNavigation = new Subject<boolean>();
    isLoadingNetwork = new Subject<boolean>();

    activateNavigation() {
      this.isLoadingNavigation.next(true);
    }

    deactivateNavigation() {
      this.isLoadingNavigation.next(false);
    }

    activateNetwork() {
      this.isLoadingNetwork.next(true);
    }

    deactivateNetwork() {
      this.isLoadingNetwork.next(false);
    }
}
