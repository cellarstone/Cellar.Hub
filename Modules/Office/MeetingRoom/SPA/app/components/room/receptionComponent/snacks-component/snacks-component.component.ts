import { Component, OnInit } from '@angular/core';
import { SortimentItem } from '../../../../entities/sortimentItem';

declare var $:any;
@Component({
  selector: 'app-snacks-component',
  templateUrl: './snacks-component.component.html',
  styleUrls: ['./snacks-component.component.scss']
})
export class SnacksComponentComponent implements OnInit {
  selectedOrder: Array<SortimentItem> = new Array<SortimentItem>();
  snackMenuItems: Array<SortimentItem> = new Array<SortimentItem>();
  selectedSnackMenuItem: SortimentItem = new SortimentItem();
  beforeSelectedSnackMenuItem: SortimentItem = new SortimentItem();
  showSnackMenu: boolean = true;

  constructor() { }

  ngOnInit() {

    $("body").css("background-color", "#03A9F4");

    let new1110 = new SortimentItem();
    new1110.id = "1";
    new1110.name = "Tea";
    new1110.svg = "../../assets/snack-category-icons/tea.svg";
    new1110.childItems = new Array<SortimentItem>();

    let new1111 = new SortimentItem();
    new1111.id = "11";
    new1111.name = "Black Tea";
    new1111.svg = "";
    new1111.childItems = new Array<SortimentItem>();
    

    let new11111 = new SortimentItem();
    new11111.id = "111";
    new11111.name = "Teekane";
    new11111.svg = "";
    new11111.childItems = new Array<SortimentItem>();
    new1111.childItems.push(new11111);

    let new11112 = new SortimentItem();
    new11112.id = "112";
    new11112.name = "Dilmah";
    new11112.svg = "";
    new11112.childItems = new Array<SortimentItem>();
    new1111.childItems.push(new11112);

    let new11113 = new SortimentItem();
    new11113.id = "112";
    new11113.name = "Pickwick";
    new11113.svg = "";
    new11113.childItems = new Array<SortimentItem>();
    new1111.childItems.push(new11113);

    new1110.childItems.push(new1111);

    let new1112 = new SortimentItem();
    new1112.id = "12";
    new1112.name = "Green Tea";
    new1112.svg = "";
    new1112.childItems = new Array<SortimentItem>();
    new1110.childItems.push(new1112);

    let new1113 = new SortimentItem();
    new1113.id = "13";
    new1113.name = "Red Tea";
    new1113.svg = "";
    new1113.childItems = new Array<SortimentItem>();
    new1110.childItems.push(new1113);
    this.snackMenuItems.push(new1110);

    let new1120 = new SortimentItem();
    new1120.id = "2";
    new1120.name = "Coffee";
    new1120.svg = "../../assets/snack-category-icons/coffee.svg";
    new1120.childItems = new Array<SortimentItem>();

    let new1121 = new SortimentItem();
    new1121.id = "21";
    new1121.name = "Espresso";
    new1121.svg = "";
    new1121.childItems = new Array<SortimentItem>();

    let new1122 = new SortimentItem();
    new1122.id = "22";
    new1122.name = "Double Espresso";
    new1122.svg = "";
    new1122.childItems = new Array<SortimentItem>();

    new1120.childItems.push(new1121);
    new1120.childItems.push(new1122);
    this.snackMenuItems.push(new1120);

    let new1130 = new SortimentItem();
    new1130.id = "3";
    new1130.name = "Fruits";
    new1130.svg = "../../assets/snack-category-icons/apple.svg";
    new1130.childItems = new Array<SortimentItem>();

    let new1131 = new SortimentItem();
    new1131.id = "31";
    new1131.name = "Banana";
    new1131.svg = "";
    new1131.childItems = new Array<SortimentItem>();

    let new1132 = new SortimentItem();
    new1132.id = "32";
    new1132.name = "Apple";
    new1132.svg = "";
    new1132.childItems = new Array<SortimentItem>();    

    let new1133 = new SortimentItem();
    new1133.id = "33";
    new1133.name = "Kiwi";
    new1133.svg = "";
    new1133.childItems = new Array<SortimentItem>();

    new1130.childItems.push(new1131);
    new1130.childItems.push(new1132);
    new1130.childItems.push(new1133);
    this.snackMenuItems.push(new1130)

    let new1140 = new SortimentItem();
    new1140.id = "4";
    new1140.name = "Skrrr pop pop pop ka ka";
    new1140.svg = "../../assets/snack-category-icons/soda.svg";
    new1140.childItems = new Array<SortimentItem>();

    let new1141 = new SortimentItem();
    new1141.id = "41";
    new1141.name = "Coca-Cola";
    new1141.svg = "";
    new1141.childItems = new Array<SortimentItem>();

    let new1142 = new SortimentItem();
    new1142.id = "42";
    new1142.name = "Fanta";
    new1142.svg = "";
    new1142.childItems = new Array<SortimentItem>();

    new1140.childItems.push(new1141);
    new1140.childItems.push(new1142);
    this.snackMenuItems.push(new1140);

  }

  selectItem(item: SortimentItem){

    //We are on last item in hierarchy
    if(item.childItems.length == 0)
    {
      this.showSnackMenu = true;
      this.selectedOrder.push(item);
      console.log(this.selectedOrder);
    }
    else
    {
      this.showSnackMenu = false;
      this.beforeSelectedSnackMenuItem = this.selectedSnackMenuItem;
      this.selectedSnackMenuItem = item;
    }
  }
  subcategoryBack(){
    
    //1. LEVEL
    for (var i = 0; i < this.snackMenuItems.length; i++) {
      var p = this.snackMenuItems[i];

      //2. LEVEL
      for (var j = 0; j < p.childItems.length; j++) {
        var ch = p.childItems[j];

        if(ch.name == this.selectedSnackMenuItem.name){
          this.selectedSnackMenuItem = p;
          return;
        }

        //3. LEVEL
        for (var k = 0; k < ch.childItems.length; k++) {
          var ch2 = ch.childItems[k];
  
          if(ch2.name == this.selectedSnackMenuItem.name){
            this.selectedSnackMenuItem = ch;
            return;
          }
  
          //4. LEVEL
        for (var l = 0; l < ch.childItems.length; l++) {
          var ch3 = ch.childItems[l];
  
          if(ch3.name == this.selectedSnackMenuItem.name){
            this.selectedSnackMenuItem = ch2;
            return;
          }
          //END
        }

        }

      }
  }


this.showSnackMenu = true;

  }

}