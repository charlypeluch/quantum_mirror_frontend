import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // navigationLinks: any[];
  optionSelected: number;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    // this.navigationLinks = [
    //     {
    //         label: 'Activity',
    //         link: './activity',
    //         index: 0
    //     }, {
    //         label: 'Notifications',
    //         link: './notifications',
    //         index: 1
    //     }, {
    //         label: 'Security and privacy',
    //         link: './security',
    //         index: 1
    //     }, {
    //         label: 'Help Center',
    //         link: './help',
    //         index: 1
    //     }
    // ];
  }

  ngOnInit(): void {

  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/access'], { replaceUrl: true }));
  }
}
