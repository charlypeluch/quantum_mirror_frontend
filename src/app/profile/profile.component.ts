import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '@app/shared/services/user.service';
import { AuthenticationService } from '@app/core';

import { slideAnimation } from '../shared/animations/animation-navigation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideAnimation]
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  optionSelected:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private authenticationService: AuthenticationService, ) {
    this.route.data.subscribe((data) => console.log(data));
  }

  ngOnInit(): void {
    this.userService.getUserProfile().then(
      result => this.userProfile = result
    )
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/access'], { replaceUrl: true }));
  }
}
