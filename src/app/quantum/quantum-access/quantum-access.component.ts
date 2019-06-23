import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CredentialsService, AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

import * as PatternLock from 'pattern-lock-js';

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum-access.component.html',
  styleUrls: ['./quantum-access.component.scss']
})
export class QuantumAccessComponent implements OnInit, OnDestroy {
  isError: boolean = false;

  patternLock: any;
  leapController: any;
  leapCursor: any;
  leapCursorEvent: boolean = false;

  leapEventListenerDown = function(e) {
    console.log("DOWN...",e);
  }
  leapEventListenerUp = function(e) {
    console.log("UP...",e);
  }
  leapEventListenerMove = function(e) {
    console.log("MOVE...",e);
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private credentialsService: CredentialsService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    // if (this.credentialsService.isAuthenticated()) {
    //   // this.router.navigate(['/quantum/quantum-dashboard'], { replaceUrl: true });
    //   this.router.navigate([ this.route.snapshot.queryParams.redirect || '/quantum/quantum-dashboard'], { replaceUrl: true });
    // }

    this.patternLock = new PatternLock("#quantum-lock", {
      onPattern: function(pattern) {
        console.warn("PATTERN: ", pattern);
        this.quantumLogin(pattern);
      }.bind(this)
    });

    this.leapController = new Leap.Controller({ enableGestures: true });
  }

  quantumLogin(pattern:number) {
    // this.isLoading = true;

    this.authenticationService.loginMirror(pattern).then(
      result => {
        this.isError = false;
        // this.router.navigate([ this.route.snapshot.queryParams.redirect || '/quantum/quantum-dashboard'], { replaceUrl: true });
        // this.router.navigate(['/quantum/quantum-dashboard'], { replaceUrl: true });
        this.router.navigate([ this.route.snapshot.queryParams.redirect || '/quantum'], { replaceUrl: true });
      },
      error => {
        this.isError = true;
      }
    )
    .finally(() => {
      // if(this.isError)
      //   this.clearPatternLock()
    });
  }

  _leapCursorEvent(mode) {
    if (mode && !this.leapCursorEvent) {
      this.leapCursorEvent = mode;

      // CREATE EVENTS
      window.addEventListener("mousedown", this.leapEventListenerDown);
      window.addEventListener("mouseup", this.leapEventListenerUp);
      // window.addEventListener("mousemove", this.leapEventListenerMove);
    }
    else if (!mode) {
      this.leapCursorEvent = mode;

      // REMOVE EVENTS
      window.removeEventListener("mousedown", this.leapEventListenerDown);
      window.removeEventListener("mouseup", this.leapEventListenerUp);
      // window.removeEventListener("mousemove", this.leapEventListenerMove);
    }
  }

  _leapCursorSimulateEvent() {
    // let _lock = document.getElementById('quantum-lock');
    var _initx = 528;
    var _inity = 554;

    var _endx = 528;
    var _endy = 554;

    let _element = document.elementFromPoint(_initx, _inity);

    // _element.click();
    var event_d = new MouseEvent('click', {
        'bubbles': true,
        'buttons': 1,
        'cancelable': true,
        'clientX': _initx,
        'clientY': _inity,
        'composed': true,
        'detail': 1,
        'screenX': _initx,
        'screenY': _inity,
        'view': window
    });
    _element.dispatchEvent(event_d);
    console.warn("CLICK...");

    // var event_m = new MouseEvent('mousemove', {
    //   'bubbles': true,
    //   'buttons': 1,
    //   'cancelable': true,
    //   'clientX': _initx,
    //   'clientY': _inity,
    //   'composed': true,
    //   'detail': 1,
    //   'screenX': _initx,
    //   'screenY': _inity,
    //   'view': window
    // });
    // _lock.dispatchEvent(event_m);
    // console.warn("MOVE 0...");
    //
    // var event_m = new MouseEvent('mousemove', {
    //   'bubbles': true,
    //   'buttons': 1,
    //   'cancelable': true,
    //   'clientX': 495,
    //   'clientY': 317,
    //   'composed': true,
    //   'detail': 1,
    //   'screenX': 495,
    //   'screenY': 317,
    //   'view': window
    // });
    // _lock.dispatchEvent(event_m);
    // console.warn("MOVE 1...");
    //
    // var event_m = new MouseEvent('mousemove', {
    //   'bubbles': true,
    //   'buttons': 1,
    //   'cancelable': true,
    //   'clientX': 525,
    //   'clientY': 317,
    //   'composed': true,
    //   'detail': 1,
    //   'screenX': 525,
    //   'screenY': 317,
    //   'view': window
    // });
    // _lock.dispatchEvent(event_m);
    // console.warn("MOVE 2...");

    // var event_u = new MouseEvent('mouseup', {
    //   'bubbles': true,
    //   'buttons': 1,
    //   'cancelable': true,
    //   'clientX': _endx,
    //   'clientY': _endy,
    //   'composed': true,
    //   'detail': 1,
    //   'screenX': _endx,
    //   'screenY': _endy,
    //   'view': window
    // });
    // _element.dispatchEvent(event_u);
    // console.warn("MOVE UP...");
  }

