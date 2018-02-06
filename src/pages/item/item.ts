import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Item} from "../../models/item";
import {CategoryProvider} from "../../providers/database/category";
import {ItemProvider} from "../../providers/database/item";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider,
              private camera: Camera) {
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

}
