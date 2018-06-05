import { trigger, state, animate, transition, style, group, query, keyframes } from '@angular/animations';


export const calendarSlideRightTrigger = trigger('calendarSlideRight', [
    transition('* => true', [
      style({
        opacity: '0',
        transform: 'translateX(-100%)'
      }),
      animate('.3s ease-in-out', keyframes([
        style({
          opacity: '1',
          transform: 'translateX(0)',
          offset: 0
        }),
        style({
          opacity: '5',
          transform: 'translateX(-50%)',
          offset: .25
        }),
        style({
          opacity: '.0',
          transform: 'translateX(-100%)',
          offset: .50
        }),
        style({
          opacity: '.0',
          transform: 'translateX(100%)',
          offset: .51
        }),
        style({
          opacity: '.5',
          transform: 'translateX(50%)',
          offset: .75
        }),
        style({
          opacity: '1',
          transform: 'translateX(0)',
          offset: 1
        })
      ])),
    ]),
  ]);
  
  export const calendarSlideLeftTrigger = trigger('calendarSlideLeft', [
    transition('* => true', [
      style({
        opacity: '0',
        transform: 'translateX(100%)'
      }),
      animate('.3s ease-in-out', keyframes([
        style({
          opacity: '1',
          transform: 'translateX(0)',
          offset: 0
        }),
        style({
          opacity: '.5',
          transform: 'translateX(50%)',
          offset: .25
        }),
        style({
          opacity: '.0',
          transform: 'translateX(100%)',
          offset: .50
        }),
        style({
          opacity: '.0',
          transform: 'translateX(-100%)',
          offset: .51
        }),
        style({
          opacity: '.5',
          transform: 'translateX(-50%)',
          offset: .75
        }),
        style({
          opacity: '1',
          transform: 'translateX(0)',
          offset: 1
        })
      ])),
    ]),
  ]);
  
  
  export const calendarTodayTrigger = trigger('calendarToday', [
    transition('* => true', [
      style({
        opacity: '0',
        transform: 'scale(0)'
      }),
      animate('1s ease-out', keyframes([
        style({
          opacity: '1',
          transform: 'scale(1)',
          offset: 0
        }),
        style({
          opacity: '.5',
          transform: 'scale(.5)',
          offset: .25
        }),
        style({
          opacity: '.0',
          transform: 'scale(0)',
          offset: .40
        }),
        style({
          opacity: '.0',
          transform: 'scale(0)',
          offset: .60
        }),
        style({
          opacity: '.5',
          transform: 'scale(.5)',
          offset: .75
        }),
        style({
          opacity: '1',
          transform: 'scale(1)',
          offset: 1
        })
      ])),
    ]),
  ]);