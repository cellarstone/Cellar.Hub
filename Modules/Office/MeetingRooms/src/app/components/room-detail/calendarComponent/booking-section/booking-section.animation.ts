import { trigger, state, animate, transition, style, group, query, keyframes } from '@angular/animations';

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