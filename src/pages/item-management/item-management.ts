import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ItemPage} from "../item/item";

@Component({
  selector: 'page-item-management',
  templateUrl: 'item-management.html',
})
export class ItemManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  select(item) {
    this.navCtrl.push(ItemPage, {item: item});
  }

}
