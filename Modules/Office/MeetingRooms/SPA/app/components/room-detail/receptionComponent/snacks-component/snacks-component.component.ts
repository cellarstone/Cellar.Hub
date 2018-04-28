import { Component, OnInit, HostBinding } from '@angular/core';
import { SortimentItem } from 'app/models/SortimentItem';
import { Router } from '@angular/router';
import { snackSlideStateTrigger, snacksMenuTrigger, snacksSubcategoriesMenuTrigger, shoppingCartItemsTrigger } from './snacks.animation';
// import { snackMenuAnimationTrigger } from './snacks.animation';



declare var $: any;
@Component({
  selector: 'app-snacks-component',
  templateUrl: './snacks-component.component.html',
  styleUrls: ['./snacks-component.component.scss'],
  animations: [
    snackSlideStateTrigger,
    // snackMenuAnimationTrigger
    snacksMenuTrigger,
    snacksSubcategoriesMenuTrigger,
    shoppingCartItemsTrigger
  ]
  
})
export class SnacksComponentComponent implements OnInit {
  @HostBinding('@snackSlideState') routeAnimation = true;

  selectedOrder: Array<SortimentItem> = new Array<SortimentItem>();
  snackMenuItems: Array<SortimentItem> = new Array<SortimentItem>();
  selectedSnackMenuItem: SortimentItem = new SortimentItem();
  beforeSelectedSnackMenuItem: SortimentItem = new SortimentItem();
  showSnackMenu: boolean = true;

  alertItem: boolean = false;
  mouseHold: boolean = false;
  
  showSnacks: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

    // $("body").css("background-color", "#03A9F4");

    /////////////////////////////////////////////// CATEGORIES /////////////////////////////////////////////// 

    let beverages = new SortimentItem();
    beverages.id = "1";
    beverages.name = "beverages";
    beverages.color = 'rgb(3, 169, 244)';
    beverages.svg = "../../assets/snack-category-icons/categories/water.svg";
    beverages.childItems = new Array<SortimentItem>();

    let snacks = new SortimentItem();
    snacks.id = "2";
    snacks.name = "snacks";
    snacks.color = '#fab1a0';
    snacks.svg = "../../assets/snack-category-icons/categories/cookie.svg";
    snacks.childItems = new Array<SortimentItem>();

    //////////////////////////////////////// BEVERAGES (subcategory) //////////////////////////////////////////

    let coffee = new SortimentItem();
    coffee.id = "1.1";
    coffee.name = "coffees";
    coffee.svg = "../../assets/snack-category-icons/beverages/coffee.svg";
    coffee.childItems = new Array<SortimentItem>();

    let espresso = new SortimentItem();
    espresso.id = "1.1.1";
    espresso.name = "espresso";
    espresso.svg = '';
    espresso.color = '#38250e';
    espresso.amount = 0;
    espresso.childItems = new Array<SortimentItem>();
    coffee.childItems.push(espresso);

    let americano = new SortimentItem();
    americano.id = "1.1.2";
    americano.name = "americano";
    americano.svg = '';
    americano.color = '#2a1b0a'
    americano.amount = 0;
    americano.childItems = new Array<SortimentItem>();
    coffee.childItems.push(americano);

    let latte = new SortimentItem();
    latte.id = "1.1.3";
    latte.name = "latte";
    latte.svg = '';
    latte.color = '#8B4513';
    latte.amount = 0;
    latte.childItems = new Array<SortimentItem>();
    coffee.childItems.push(latte);

    let cappuccino = new SortimentItem();
    cappuccino.id = "1.1.4";
    cappuccino.name = "cappuccino";
    cappuccino.svg = '';
    cappuccino.color = '#A0522D';
    cappuccino.amount = 0;
    cappuccino.childItems = new Array<SortimentItem>();
    coffee.childItems.push(cappuccino);

    beverages.childItems.push(coffee);

    // TEAS

    let tea = new SortimentItem();
    tea.id = '1.2';
    tea.name = 'teas';
    tea.svg = "../../assets/snack-category-icons/beverages/green-tea.svg";
    tea.childItems = new Array<SortimentItem>();

    let greenTea = new SortimentItem();
    greenTea.id = "1.2.1";
    greenTea.name = "green tea";
    greenTea.svg = "";
    greenTea.color = '#99e6b3';
    greenTea.amount = 0;
    greenTea.childItems = new Array<SortimentItem>();
    tea.childItems.push(greenTea);

    let redTea = new SortimentItem();
    redTea.id = "1.2.2";
    redTea.name = "red tea";
    redTea.svg = "";
    redTea.color = '#ff9999';
    redTea.amount = 0;
    redTea.childItems = new Array<SortimentItem>();
    tea.childItems.push(redTea);


