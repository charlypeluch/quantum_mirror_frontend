import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    state,
} from '@angular/animations';


export const slideAnimation =
    trigger('routeAnimations', [
      transition('* => *', [
          query(':enter, :leave', style({ position: 'absolute', width: '65%', left: '35%'}), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(100%)',  opacity: 0 }),
                  animate('0.5s ease-in-out', style({ transform: 'translateX(0%)',  opacity: 1 }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)', opacity: 1}),
                  animate('0.5s ease-in-out', style({ transform: 'translateY(100%)', opacity: 0, width: '100%'}))
              ], { optional: true }),
          ])
      ])
  ]);

export const slideUpAnimation =
  trigger('slideUpAnimation', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
          style({height: '*', opacity: 1}),
          group([
              animate(1200, style({height: 0})),
              animate('1000ms ease-in-out', style({'opacity': '0'}))
          ])

      ]),
      transition(':enter', [
          style({height: '0', opacity: 0}),
          group([
              animate(1200, style({height: '*'})),
              animate('1000ms ease-in-out', style({'opacity': '1'}))
          ])

      ])
  ])
