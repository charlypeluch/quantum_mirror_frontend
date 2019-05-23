import { Component, OnInit } from '@angular/core';

// import * as PatternLock from '@app/src/shared/js/pattern-lock/patternlock';
import * as PatternLock from 'pattern-lock-js';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor() { }

  lockPatter: any;

  ngOnInit() {
    this.lockPatter = new PatternLock("#lock", {
      onPattern: function(pattern) {
        // Context is the pattern lock instance
        console.log(pattern);
       }
    });
  }

  getPatternPattern() {
    console.log("P: ", this.lockPatter.getPattern());
  }

  clearPattern() {
    this.lockPatter.clear();
  }

  successPattern() {
    this.lockPatter.success();
  }

  errorPattern() {
    this.lockPatter.error();
  }

}
