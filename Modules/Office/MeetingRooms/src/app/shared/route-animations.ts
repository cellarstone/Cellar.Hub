import {
  transition,
  trigger,
  style,
  animate,
  query,
  group,
  stagger
} from "@angular/animations";

export const calendarSlideStateTrigger = trigger("calendarSlideState", [
  transition(":enter", [
    group([
      style({
        opacity: "0"
      }),
      animate(
        "1s ease-in-out",
        style({
          opacity: "1"
        })
      ),
      query(
        ".calendar",
        [
          style({
            transform: "translateX(-25%)",
            opacity: "0"
          }),
          animate("1.25s 100ms cubic-bezier(0,.99,.57,1)")
        ],
        { optional: true }
      ),
      query(
        ".booking",
        [
          style({
            transform: "translateX(25%)",
            opacity: "0"
          }),
          animate("1.25s 100ms cubic-bezier(0,.99,.57,1)")
        ],
        { optional: true }
      )
    ])
  ]),
  transition(
    ":leave",
    animate(
      ".35s ease-in",
      style({
        opacity: "0"
      })
    )
  )
]);

export const homeSlideStateTrigger = trigger("homeSlideState", [
  transition(":enter", [
    style({
      // transform: 'translateY(-100%)',
      opacity: "0"
    }),
    animate(".75s ease-out")
  ]),
  transition(
    ":leave",
    animate(
      ".35s ease-in",
      style({
        // transform: 'translateY(100%)',
        opacity: "0"
      })
    )
  )
]);

export const receptionSlideStateTrigger = trigger("receptionSlideState", [
  transition(":enter", [
    group([
      query(
        "#service-icon",
        [
          style({
            opacity: "0",
            transform: "translateX(-75%)"
          }),
          animate(".5s ease-out")
        ],
        { optional: true }
      ),
      query(
        "#summoning-icon",
        [
          style({
            opacity: "0",
            transform: "translateY(-75%)"
          }),
          animate(".5s ease-out")
        ],
        { optional: true }
      ),
      query(
        "#snacks-icon",
        [
          style({
            opacity: "0",
            transform: "translateY(75%)"
          }),
          animate(".5s ease-out")
        ],
        { optional: true }
      ),
      query(
        "#something-icon",
        [
          style({
            opacity: "0",
            transform: "translateX(75%)"
          }),
          animate(".5s ease-out")
        ],
        { optional: true }
      )
    ])
  ]),
  transition(":leave", [
    
    style({
      opacity: "1",
     
    }),
    animate(".25s ease-out", style({
      opacity: '0'
    }))
  ])
]);