  _leapCursorInit() {
    let touchPointers = [
      {hand: 'left', fingers : ["thumb", "index", "middle", "ring", "pinky"]},
      {hand: 'right', fingers : ["thumb", "index", "middle", "ring", "pinky"]}
    ];

    this.leapCursor = {
      touchPointersLeft: [],
      touchPointersRight: [],
      touchClick: false,
    }

    for (let t of touchPointers) {
      let _touchPointers = undefined;

      if (t.hand == 'left')
        _touchPointers = this.leapCursor.touchPointersLeft;
      else if (t.hand == 'right')
        _touchPointers = this.leapCursor.touchPointersRight;

      for (let f of t.fingers) {
        let _pointer = document.createElement('div');
        let _content = document.createElement('span');
        let _label = document.createElement('span');

        _pointer.id                       = 'leap_hand_' + t.hand + '_finger_' + f;
        _pointer.style.position           = 'absolute';
        _pointer.style.visibility         = 'hidden';
        _pointer.style.zIndex             = '9999';
        _pointer.style.opacity            = '0.5';
        _pointer.style.width              = '40px';
        _pointer.style.height             = '40px';
        _pointer.style.borderRadius       = '20px';
        _pointer.style.display            = 'flex';
        _pointer.style['flex-flow']       = 'column';
        _pointer.style['justify-content'] = 'center';
        _pointer.style['align-items']     = 'center';
        _pointer.style['font-family']     = 'Poppins, Roboto';

        _label.textContent                = _pointer.id;
        _label.style['margin-top']        = _pointer.style.height;
        _label.style.color                = 'white';
        _label.style.position             = 'absolute';

        _pointer.appendChild(_content);
        _pointer.appendChild(_label);
        _touchPointers.push(_pointer);
        document.body.appendChild(_pointer);
      }
    }
  }

