import {
    transition,
    trigger,
    query,
    style,
    animate,
    group
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