    let blackTea = new SortimentItem();
    blackTea.id = "1.2.3";
    blackTea.name = "black tea";
    blackTea.svg = "";
    blackTea.color = '#801a08';
    blackTea.amount = 0;
    blackTea.childItems = new Array<SortimentItem>();
    tea.childItems.push(blackTea);

    beverages.childItems.push(tea);
    

    // SODA & WATER

    let soda = new SortimentItem();
    soda.id = '1.3';
    soda.name = 'soda & water';
    soda.svg = "../../assets/snack-category-icons/beverages/soda.svg";
    soda.childItems = new Array<SortimentItem>();

    let cocaCola = new SortimentItem();
    cocaCola.id = "1.3.1";
    cocaCola.name = "coca cola";
    cocaCola.amount = 0;
    cocaCola.svg = "";
    cocaCola.color = '#fe001a';
    cocaCola.childItems = new Array<SortimentItem>();
    soda.childItems.push(cocaCola);

    let fanta = new SortimentItem();
    fanta.id = "1.3.2";
    fanta.name = "fanta";
    fanta.amount = 0;
    fanta.svg = "";
    fanta.color = '#FE6C00';
    fanta.childItems = new Array<SortimentItem>();
    soda.childItems.push(fanta);

    let water = new SortimentItem();
    water.id = "1.3.3";
    water.name = "water";
    water.amount = 0;
    water.svg = "";
    water.color = 'lightblue';
    water.childItems = new Array<SortimentItem>();
    soda.childItems.push(water);

    beverages.childItems.push(soda);



    this.snackMenuItems.push(beverages);
    
    ///////////////////////////////////////// SNACKS (subcategory) ///////////////////////////////////////////

    // SWEETS
    let sweets = new SortimentItem();
    sweets.id = '2.1';
    sweets.name = 'sweets';
    sweets.svg = "../../assets/snack-category-icons/snacks/cookies.svg";
    sweets.childItems = new Array<SortimentItem>();

    let cookie = new SortimentItem();
    cookie.id = "2.1.1";
    cookie.name = "cookie";
    cookie.amount = 0;
    cookie.svg = "";
    cookie.color = '#925800';
    cookie.childItems = new Array<SortimentItem>();
    sweets.childItems.push(cookie);

    let brownie = new SortimentItem();
    brownie.id = "2.1.2";
    brownie.name = "brownie";
    brownie.amount = 0;
    brownie.svg = "";
    brownie.color = '#653434';
    brownie.childItems = new Array<SortimentItem>();
    sweets.childItems.push(brownie);

    snacks.childItems.push(sweets);

    // FRUITS

    let fruits = new SortimentItem();
    fruits.id = '2.2';
    fruits.name = 'fruits';
    fruits.svg = "../../assets/snack-category-icons/snacks/fruits.svg";
    fruits.childItems = new Array<SortimentItem>();

    let apple = new SortimentItem();
    apple.id = "2.2.1";
    apple.name = "apple";
    apple.amount = 0;
    apple.svg = "";
    apple.color = '#8db600';
    apple.childItems = new Array<SortimentItem>();
    fruits.childItems.push(apple);

    let banana = new SortimentItem();
    banana.id = "2.2.2";
    banana.name = "banana";
    banana.amount = 0;
    banana.svg = "";
    banana.color = '#FFE135';
    banana.childItems = new Array<SortimentItem>();
    fruits.childItems.push(banana);

    let orange = new SortimentItem();
    orange.id = "2.2.3";
    orange.name = "orange";
    orange.amount = 0;
    orange.svg = "";
    orange.color = '#ffa500';
    orange.childItems = new Array<SortimentItem>();
    fruits.childItems.push(orange);

    let strawberry = new SortimentItem();
    strawberry.id = "2.2.4";
    strawberry.name = "strawberry";
    strawberry.amount = 0;
    strawberry.svg = "";
    strawberry.color = '#fa0652 ';
    strawberry.childItems = new Array<SortimentItem>();
    fruits.childItems.push(strawberry);

    let grape = new SortimentItem();
    grape.id = "2.2.5";
    grape.name = "grape";
    grape.amount = 0;
    grape.svg = "";
    grape.color = '#421C52';
    grape.childItems = new Array<SortimentItem>();
    fruits.childItems.push(grape);

    let mango = new SortimentItem();
    mango.id = "2.2.6";
    mango.name = "mango";
    mango.amount = 0;
    mango.svg = "";
    mango.color = '#FF8243';
    mango.childItems = new Array<SortimentItem>();
    fruits.childItems.push(mango);

    snacks.childItems.push(fruits);

    // YOGHURTS

