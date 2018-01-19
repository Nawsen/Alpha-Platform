import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Item} from "../../models/item";
import {CategoryProvider} from "../../providers/database/category";
import {ItemProvider} from "../../providers/database/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {LendOut} from "../../models/lendout";
import {UserProvider} from "../../providers/database/user";
import {User} from "../../models/user";

@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item: Item = new Item("", "", "");

  history: LendOut[] = [];

  users: User[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider,
              private lendOutProvider: LendOutProvider,
              public userProvider: UserProvider) {
    if (this.navParams.get("item")) {
      this.item = this.navParams.get("item");
      //get all users
      this.userProvider.users.subscribe((resp: User[]) => {
        this.users = resp;
      });
      //get history
      this.lendOutProvider.lendOuts.subscribe((resp: LendOut[]) => {
        this.history = [];
        for(let lendOut of resp) {
          if (lendOut.itemId === this.item.$key) {
            this.history.push(lendOut);
          }
        }
        this.history.reverse();
      });
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

  findUser(key: string): User {
    for (const user of this.users) {
      if (user.$key === key) {
        return user;
      }
    }
  }

}
