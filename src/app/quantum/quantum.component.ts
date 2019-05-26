import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ThemeService } from '@app/shared';

import { slideUpAnimation } from '../shared/animations/animation-navigation';

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum.component.html',
  styleUrls: ['./quantum.component.scss'],
  animations: [slideUpAnimation]
})
export class QuantumComponent implements OnInit {
  // navigationLinks: any[];
  // activeLinkIndex = -1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private themeService: ThemeService) {
    // this.navigationLinks = [
    //     {
    //         label: 'Login',
    //         link: './login',
    //         index: 0
    //     }, {
    //         label: 'Register',
    //         link: './register',
    //         index: 1
    //     }
    // ];
  }

  ngOnInit(): void {
    // this.router.events.subscribe((res) => {
    //     this.activeLinkIndex = this.navigationLinks.indexOf(this.navigationLinks.find(tab => tab.link === '.' + this.router.url));
    // });
    this.toggleTheme('quantum-mirror');
    // this.router.navigate([{ outlets: { quantumAccess: ['quantum-access'] } }], {relativeTo:this.activatedRoute});
  }

  public toggleTheme(theme:string) {
    this.themeService.setTheme(theme);
  }
}
