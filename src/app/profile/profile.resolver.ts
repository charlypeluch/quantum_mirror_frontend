import { Injectable } from '@angular/core';
import { UserService } from '@app/shared/services/user.service';
import { Resolve } from '@angular/router';

@Injectable()
export class ProfileResolver implements Resolve<any> {

   constructor(public userService: UserService) { }

   resolve() {
      return this.userService.getUserProfile();
   }

}
