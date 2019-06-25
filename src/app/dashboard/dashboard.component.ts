import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MirrorService } from '@app/shared/services/mirror.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  query = {filter: '', content: [], page: 1, limit: 50};
  searchActive: boolean = false;
  regularDistribution = 100 / 2 + '%';
  dialogData = {code: ''};

  mirrors:any = [];

  constructor(public dialog: MatDialog,
              private mirrorService: MirrorService) {
  }

  ngOnInit() {
    this.getMirrors();
  }

  applyFilter() {
    if (this.query.filter == '')
      this.searchActive = false;
    else
      this.searchActive = true;

    this.query.content = this.mirrors.filter(m => {
      return m.name.toLowerCase().includes(this.query.filter.toLowerCase()) || m.location.toLowerCase().includes(this.query.filter.toLowerCase());
    });
  }

  toggleSearchToolbar() {
    this.searchActive = !this.searchActive;

    if (!this.searchActive) {
      this.query.filter = '';
      this.applyFilter();
    }
  }

  toggleMirror(mirror) {
    this.mirrorService.selectMirror(mirror);
  }

  openDialog(): void {
    const _dialog = this.dialog.open(DashboardDialog, {
      width: '300px'
    });

    _dialog.afterClosed().subscribe(result => {
      this.dialogData.code = result;

      this.mirrorService.assignUserMirror(result).then(
        res => this.getMirrors()
      );
    });
  }

  getMirrors() {
    this.mirrorService.getUserMirrors().then(
      result => {
        this.mirrors = result;
        this.applyFilter();
      }
    )
  }
}

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: 'dashboard-dialog.html',
})
export class DashboardDialog {
  code:string = '';

  constructor(
    public _dialog: MatDialogRef<DashboardDialog>) {
  }

  cancel(): void {
    this._dialog.close();
  }

}
