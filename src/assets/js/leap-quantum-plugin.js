/*
 * Leap Motion integration for Reveal.js.
 * James Sun  [sun16]
 * Rory Hardy [gneatgeek]
 */

(function () {
  var _config = {
    naturalSwipe   : false,    // Invert swipe gestures
    pointerOpacity : 0.5,      // Set pointer opacity to 0.5
    pointerColor   : '#d80000' // Red pointer
  }

  var body        = document.body,
      controller  = new Leap.Controller({ enableGestures: true }),
      lastGesture = 0,
      leapConfig  = _config,
      pointer     = document.createElement( 'div' ),
      config      = {
        autoCenter       : true,      // Center pointer around detected position.
        gestureDelay     : 500,       // How long to delay between gestures.
        naturalSwipe     : true,      // Swipe as if it were a touch screen.
        pointerColor     : '#00aaff', // Default color of the pointer.
        pointerOpacity   : 0.7,       // Default opacity of the pointer.
        pointerSize      : 15,        // Default minimum height/width of the pointer.
        pointerTolerance : 120        // Bigger = slower pointer.
      },
      entered, enteredPosition, now, size, tipPosition; // Other vars we need later, but don't need to redeclare.

      // Merge user defined settings with defaults
      if( leapConfig ) {
        for( key in leapConfig ) {
          config[key] = leapConfig[key];
        }
      }

      pointer.id = 'leap';

      pointer.style.position        = 'absolute';
      pointer.style.visibility      = 'hidden';
      pointer.style.zIndex          = 50;
      pointer.style.opacity         = config.pointerOpacity;
      pointer.style.backgroundColor = config.pointerColor;

      body.appendChild( pointer );

  // Leap's loop
  controller.on( 'frame', function ( frame ) {
    // Timing code to rate limit gesture execution
    now = new Date().getTime();

    // Pointer: 1 to 2 fingers. Strictly one finger works but may cause innaccuracies.
    // The innaccuracies were observed on a development model and may not be an issue with consumer models.
    if( frame.fingers.length > 0 && frame.fingers.length < 3 ) {
      // Invert direction and multiply by 3 for greater effect.
      size = -3 * frame.fingers[0].tipPosition[2];

      if( size < config.pointerSize ) {
        size = config.pointerSize;
      }

      pointer.style.width        = size     + 'px';
      pointer.style.height       = size     + 'px';
      pointer.style.borderRadius = size - 5 + 'px';
      pointer.style.visibility   = 'visible';

      tipPosition = frame.fingers[0].tipPosition;

      if( config.autoCenter ) {


        // Check whether the finger has entered the z range of the Leap Motion. Used for the autoCenter option.
        if( !entered ) {
          entered         = true;
          enteredPosition = frame.fingers[0].tipPosition;
        }

        pointer.style.top =
          (-1 * (( tipPosition[1] - enteredPosition[1] ) * body.offsetHeight / config.pointerTolerance )) +
            ( body.offsetHeight / 2 ) + 'px';

        pointer.style.left =
          (( tipPosition[0] - enteredPosition[0] ) * body.offsetWidth / config.pointerTolerance ) +
            ( body.offsetWidth / 2 ) + 'px';
      }
      else {
        pointer.style.top  = ( 1 - (( tipPosition[1] - 50) / config.pointerTolerance )) *
          body.offsetHeight + 'px';

        pointer.style.left = ( tipPosition[0] * body.offsetWidth / config.pointerTolerance ) +
          ( body.offsetWidth / 2 ) + 'px';
      }
    }
    else {
      // Hide pointer on exit
      entered                  = false;
      pointer.style.visibility = 'hidden';
    }

    // Gestures
    if( frame.gestures.length > 0 && (now - lastGesture) > config.gestureDelay ) {
      var gesture = frame.gestures[0];

      // One hand gestures
      if( frame.hands.length === 1 ) {
        // Swipe gestures. 3+ fingers.
        if( frame.fingers.length > 2 && gesture.type === 'swipe' ) {
          // Define here since some gestures will throw undefined for these.
          var x = gesture.direction[0],
              y = gesture.direction[1];

          // Left/right swipe gestures
          if( Math.abs( x ) > Math.abs( y )) {
            if( x > 0 ) {
              // config.naturalSwipe ? Reveal.left() : Reveal.right();
            }
            else {
              // config.naturalSwipe ? Reveal.right() : Reveal.left();
            }
          }
          // Up/down swipe gestures
          else {
            if( y > 0 ) {
              // config.naturalSwipe ? Reveal.down() : Reveal.up();
            }
            else {
              // config.naturalSwipe ? Reveal.up() : Reveal.down();
            }
          }

          lastGesture = now;
        }
      }
      // Two hand gestures
      else if( frame.hands.length === 2 ) {
        // Upward two hand swipe gesture
        if( gesture.type === 'swipe' && gesture.direction[1] > 0 ) {
          // Reveal.toggleOverview();
        }

        lastGesture = now;
      }
    }
  });

  controller.connect();
})();
