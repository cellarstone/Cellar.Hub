import { trigger, state, style, animate, transition, query, group, keyframes } from '@angular/animations';

export const showServiceModalTrigger = trigger('showServiceModal', [
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

export const showReceptionModalTrigger = trigger('showReceptionModal', [
  transition(':enter', [
    group([
      style({ opacity: '0' }),
      animate('0.35s ease-in-out'),
      query('.card', [
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
      query('.card', [
        style({ opacity: '0', transform: 'scale(0)' }),
        animate('0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)', offset: 0}),
          style({ opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0)', offset: 1}),
        ]))
      ], {optional: true}),
    ])   
  ])
]);

export const showSnackModalTrigger = trigger('showSnackModal', [
  transition(':enter', [
    group([
      style({ opacity: '0' }),
      animate('0.35s ease-in-out'),
      query('.card', [
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
      query('.card', [
        style({ opacity: '0', transform: 'scale(0)' }),
        animate('0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)', offset: 0}),
          style({ opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0)', offset: 1}),
        ]))
      ], {optional: true}),
    ])   
  ])
]);

export const showSomethingElseModalTrigger = trigger('showSomethingElseModal', [
  transition(':enter', [
    group([
      style({ opacity: '0' }),
      animate('0.35s ease-in-out'),
      query('.something-else-modal__content', [
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
      query('.something-else-modal__content', [
        style({ opacity: '0', transform: 'scale(0)' }),
        animate('0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)', offset: 0}),
          style({ opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0)', offset: 1}),
        ]))
      ], {optional: true}),
    ])   
  ])
]);