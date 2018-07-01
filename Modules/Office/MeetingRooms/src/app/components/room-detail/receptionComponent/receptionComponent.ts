import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutofocusDirective } from '../../../shared/autofocus.directive'
import { receptionSlideStateTrigger } from '../../../shared/route-animations';
import { showServiceModalTrigger, showReceptionModalTrigger, showSnackModalTrigger, showSomethingElseModalTrigger } from './reception.animation';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'reception-component',
  templateUrl: './receptionComponent.html',
  styleUrls: ['./receptionComponent.scss'],
  animations: [
    receptionSlideStateTrigger, // from shared folder, animates the whole component
    showServiceModalTrigger, // from local (this) folder, animates individual block elements
    showReceptionModalTrigger,
    showSnackModalTrigger,
    showSomethingElseModalTrigger
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReceptionComponent implements OnInit {
  @HostBinding('@receptionSlideState') routeAnimation = true;
  serviceModalIsShown: boolean = false;
  receptionModalIsShown: boolean = false;
  snackModalIsShown: boolean = false;
  somethingElseModalIsShown: boolean = false;
  receptionModalFlip: boolean = true;

  // public pinNumber: string = '';
  // public pinNumber2: string = '';

  private currentRoute;

  form: FormGroup;
  form2: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.form = fb.group({
      pinNumber: ["", Validators.required]
    });
    this.form2 = fb.group({
      pinNumber: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.currentRoute = this.route.parent.snapshot.params['name'];

    // $("body").css("background-color", 'var(--color-navy-dark-2)');
  }

  onReceptionPinSubmit() {
    let asdf = this.form.get('pinNumber').value;
    if (asdf === '1234') {
      $('.card__side-front').css({
        "transform": "translate(-50%, -50%) rotatex(180deg)"
      });
      $('.card__side-back').css({
        "transform": "translate(-50%, -50%) rotatex(0deg)"
      });
    } else {
      $('.card__side-front').removeClass('card__animation').animate({ 'nothing': null }, 1, function () {
        $(this).addClass('card__animation');
      });
    };
    this.rebuildForm();
  }

  rebuildForm() {
    this.form.reset({
      pinNumber: ''
    });
  }
  rebuildForm2() {
    this.form2.reset({
      pinNumber: ''
    });
  }

  onSnackPinSubmit() {
    let asdf = this.form2.get('pinNumber').value;
    if (asdf === '1234') {
      // this.router.navigate([{outlets:{roomDetail: 'snacks'}}]);
      // this.router.navigate([{outlets:{roomDetail: 'snacks'}}], { relativeTo: this.route });
      // this.router.navigate(['snacks'], { relativeTo: this.route });
      //this.router.navigate(['',{outlets: {'roomDetail':'home'}}]);
      this.router.navigateByUrl('(roomDetail:snacks)');
    } else {
      $('.card__side-front').removeClass('card__animation').animate({ 'nothing': null }, 1, function () {
        $(this).addClass('card__animation');
      })
    };
    this.rebuildForm2()
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

  closeReceptionModal() {
    $('.reception-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.card').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
    $('.card__side-front').css({
      "transform": "translate(-50%, -50%) rotatex(0deg)"
    });
    $('.card__side-back').css({
      "transform": "translate(-50%, -50%) rotatex(-180deg)"
    });
  }

  openSnackPinModal() {
    $('.snack-modal').css({
      "opacity": "1", "visibility": "visible"
    });
    $('.snack-modal__content').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  }

  closeSnackPinModal() {
    $('.snack-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.snack-modal__content').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
  }

  openSomethingElseModal() {
    $('.something-else-modal').css({
      "opacity": "1", "visibility": "visible"
    });
    $('.something-else-modal__content').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  }

  closeSomethingElseModal() {
    $('.something-else-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.something-else-modal__content').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
  }

  onSnackSubmit() {
    this.router.navigate(['snacks'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}