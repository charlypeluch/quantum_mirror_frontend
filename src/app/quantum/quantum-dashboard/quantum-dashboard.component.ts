import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum-dashboard.component.html',
  styleUrls: ['./quantum-dashboard.component.scss']
})
export class QuantumDashboardComponent implements OnInit, OnDestroy {

  isError: boolean = false;
  isLoading: boolean = false;
  registerForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    // this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }
}
