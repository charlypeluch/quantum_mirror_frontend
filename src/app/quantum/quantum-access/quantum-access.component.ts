import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

import * as $ from 'jquery';
import * as PatternLock from 'pattern-lock-js';
// import * as Leap from 'leapjs';

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

    $(document).ready(function(){
       alert($("#stage").width());

       var stageWidth = 800;
       var stageHeight = 600;

       var tips = new Array(10);

       var stage = new Kinetic.Stage({
           container: 'stage',
           width: $("#stage").width(),
           height: $("#stage").height()
       });

       var leap = new Leap.Controller();
       leap.connect();

       var layer = new Kinetic.Layer();

       //Make ten circles to use as finger tips
       for (var t = 0; t < 10; t++) {
           var tip = new Kinetic.Circle({
               x: 239,
               y: 75,
               radius: 20,
               fill: 'green',
               stroke: 'black',
               strokeWidth: 4,
               opacity: .5,
               visible: false
           });
           tips[t] = tip;
           layer.add(tip);
       }

       // add the layer to the stage
       stage.add(layer);

       var anim = new Kinetic.Animation(function (frame) {
           var time = frame.time,
               timeDiff = frame.timeDiff,
               frameRate = frame.frameRate;

           // update finger tip display with data from latest frame
           var tipPointer = 0;
           var leapFrame = leap.frame();
           if (leapFrame.valid) {
               var iBox = leapFrame.interactionBox;
               for (var p = 0; p < leapFrame.pointables.length; p++) {
                   var pointable = leapFrame.pointables[p];
                   var pos = iBox.normalizePoint(pointable.tipPosition, true);
                   tips[tipPointer].setX(pos[0] * stageWidth);
                   tips[tipPointer].setY(stageHeight - pos[1] * stageHeight);
                   tips[tipPointer].setVisible(true);
                   if (pointable.touchZone == "hovering") {
                       tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .2);
                       // tips[tipPointer].setFillRGB({r: 0, g: 128, b: 0});
                       tips[tipPointer].setFill('rgb(0,128,0)');
                   } else if (pointable.touchZone == "touching") {
                       tips[tipPointer].setOpacity(.375 - pointable.touchDistance * .5);
                       // tips[tipPointer].setFillRGB({r: 128, g: 0, b: 0});
                       tips[tipPointer].setFill('rgb(128,0,0)');
                   } else {
                       tips[tipPointer].setOpacity(.1);
                       // tips[tipPointer].setFillRGB({r: 0, g: 0, b: 128});
                       tips[tipPointer].setFill('rgb(0,0,128)');
                   }
                   if (tipPointer < 9) tipPointer++;
               }
               while (tipPointer <= 9) tips[tipPointer++].setVisible(false);
           }
       }, layer);

       anim.start();

    });
  }

  clearPatternLock() {
    this.patternLock.clear();
    this.notificationService.openNotification('Clear lock!', 'Accept', 'quantum');
  }

  ngOnDestroy() { }
}