  _leapCursorDraw(frame:any) {
    let _offsetWidth = document.body.offsetWidth - 45;
    let _offsetHeight = document.body.offsetHeight - 45;

    let iBox = frame.interactionBox;
    if (frame.hands.length > 0) {
      for (let hand of frame.hands) {
        let _touchPointers = undefined;

        if (frame.hands.length == 1)
          this._leapCursorClear(hand.type);

        if (hand.type == 'left')
          _touchPointers = this.leapCursor.touchPointersLeft;
        else if (hand.type == 'right')
          _touchPointers = this.leapCursor.touchPointersRight;

        for (let finger of hand.fingers) {
          let _pointable: any = finger;
          let _pointer: any = _touchPointers[finger.type];

          let pos = iBox.normalizePoint(_pointable.tipPosition, true);
          let pos_x = (pos[0] * _offsetWidth);
          let pos_y = (_offsetHeight - pos[1] * _offsetHeight);

          _pointer.style.left = pos_x + 'px';
          _pointer.style.top = pos_y + 'px';
          _pointer.style.visibility = _pointable.extended ? 'visible' : 'hidden';
          _pointer.style.color = 'black';

          if (_pointable.touchZone == "hovering") {
            _pointer.style.opacity = (.375 - _pointable.touchDistance * .2);
            _pointer.style.backgroundColor = 'rgb(0,128,0)';
          }
          else if (_pointable.touchZone == "touching") {
            _pointer.style.opacity = (.375 - _pointable.touchDistance * .5);
            _pointer.style.backgroundColor = 'rgb(128,0,0)';
          }
          else {
            _pointer.style.opacity = (.2);
            _pointer.style.color = 'white';
            _pointer.style.backgroundColor = 'gray';
          }

          if (_pointable.type == 1  && _pointable.extended)                     // Action with index extended
            this._leapCursorAction(_pointable, pos_x, pos_y);

          _pointer.children[0].textContent = _pointable.touchDistance.toFixed(2);
        }
      }
    }
    else {
      this._leapCursorClear();
    }
       // var touchPoints = {};
       // touchPoints['stageWidth'] = document.body.offsetWidth;
       // touchPoints['stageHeight'] = document.body.offsetHeight;

       // touchPoints['tips'] = new Array(10);
       // touchPoints['labels'] = new Array(10);
       //
       // touchPoints['stage'] = new Kinetic.Stage({
       //   container: 'stage',
       //   width: touchPoints['stageWidth'],
       //   height: touchPoints['stageHeight']
       // });


        // touchPoints['leap'] = new Leap.Controller();
        // touchPoints['leap'].connect();

        // touchPoints['layer'] = new Kinetic.Layer();
        // for (var t = 0; t < 10; t++) {
        //   var tip = new Kinetic.Circle({
        //     x: 239,
        //     y: 75,
        //     radius: 20,
        //     fill: 'green',
        //     stroke: 'black',
        //     strokeWidth: 4,
        //     opacity: .5,
        //     visible: false
        //   });
        //   touchPoints['tips'][t] = tip;
        //   touchPoints['layer'].add(tip);
        //
        //   var label = new Kinetic.Text({
        //     text: 'bar',
        //     fontSize: 15,
        //     visible: false,
        //     fill: 'black'
        //   });
        //   touchPoints['labels'][t] = label;
        //   touchPoints['layer'].add(label);
        // }

        // add the layer to the ['stage']
        // touchPoints['stage'].add(touchPoints['layer']);

        // touchPoints['anim'] = new Kinetic.Animation(function(frame) {
        //   var time = frame.time, timeDiff = frame.timeDiff, frameRate = frame.frameRate;
        //
        //   // update stuff
        //   var tipPointer = 0;
        //   var leapFrame = touchPoints['leap'].frame();
        //   if(leapFrame.valid)
        //   {
        //     var iBox = leapFrame.interactionBox;
        //     for(var p = 0; p < leapFrame.pointables.length; p++)
        //     {
        //         var pointable = leapFrame.pointables[p];
        //         var pos = iBox.normalizePoint(pointable.tipPosition,true);
        //         touchPoints['tips'][tipPointer].x(pos[0] * touchPoints['stageWidth']);
        //         touchPoints['tips'][tipPointer].y(touchPoints['stageHeight'] - pos[1] * touchPoints['stageHeight']);
        //         touchPoints['tips'][tipPointer].visible(true);
        //         if(pointable.touchZone == "hovering" )
        //         {
        //             touchPoints['tips'][tipPointer].opacity(.375 - pointable.touchDistance * .2);
        //             touchPoints['tips'][tipPointer].fill('rgb(0,128,0)');
        //         }
        //         else if(pointable.touchZone == "touching" )
        //         {
        //             touchPoints['tips'][tipPointer].opacity(.375 - pointable.touchDistance * .5);
        //             touchPoints['tips'][tipPointer].fill('rgb(128,0,0)');
        //         }
        //         else
        //         {
        //            touchPoints['tips'][tipPointer].opacity(.1);
        //            touchPoints['tips'][tipPointer].fill('rgb(0,0,128)');
        //         }
        //
        //         touchPoints['labels'][tipPointer].text(pointable.touchDistance.toFixed(2));
        //         touchPoints['labels'][tipPointer].x(touchPoints['tips'][tipPointer].x() - 15);
        //         touchPoints['labels'][tipPointer].y(touchPoints['tips'][tipPointer].y() - 8);
        //         touchPoints['labels'][tipPointer].visible(true);
        //         if(tipPointer < 9) tipPointer++;
        //     }
        //
        //     while(tipPointer<=9){
        //       touchPoints['labels'][tipPointer].visible(false);
        //       touchPoints['tips'][tipPointer++].visible(false);
        //     }
        //   }
        // }, touchPoints['layer']);
        //
        // touchPoints['anim'].start();
  }

  _leapCursorAction(pointer, x, y) {
    let _element = document.elementFromPoint(x, y);
    let _button = _element.closest("button");
    let _a = _element.closest("a");

    if (pointer.touchZone == "hovering") {
      if (this.leapCursor.touchClick) {
        this._leapCursorActionSimulate(_element, 'mouseup', x, y);
        this.leapCursor.touchClick = false;
      }
    }
    else if (pointer.touchZone == "touching") {
      if (!this.leapCursor.touchClick) {
        if (_button)
          _button.click();
        else if (_a)
          _a.click();
        else
          this._leapCursorActionSimulate(_element, 'mousedown', x, y);

        this.leapCursor.touchClick = true;
      }
      else {
        this._leapCursorActionSimulate(_element, 'mousemove', x, y);
      }
    }
  }

  _leapCursorActionSimulate(element, event_type, x, y) {
    let _event = new MouseEvent(event_type, {
        'bubbles': true,
        'buttons': 1,
        'cancelable': true,
        'clientX': x,
        'clientY': y,
        'composed': true,
        'detail': 1,
        'screenX': x,
        'screenY': y,
        'view': window
    });
    element.dispatchEvent(_event);
  }


  _leapCursorClear(hand='mix') {
    let _touchPointers = this.leapCursor.touchPointersLeft.concat(this.leapCursor.touchPointersRight);

    if (hand == 'left')
      _touchPointers = this.leapCursor.touchPointersRight;
    else if (hand == 'right')
      _touchPointers = this.leapCursor.touchPointersLeft;
    else
      this.leapCursor.touchClick = false;

    for (let t of _touchPointers) {
      t.style.visibility = 'hidden';
    }
  }

