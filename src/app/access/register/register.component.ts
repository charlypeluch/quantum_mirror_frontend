import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

@Component({
  selector: 'app-access',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  isError: boolean = false;
  isLoading: boolean = false;
  registerForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    this.createForm();
  }

  ngOnInit() { }

  ngOnDestroy() { }

  register() {
    this.isLoading = true;

    let registerData = Object.assign({}, this.registerForm.value);
    delete registerData.confirmPassowrd;

    this.authenticationService.register(registerData)
      .then(
        result => {
          this.isError = false;
          this.router.navigate([ this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          this.notificationService.openNotification('Registered Successfully', 'Accept');

          let loginData = {'username': registerData.email, 'password': registerData.password};

          this.authenticationService.login(loginData).then(
            res => {
              this.isError = false;
              this.router.navigate([ this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
            },
            err => {
              this.isError = true;
            }
          )
        },
        error => {
          this.isError = true;
        }
      )
      .finally(() => {
        this.registerForm.markAsPristine();
        this.isLoading = false;
      });
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassowrd: ['', Validators.required]
    });
  }

}
