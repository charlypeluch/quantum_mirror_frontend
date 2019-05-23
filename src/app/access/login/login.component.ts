import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-access',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isError: boolean = false;
  isLoading: boolean = false;
  loginForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService)
              {
    this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  login() {
    this.isLoading = true;

    this.authenticationService.login(this.loginForm.value).then(
      result => {
        this.isError = false;
        this.router.navigate([ this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
      },
      error => {
        this.isError = true;
      }
    )
    .finally(() => {
      this.loginForm.markAsPristine();
      this.isLoading = false;
    });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
