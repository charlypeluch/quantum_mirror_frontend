import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '@app/shared/services/user.service';
import { NotificationService } from '@app/shared';

import * as PatternLock from 'pattern-lock-js';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['../profile.component.scss', './security.component.scss']
})
export class SecurityComponent implements OnInit {
  userProfile: any;

  isPatternEdition: boolean = false;
  isPatternValid: boolean = false;
  patternUnlockCode: number;
  patternLock: any;

  isFacialEdition: boolean = false;
  facialUnlockFile: File = null;

  constructor(public activatedRoute: ActivatedRoute, private userService: UserService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.userProfile = data.userProfile;
    });

    this.patternLock = new PatternLock("#lock", {
      onPattern: function(pattern) {
        // Context is the pattern lock instance
        console.log('P: '+pattern);

        this.validePatternLock(pattern);
     }.bind(this)
    });
  }

  private validePatternLock(pattern:any) {
    if (!pattern || pattern.toString().length < 5)
      this.errorPatternLock();
    else
      this.successPatternLock(pattern);
  }

  private successPatternLock(pattern) {
    this.isPatternValid = true;
    this.patternLock.success();
    this.patternUnlockCode = pattern;
  }

  private errorPatternLock() {
    this.isPatternValid = false;
    this.patternLock.error();
    this.notificationService.openNotification('Enter pattern dont have min length (5 dots)', 'Accept');
  }

  private clearPatternLock() {
    this.patternLock.clear();
  }

  public savePatternLock() {

  }

  public editPatternLock() {
    this.clearPatternLock();
    this.isPatternValid = false;
    this.isPatternEdition = true;
  }

  public cancelPatternLock() {
    this.clearPatternLock();
    this.isPatternValid = false;
    this.isPatternEdition = false;
  }

  public patchUserPatternUnlock() {
    let params = {'pattern': this.patternUnlockCode};
    this.userService.patchtUserProfile(params).then(
      result => {
        this.userProfile.pattern = this.patternUnlockCode;
        this.notificationService.openNotification('Pattern unlock update complete', 'Accept');
      }
    )
  }

  public fileProgress(fileInput: any) {
    this.facialUnlockFile = <File>fileInput.target.files[0];
    console.warn("FILE: ", this.facialUnlockFile);
  }

  onUpload() {
    let params = {'file': this.facialUnlockFile};
    console.warn("PARAMS: ", params);
    this.userService.uploadUserProfileFacial(params);
  }


}