    let yogurts = new SortimentItem();
    yogurts.id = '2.3';
    yogurts.name = 'yogurts';
    yogurts.svg = "../../assets/snack-category-icons/snacks/yogurt.svg";
    yogurts.childItems = new Array<SortimentItem>();

    let lowFatYogurt = new SortimentItem();
    lowFatYogurt.id = "2.3.1";
    lowFatYogurt.name = "low-fat yogurt";
    lowFatYogurt.amount = 0;
    lowFatYogurt.svg = "";
    lowFatYogurt.color = '#fffeea';
    lowFatYogurt.childItems = new Array<SortimentItem>();
    yogurts.childItems.push(lowFatYogurt);

    
    let strawberryYogurt = new SortimentItem();
    strawberryYogurt.id = "2.3.2";
    strawberryYogurt.name = "strawberry yogurt";
    strawberryYogurt.amount = 0;
    strawberryYogurt.svg = "";
    strawberryYogurt.color = '#ffc3d8';
    strawberryYogurt.childItems = new Array<SortimentItem>();
    yogurts.childItems.push(strawberryYogurt);

    let vanillaYogurt = new SortimentItem();
    vanillaYogurt.id = "2.3.3";
    vanillaYogurt.name = "vanillaYogurt";
    vanillaYogurt.amount = 0;
    vanillaYogurt.svg = "";
    vanillaYogurt.color = '#f8f1cd';
    vanillaYogurt.childItems = new Array<SortimentItem>();
    yogurts.childItems.push(vanillaYogurt);

    snacks.childItems.push(yogurts);

    this.snackMenuItems.push(snacks);
  }


  openAlertModal() {
    $('.alert-modal').css({
      "opacity": "1", "visibility": "visible"
    });
    $('.alert-content').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  };

  closeAlertModal() {
    $('.alert-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.alert-content').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
  };

  openShoppingAlertModal() {
    $('.shopping-alert-modal').css({
      "opacity": "1", "visibility": "visible"
    });
    $('.shopping-alert-content').css({
      "transform": "translate(-50%, -50%) scale(1)"
    });
  };

  closeShoppingAlertModal() {
    $('.shopping-alert-modal').css({
      "opacity": "0", "visibility": "hidden"
    });
    $('.shopping-alert-content').css({
      "transform": "translate(-50%, -50%) scale(0)"
    });
    this.router.navigate(['/room', 'propan', 'reception']);
  };

  increaseItem(item: SortimentItem) {
    
    item.amount++;
    
  }

  decreaseItem(item: any) {
    item.amount--;
    if (item.amount === 0 || item.amount < 1) {
      this.removeItem(item);
    }
    
  }

  removeItem(item: any) {
    item.amount = 0;
    const index = this.selectedOrder.indexOf(item);
    this.selectedOrder.splice(index, 1);
  }

  sendOrder() {
    console.log(this.selectedOrder);
    this.openShoppingAlertModal();
    this.selectedOrder = [];
    setTimeout(() => {
      this.router.navigate(['/room', 'propan', 'reception']);
    }, 3000);
    
  }

  selectItem(item: SortimentItem) {

    //We are on last item in hierarchy

    if (item.childItems.length === 0) {
      this.showSnackMenu = true;
      if (this.selectedOrder.length > 0) {

        let isExist = false;

        let cloned = this.selectedOrder.map(x => Object.assign({}, x));

        for (let n = 0; n < cloned.length; n++) {
          if (item.id === cloned[n].id) {
            isExist = true
          }
        }

        if (isExist) {
          this.openAlertModal();
        } else {
          item.amount = 0;
          item.amount++;
          this.selectedOrder.push(item);
        }

      } else {
        item.amount = 0;
        item.amount++;
        this.selectedOrder.push(item);
      }

    }
    else {
      this.showSnackMenu = false;
      this.beforeSelectedSnackMenuItem = this.selectedSnackMenuItem;
      this.selectedSnackMenuItem = item;
    }

  }
  subcategoryBack() {

    //1. LEVEL
    for (var i = 0; i < this.snackMenuItems.length; i++) {
      var p = this.snackMenuItems[i];

      //2. LEVEL
      for (var j = 0; j < p.childItems.length; j++) {
        var ch = p.childItems[j];

        if (ch.name == this.selectedSnackMenuItem.name) {
          this.selectedSnackMenuItem = p;
          return;
        }

        //3. LEVEL
        for (var k = 0; k < ch.childItems.length; k++) {
          var ch2 = ch.childItems[k];

          if (ch2.name == this.selectedSnackMenuItem.name) {
            this.selectedSnackMenuItem = ch;
            return;
          }

          //4. LEVEL
          for (var l = 0; l < ch.childItems.length; l++) {
            var ch3 = ch.childItems[l];

            if (ch3.name == this.selectedSnackMenuItem.name) {
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