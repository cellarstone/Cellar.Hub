import { trigger, state, animate, transition, style, group, query, keyframes } from '@angular/animations';

export const showEditModalTrigger = trigger('showEditModal', [
  transition(':enter', [
    group([
      style({ opacity: '0' }),
      animate('0.35s ease-in-out'),
      query('.service-modal__content', [
        style({
          opacity: '0',
          transform: 'scale(0)'
        }),
        animate('0.35s 100ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0)', offset: 0}),
          style({ opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)', offset: 1}),
        ]))
      ], {optional: true}),
    ]) 
  ]),
  transition(':leave', [
    group([
      style({ opacity: '1' }),
      animate('0.35s 100ms ease-in-out', style({ opacity: '0' })),
      query('.service-modal__content', [
        style({ opacity: '0', transform: 'scale(0)' }),
        animate('0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)', offset: 0}),
          style({ opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0)', offset: 1}),
        ]))
      ], {optional: true}),
    ])   
  ])
]);

export const calendarSlideRightTrigger = trigger('calendarSlideRight', [
  transition('* => *', [
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
  transition('* => *', [
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
  transition('* => *', [
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

export const showEditButtonsTrigger = trigger('showEditButtons', [
  transition(':enter', [
    style({
      opacity: '0',
    }),
    animate('.75s ease-out', style({
      opacity: '1',
    }))
  ]),
  
]);