import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Item} from "../../models/item";
import {CategoryProvider} from "../../providers/database/category";
import {ItemProvider} from "../../providers/database/item";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item = new Item('', '', '', '');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider) {
    if (this.navParams.get("item")) {
      this.item = this.navParams.get("item");
    }
  }

  save() {
    if (this.item.$key) {
      this.itemProvider.editItem(this.item);
    } else {
      this.itemProvider.addNewItem(this.item);
    }
    this.navCtrl.pop();
  }

  remove() {
    this.itemProvider.deleteItem(this.item);
    this.navCtrl.pop();
  }

  generateNewBarcode(): void {
    this.item.barcode = Math.floor(Math.random() * 1000000).toString();
  }

}
