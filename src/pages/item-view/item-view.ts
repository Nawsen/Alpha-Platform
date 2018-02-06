import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {CategoryProvider} from "../../providers/database/category";
import {Item} from "../../models/item";
import {ItemPage} from "../item/item";
import {LendOut} from "../../models/lendout";
import {UserProvider} from "../../providers/database/user";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})
export class ItemViewPage {

  item: Item;

  stock: boolean;

  history: LendOut[] = [];

  names: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider,
              private lendOutProvider: LendOutProvider,
              private userProvider: UserProvider) {
    if (this.navParams.get("item")) {
      this.item = this.navParams.get("item");
    }
    this.lendOutProvider.getLendoutsByItem(this.item.$key).subscribe((resp: LendOut[]) => {
      this.history = resp;
      this.history.reverse();
    });

  }

  public openEdit(): void {
    this.navCtrl.push(ItemPage, {item: this.item});
  }

  public deleteItem(): void {
    this.itemProvider.deleteItem(this.item);
  }

  public findUserNameById(key) {
    if (!this.names.get(key)) {
      this.names.set(key, this.userProvider.findUserById(key).map(u => u.name ? u.name : 'noName'));
    }
    return this.names.get(key);
  }
}
