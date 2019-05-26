import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

import * as PatternLock from 'pattern-lock-js';

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum-access.component.html',
  styleUrls: ['./quantum-access.component.scss']
})
export class QuantumAccessComponent implements OnInit, OnDestroy {

  // isError: boolean = false;
  // isLoading: boolean = false;
  // registerForm!: FormGroup;

  patternLock: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    // this.createForm();
  }

  ngOnInit() {
    this.patternLock = new PatternLock("#quantum-lock", {
      onPattern: function(pattern) {
        console.warn("PATTERN: ", pattern);
      }.bind(this)
    });
  }

  clearPatternLock() {
    this.patternLock.clear();
    this.notificationService.openNotification('Clear lock!', 'Accept', 'quantum');
  }

  ngOnDestroy() { }
}
