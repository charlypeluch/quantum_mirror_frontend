import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  navigationLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navigationLinks = [
        {
            label: 'Login',
            link: './login',
            index: 0
        }, {
            label: 'Register',
            link: './register',
            index: 1
        }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.navigationLinks.indexOf(this.navigationLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
