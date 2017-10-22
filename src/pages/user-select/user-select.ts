import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";
import {LendOutProvider} from "../../providers/database/lendout";
import {Item} from "../../models/item";
import {LendOut} from "../../models/lendout";

@Component({
  selector: 'page-user-select',
  templateUrl: 'user-select.html',
})
export class UserSelectPage {

  item: Item;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lendoutProvider: LendOutProvider) {
    this.item = this.navParams.get("item");
  }

  select(user: User) {
    const lendOut: LendOut = new LendOut(user.$key, this.item.$key, new Date());
    this.lendoutProvider.addNewLendOut(lendOut);
    this.navCtrl.pop();
  }

}
