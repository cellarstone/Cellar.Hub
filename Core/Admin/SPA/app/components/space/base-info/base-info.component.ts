import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CellarSpace } from 'app/entities/CellarSpace';
import { Message } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'app/service/file.service';

import { environment } from '../../../../environments/environment';

//others
declare var jQuery: any;



@Component({
  selector: 'app-space-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss']
})
export class SpaceBaseInfoComponent implements OnInit {

  @Input()
  item: CellarSpace;

  @Output() onSave = new EventEmitter<CellarSpace>();
  @Output() onDelete = new EventEmitter<CellarSpace>();
  @Output() onCancel = new EventEmitter();

  @Output() onSelectImage = new EventEmitter<any>();

  validations: Message[] = [];
  messagesToUser: Message[] = [];

  private fileServerUrl: string = environment.fileServerUrl;

  //validation properties
  isStateValid: boolean = true;
  isMainPictureValid: boolean = true;
  isNameValid: boolean = true;
  isPathValid: boolean = true;


  deleteModal: boolean = false;
  allowEdit: boolean = false;
  imgUpload: string = 'Change photo';
  pathCheck: any;
  colorMap: any;

  constructor(public fileservice: FileService, private route: ActivatedRoute) { 
    this.colorMap = { 1: 'newStatePanel', 2: 'approvedStatePanel', 3: 'forbiddenStatePanel' };
  }

  ngOnInit() {


    this.pathCheck = {
      newSpace0: this.route.snapshot.params['id']
    }

    if (this.pathCheck.newSpace0 === '0') {
      this.allowEdit = true; 
      this.item.name = 'New Place'; 
      this.imgUpload = 'Upload photo';
    }

    if(this.item.image === '') {
      this.imgUpload = 'Upload a photo';
    } else {
      this.imgUpload = 'Change photo';
    }


  }



  //*********************************/
  /* SPACE */
  //*********************************/


  saveSpace() {

    //validace
    if (this.item.state === "0") {
      this.validations.push({
        severity: 'warn',
        summary: 'State',
        detail: 'State is required'
      });
      this.isStateValid = false;
    }
    else {
      this.isStateValid = true;
    }
    if (!this.item.image) {
      this.validations.push({
        severity: 'warn',
        summary: 'Main Image',
        detail: 'Main Image is required'
      });
      this.isMainPictureValid = false;
    }
    else {
      this.isMainPictureValid = true;
    }
    if (!this.item.name) {
      this.validations.push({
        severity: 'warn',
        summary: 'Name',
        detail: 'Name is required'
      });
      this.isNameValid = false;
    }
    else {
      this.isNameValid = true;
    }
    if (!this.item.path) {
      this.validations.push({
        severity: 'warn',
        summary: 'Path',
        detail: 'Path is required'
      });
      this.isPathValid = false;
    }
    else {
      this.isPathValid = true;
    }


    if (this.validations.length == 0) {

      this.onSave.emit(this.item);

    }
  }


  deleteSpace() {
    this.onDelete.emit(this.item);
  }

  cancelSpace() {
    this.onCancel.emit();
  }



  //*********************************/
  //STATE
  //*********************************/

  selectState(e: any) {
    var aaa = e.srcElement.innerHTML.toLowerCase();




    // for (var i = 0; i < this.statesList.length; i++)
    // {
    //     var abcd = this.statesList[i];

    //     if (abcd.name.toLowerCase() == aaa)
    //     {
    //         this.item.state = abcd;
    //     }
    // }





    if (aaa === "new") {
      this.item.state = "1";
    }
    else if (aaa === "approved") {
      this.item.state = "2";
    }
    else if (aaa === "forbidden") {
      this.item.state = "3";
    }


  }

  //*********************************/
  /* IMAGES */
  //*********************************/

  //File upload - main picture

  addMainPictureChangeEvent(fileInput: any) {

    console.log(fileInput);

    if (fileInput.target.files && fileInput.target.files[0]) {
      let fileToUpload = fileInput.target.files[0];
      console.log(fileToUpload.name);

      this.fileservice.upload(fileToUpload)
        .subscribe(art => {
          let response = art;

          console.log(response);

          //BEZ CHYB ze serveru
          if (response.isOK) {

            var url = response.data as string;

            console.log(url);

            this.item.image = this.fileServerUrl + "/" + url;
            // this.item.image = "http://localhost:44404/" + url;

            console.log(this.item.image);


          }
          //NON-VALID ze serveru
          else if (!response.isValid) {
            //???
            console.error(response.validations);
          }
          //custom ERROR ze serveru
          else if (response.isCustomError) {
            //???
            console.error(response.customErrorText);
          }
          //identity ERROR ze serveru
          else if (response.isIdentityError) {
            //???
            console.error(response.identityErrorText);
          }
          //EXCEPTION ze serveru
          else if (response.isException) {
            //???
            console.error(response.exceptionText);
          }
        },
          error => {
            console.error(error);
          },
          () => {
            console.log('addMainPictureChangeEvent() completed');
          });

    }
  }



}
