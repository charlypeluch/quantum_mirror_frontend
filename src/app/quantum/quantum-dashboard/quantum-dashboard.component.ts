import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CredentialsService, AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

import * as moment from 'moment'; // add this 1 of 4

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum-dashboard.component.html',
  styleUrls: ['./quantum-dashboard.component.scss']
})
export class QuantumDashboardComponent implements OnInit, OnDestroy {

  moduleNW = {}
  moduleNE = {}
  moduleSE = {}
  moduleWS = {}

  constructor(private router: Router,
              private route: ActivatedRoute,
              private credentialsService: CredentialsService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    let moduleClock = {name: 'clock', value: {}, config: {}, active: true, visible: true};
    this.initModuleClock(moduleClock);

    this.moduleNW = moduleClock;
  }

  get alias(): string | null {
    let credentials = this.credentialsService.credentials;
    return credentials ? credentials.alias : null;
  }

  initModuleClock(module) {
    function getCurrentTime() {
      let _now = moment();
      module.value['date'] = _now.format('dddd, MMMM  M, YYYY');
      module.value['time'] = _now.format('HH:mm');
      module.value['seconds'] = _now.format('ss');
    }
    setInterval(getCurrentTime, 1000);
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => {
        this.router.navigate(['/quantum/quantum-access'], { replaceUrl: true });
      });
  }

  ngOnDestroy() { }
}
