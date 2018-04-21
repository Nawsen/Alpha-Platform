import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {CategoryProvider} from "../../providers/database/category";
import {Item} from "../../models/item";
import {ItemPage} from "../item/item";
import {LendOut} from "../../models/lendout";
import {UserProvider} from "../../providers/database/user";
import {Observable} from "rxjs/Observable";
import {LendingUserPage} from "../lending-user/lending-user";
import {UserViewPage} from "../user-view/user-view";

@Component({
  selector: 'page-item-view',
  templateUrl: 'item-view.html',
})
export class ItemViewPage {

  item: Item;

  stock: boolean = true;

  history: LendOut[] = [];

  names: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider,
              private lendOutProvider: LendOutProvider,
              private userProvider: UserProvider,
              public loadingCtrl: LoadingController) {
    if (this.navParams.get("item")) {
      this.item = this.navParams.get("item");
    }
    if (this.navParams.get('itemId')) {
      const loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present().then(() => {
        this.itemProvider.findItemById(this.navParams.get('itemId')).subscribe(item => {
          this.item = item;
          loading.dismiss();
        });
      });
    }
    this.lendOutProvider.getLendoutsByItem(this.item.$key)
      .map((data: LendOut[]) => data.sort((a, b) => a.checkOutTime > b.checkOutTime ? -1 : 1))
      .subscribe((resp: LendOut[]) => {
        this.history = resp;
        if (this.history[0]) {
          this.stock = !!this.history[0].checkInTime;
        }
      });
  }

  public lendoutItem(): void {
    this.navCtrl.push(LendingUserPage, {item: this.item});
  }

  public returnItem(): void {
    this.history[0].checkInTime = Date.now();
    this.lendOutProvider.editLendOut(this.history[0])
  }

  public openEdit(): void {
    this.navCtrl.push(ItemPage, {item: this.item});
  }

  public deleteItem(): void {
    this.itemProvider.deleteItem(this.item);
    this.navCtrl.pop();
  }

  public findUserNameById(key) {
    if (!this.names.get(key)) {
      this.names.set(key, this.userProvider.findUserById(key).map(u => u.name));
    }
    return this.names.get(key);
  }

  public goToUser(userId: string): void {
    this.navCtrl.push(UserViewPage, {userId: userId});
  }

}
