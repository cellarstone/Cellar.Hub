import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { transition } from '@angular/core/src/animation/dsl';
// import { SnackCategory } from '../../model/snack-category';

declare var $: any;

@Component({
  selector: 'reception-component',
  templateUrl: './receptionComponent.html',
  styleUrls: ['./receptionComponent.scss']
})
export class ReceptionComponent implements OnInit {
  pinNumber: string = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    $("body").css("background-color", "#03A9F4");
  }

  openServiceModal() {
    $('.service-modal').css({
      "opacity": "1", "visibility": "visible"
    });

    $('.service-modal__content').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  }

  closeServiceModal() {
    $('.service-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.service-modal__content').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
  }

  openReceptionPinModal() {
    $('.reception-modal').css({
      "opacity": "1", "visibility": "visible"
    });
    $('.card').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  }

  closeReceptionPinModal() {
    $('.reception-modal').css({
      "opacity": "0", "visibility": "hidden"
    })
    $('.card').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
  }

  onReceptionPinSubmit() {
    if (this.pinNumber === '1234') {
      $('.card__side-front').css({
        "transform": "translate(-50%, -50%) rotatex(180deg)"
      });
      $('.card__side-back').css({
        "transform": "translate(-50%, -50%) rotatex(0deg)"
      });
      this.pinNumber = '';
    } else {
      $('.card__side-front').removeClass('card__animation').animate({ 'nothing': null }, 1, function () {
        $(this).addClass('card__animation');
      });
      this.pinNumber = '';
    };
  }

  closeReceptionModal(){
    $('.reception-modal').css({
      "opacity":"0", "visibility":"hidden"
    });
    $('.card').css({
      "transform":"translate(-50%, -50%) scale(0)"
    });
    $('.card__side-front').css({
      "transform": "translate(-50%, -50%) rotatex(0deg)"
    });
    $('.card__side-back').css({
      "transform": "translate(-50%, -50%) rotatex(-180deg)"
    });
  }

  openSnackPinModal(){
    $('.snack-modal').css({
      "opacity":"1", "visibility":"visible"
    });
    $('.snack-modal__content').css({
      "transform":"translate(-50%, -50%) scale(1)"
    });
  }

  closeSnackPinModal(){
    $('.snack-modal').css({
      "opacity":"0", "visibility":"hidden"
    });
    $('.snack-modal__content').css({
      "transform":"translate(-50%, -50%) scale(0)"
    });
  }

  onSnackPinSubmit(){
    if (this.pinNumber === '1234') {
      this.router.navigate(['room/:id/reception/snacks']);
      this.pinNumber = '';
    } else {
      $('.snack-shake').removeClass('snack__pin--animation').animate({ 'nothing': null }, 1, function () {
        $(this).addClass('snack__pin--animation');
      })
      this.pinNumber = '';
    };
  }

  openSomethingElseModal(){
    $('.something-else-modal').css({
      "opacity":"1", "visibility":"visible"
    });
    $('.something-else-modal__content').css({
      "transform":"translate(-50%, -50%) scale(1)"
    });
  }

  closeSomethingElseModal(){
    $('.something-else-modal').css({
      "opacity":"0", "visibility":"hidden"
    });
    $('.something-else-modal__content').css({
      "transform":"translate(-50%, -50%) scale(0)"
    });
  }

  // openReceptionPinModal(){
  //   $('.pin-modal').css({
  //     "opacity": "1", "visibility": "visible"
  //   });
  //   $('.pin-modal__content').css({
  //     "transform":"translate(-50%, -50%) scale(1)"
  //   });
  // }

  // closeReceptionPinModal(){
  //   $('.pin-modal').css({
  //     "opacity": "0", "visibility": "hidden"
  //   });
  //   $('.pin-modal__content').css({
  //     "transform":"translate(-50%, -50%) scale(0)"
  //   });
  // }

  // onReceptionSubmit(){
  //   if(this.pinNumber != 1234){
  //     console.log('WRONG PIN MOTHERFUCKER!');
  //     // $('.pin-modal__content').css({
  //     //   "transform": "translate(-50%, -50%)",
  //     //   "animation": "shaking 2s"
  //     // });
  //   } else {
  //     $('.pin-modal__content').css({
  //       "transform":"translate(-50%,-50%) scale(0)"
  //     });
  //     $('.reception-modal__content').css({
  //       "opacity":"1", "visibility":"visible",
  //       "transform":"translate(-50%, -50%) scale(1)"
  //     });
  //   }
  // }

  // closeReceptionModal(){
  //   $('.reception-modal__content').css({
  //     "opacity":"0", "visibility":"hidden",
  //     "transform":"translate(-50%, -50%) scale(0)"
  //   });
  //   $('.pin-modal').css({
  //     "opacity": "0", "visibility": "hidden"
  //   });
  // }


  onSnacksSubmit() {
    this.router.navigate(['room/:id/reception/snacks']);
  }

}