import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@env/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  version: string = environment.version;

  constructor(private router: Router) {}

  ngOnInit(): void {

  }
}
