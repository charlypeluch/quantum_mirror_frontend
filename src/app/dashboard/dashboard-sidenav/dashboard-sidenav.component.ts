import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { MirrorService } from '@app/shared/services/mirror.service';
import { CredentialsService } from '@app/core';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {

  @Input() sidenav: MatSidenav;

  isLoadingUsers:boolean = false;
  mirror:any;
  credentials:any;

  constructor(private mirrorService: MirrorService,
              private credentialsService: CredentialsService) { }

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    this.mirrorService.selectedMirror.subscribe(
      value => {
        this.mirror = value;
        this.getMirrorUsers();

        this.sidenav.open();
      }
    );
  }

  getMirrorUsers() {
    this.isLoadingUsers = true;
    this.mirrorService.getMirrorUsers(this.mirror.id).then(
      result => {
        this.mirror['users'] = result;
        this.isLoadingUsers = false;
      }
    );
  }

  unassignUserMirror() {
    this.mirrorService.unassignUserMirror(this.mirror.id).then(
      result => {
        this.sidenav.close();
      }
    )
  }
}
