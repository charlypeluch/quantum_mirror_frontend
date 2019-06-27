import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { QuantumDashboardService } from './quantum-dashboard.service';
import { CredentialsService, AuthenticationService } from '@app/core';
import { NotificationService } from '@app/shared';

import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';
// import { MomentModule } from 'ngx-moment';
import * as moment from 'moment';

@Component({
  selector: 'app-quantum',
  templateUrl: './quantum-dashboard.component.html',
  styleUrls: ['./quantum-dashboard.component.scss']
})
export class QuantumDashboardComponent implements OnInit, OnDestroy {

  moduleNW:any;
  moduleNE:any;
  moduleSE:any;
  moduleWS:any;

  leapController: any;
  leapCursor: any;
  leapCursorEvent: boolean = false;
  leapGesture: any;

  panelRightVisible:boolean = true;
  panelLeftVisible:boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private quantumDashboardService: QuantumDashboardService,
              private credentialsService: CredentialsService,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    let moduleClock = {name: 'clock', value: {}, config: {}, active: true, visible: true};
    let moduleWeather = {name: 'weather', value: {}, config: {}, active: true, visible: true};
    let moduleFeed = {name: 'feed', value: {}, config: {}, active: true, visible: true};
    this.initModuleClock(moduleClock);
    this.initModuleWeather(moduleWeather);
    this.initModuleFeed(moduleFeed);

    this.moduleNW = moduleClock;
    this.moduleNE = moduleWeather;
    this.moduleWS = moduleFeed;

    this.leapController = new Leap.Controller({ enableGestures: true });
    this.connectLeap();
  }

  get alias(): string | null {
    let credentials = this.credentialsService.credentials;
    return credentials ? credentials.alias : null;
  }

  connectLeap() {
    this._leapCursorForceClear();
    this._leapCursorInit();
    this.leapController.connect();

    this.leapController.on('frame', function (frame:any) {
      if(frame.valid) {
        try {
          this._leapCursorDraw(frame);
          this._leapCursorGesture(frame);
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
  }

  _leapCursorGesture(frame) {
    let swipeDirection = '';

    if (frame.gestures.length > 0) {
      for (var i = 0; i < frame.gestures.length; i++) {
        var gesture = frame.gestures[i];
        if (gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if (isHorizontal) {
            if (gesture.direction[0] > 0)
              swipeDirection = "right";
            else
              swipeDirection = "left";
          }
          else { //vertical
            if (gesture.direction[1] > 0)
              swipeDirection = "up";
            else
              swipeDirection = "down";
          }

          if (swipeDirection != this.leapGesture) {
            this.leapGesture = swipeDirection;

            // UI Gestures
            if (this.leapGesture == 'left'){
              if (this.panelRightVisible)
                this.panelLeftVisible = false;
              else
                this.panelRightVisible = true;
            }
            else if (this.leapGesture == 'right') {
              if (this.panelLeftVisible)
                this.panelRightVisible = false;
              else
                this.panelLeftVisible = true;
            }
            else if (this.leapGesture == 'down')
              this.logout();

            // console.log("GESTURE: "+this.leapGesture);
            if (this.panelLeftVisible && this.panelRightVisible)
              this.leapGesture= '';
          }
        }
      }
    }
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

  _leapCursorForceClear() {
    let div_cursors = document.querySelectorAll('[id^="leap_hand_"]')

    for(let c of Array.from(div_cursors)){
      c.remove()
    }
  }

  initModuleClock(module) {
    function getCurrentTime() {
      let _now = moment();
      module.value['date'] = _now.format('dddd, MMMM  M, YYYY');
      module.value['time'] = _now.format('HH:mm');
      module.value['seconds'] = _now.format('ss');
    }
    setInterval(getCurrentTime, 1000);
  }

  initModuleWeather(module) {
    module.config = new WeatherSettings();
    module.config = {
      location: {cityName: 'Albacete'},
      backgroundColor: '#212121',
      color: 'white',
      width: '100%',
      height: 'auto',
      showWind: true,
      scale: TemperatureScale.CELCIUS,
      forecastMode: ForecastMode.GRID,
      showDetails: false,
      showForecast: true,
      layout: WeatherLayout.WIDE,
      language: 'en'
    };
  }

  initModuleFeed(module) {
    module.config = {language: 'es'};

    this.quantumDashboardService.getNews(module.config).then(
      result => {
        module.value = result;
      }
    )
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => {
        this.router.navigate(['/quantum/quantum-access'], { replaceUrl: true });
      });
  }

  ngOnDestroy() {
    this._leapCursorClear();
  }
}
