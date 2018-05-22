import {
  trigger,
  state,
  keyframes,
  style,
  animate,
  transition,
  group,
  stagger,
  query
} from "@angular/animations";

export const snackSlideStateTrigger = trigger("snackSlideState", [
  transition(":enter", [
    group([
      style({
        transform: "scale(0)",
        // opacity: "0"
      }),
      animate(
        "350ms cubic-bezier(0,.99,.57,1)",
        style({
          transform: "scale(1)",
          // opacity: "1"
        })
      ),
      
    ])
    // query(
    //   ".snack-category",
    //   style({
    //     opacity: "0",
    //     transform: "translateY(-100%)"
    //   }),
    //   { optional: true }
    // ),
    // query(
    //   ".snack-category",
    //   stagger("150ms", [
    //     animate(
    //       "500ms 500ms ease-out",
    //       style({
    //         opacity: "1",
    //         transform: "translateY(0)"
    //       })
    //     )
    //   ]),
    //   { optional: true }
    // )
  ])
  
]);

export const snacksMenuTrigger = trigger('snacksMenu', [
  transition(':enter', [
    query('.snack-category', style({
      opacity: "0",
      transform: "translateY(-100%)"
    }), {optional: true}),

    query(
      ".snack-category",
      stagger("150ms", [
        animate(
          "500ms 100ms ease-out",
          style({
            opacity: "1",
            transform: "translateY(0)"
          })
        )
      ]),
      { optional: true }
    )
  ]),
  // transition(':leave', [
  //   query('.snack-category', style({
  //     opacity: "1",
  //     transform: "translateY(0)"
  //   }), {optional: true}),

  //   query(
  //       ".snack-category",
  //       stagger("150ms", [
  //         animate(
  //           "500ms 500ms ease-out",
  //           style({
  //             opacity: "0",
  //             transform: "translateY(100%)"
  //           })
  //         )
  //       ]),
  //       { optional: true }
  //     )
  // ])
]);

export const snacksSubcategoriesMenuTrigger = trigger('snacksSubcategoriesMenu', [
  transition(':enter', [
    query('.snack-item', style({
      opacity: "0",
      transform: "translateX(-100%)"
    }), {optional: true}),

    query(
      ".snack-item",
      stagger("100ms", [
        animate(
          "350ms 100ms ease-out",
          style({
            opacity: "1",
            transform: "translateX(0)"
          })
        )
      ]),
      { optional: true }
    )
  ]),
]);

export const shoppingCartItemsTrigger = 
  trigger('shoppingCartItems', [
    // state('in', style({backgroundColor: 'red',transform: 'translateX(0)'})),
  
    transition(':enter', [
      style({
        opacity: '0',
        transform: 'translateX(-25%) scale(.85)'
      }),
      animate('500ms cubic-bezier(0,.99,.57,1)', style({
        opacity: '1',
        transform: 'translateX(0) scale(1)'
      }))
    ]),
    transition(':leave', [
      style({
        opacity: '1',
        transform: 'translateX(0) scale(1)'
      }),
      animate('500ms cubic-bezier(0,.99,.57,1)', style({
        opacity: '0',
        transform: 'translateX(50%) scale(.85)'
      }))
    ])
]);