  // leapConfig() {
  //   // let pointer = document.createElement('div');
  //   this.leapCursor = {
  //     body: document.body,
  //     pointer: document.createElement( 'div' ),
  //     config: {
  //       autoCenter       : true,      // Center pointer around detected position.
  //       gestureDelay     : 500,       // How long to delay between gestures.
  //       naturalSwipe     : false,      // Swipe as if it were a touch screen.
  //       pointerColor     : '#d80000', // Default color of the pointer.
  //       pointerOpacity   : '0.5',       // Default opacity of the pointer.
  //       pointerSize      : 15,        // Default minimum height/width of the pointer.
  //       pointerTolerance : 120        // Bigger = slower pointer.
  //     },
  //     entered: undefined,
  //     enteredPosition: undefined
  //   }
  //
  //   this.leapCursor.pointer.id = 'leap';
  //
  //   this.leapCursor.pointer.style.position        = 'absolute';
  //   this.leapCursor.pointer.style.visibility      = 'hidden';
  //   this.leapCursor.pointer.style.zIndex          = '50';
  //   this.leapCursor.pointer.style.opacity         = this.leapCursor.config.pointerOpacity;
  //   this.leapCursor.pointer.style.backgroundColor = this.leapCursor.config.pointerColor;
  //
  //   this.leapCursor.body.appendChild(this.leapCursor.pointer);
  // }
  //
  // leapCursor(frame) {
  //   // let now = new Date().getTime();
  //   let size = undefined;
  //   let tipPosition = undefined;
  //
  //   for (let hand of frame.hands) {
  //     if (hand.type == 'right') {
  //       if (hand.fingers[1].extended) {
  //         // Invert direction and multiply by 3 for greater effect.
  //         size = -3 * frame.fingers[1].tipPosition[2];
  //
  //         if (size < this.leapCursor.config.pointerSize) {
  //           size = this.leapCursor.config.pointerSize;
  //         }
  //
  //         this.leapCursor.pointer.style.width = size + 'px';
  //         this.leapCursor.pointer.style.height = size + 'px';
  //         this.leapCursor.pointer.style.borderRadius = size - 5 + 'px';
  //         this.leapCursor.pointer.style.visibility = 'visible';
  //
  //         tipPosition = frame.fingers[1].tipPosition;
  //
  //         if (this.leapCursor.config.autoCenter) {
  //           // Check whether the finger has entered the z range of the Leap Motion. Used for the autoCenter option.
  //           if (!this.leapCursor.entered) {
  //             this.leapCursor.entered = true;
  //             this.leapCursor.enteredPosition = frame.fingers[0].tipPosition;
  //           }
  //
  //           this.leapCursor.pointer.style.top =
  //             (-1 * ((tipPosition[1] - this.leapCursor.enteredPosition[1]) * this.leapCursor.body.offsetHeight / this.leapCursor.config.pointerTolerance)) +
  //             (this.leapCursor.body.offsetHeight / 2) + 'px';
  //
  //           this.leapCursor.pointer.style.left =
  //             ((tipPosition[0] - this.leapCursor.enteredPosition[0]) * this.leapCursor.body.offsetWidth / this.leapCursor.config.pointerTolerance) +
  //             (this.leapCursor.body.offsetWidth / 2) + 'px';
  //         }
  //         else {
  //           this.leapCursor.pointer.style.top = (1 - ((tipPosition[1] - 50) / this.leapCursor.config.pointerTolerance)) *
  //             this.leapCursor.body.offsetHeight + 'px';
  //
  //           this.leapCursor.pointer.style.left = (tipPosition[0] * this.leapCursor.body.offsetWidth / this.leapCursor.config.pointerTolerance) +
  //             (this.leapCursor.body.offsetWidth / 2) + 'px';
  //         }
  //       }
  //       else {
  //         // Hide pointer on exit
  //         this.leapCursor.entered = false;
  //         this.leapCursor.pointer.style.visibility = 'hidden';
  //       }
  //     }
  //     else {
  //       // Hide pointer on exit
  //       this.leapCursor.entered = false;
  //       this.leapCursor.pointer.style.visibility = 'hidden';
  //     }
  //   }
  // }

  connectLeap() {
    this._leapCursorInit();
    this.leapController.connect();

    this.leapController.on('frame', function (frame:any) {
      if(frame.valid) {
        try {
          this._leapCursorDraw(frame);
        }
        catch(error) {
          console.error(error);
        }
      }
    }.bind(this));
  }

  disconnectLeap() {
    this.leapController.disconnect();
  }

  clearPatternLock() {
    this.patternLock.clear();
    this.notificationService.openNotification('Clear lock!', 'Accept', 'quantum');
  }

  ngOnDestroy() { }
}
