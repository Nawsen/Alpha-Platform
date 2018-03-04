import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {CategoryProvider} from "../../providers/database/category";
import {LendOut} from "../../models/lendout";
import {UserProvider} from "../../providers/database/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user";
import {UserPage} from "../user/user";
import {ItemViewPage} from "../item-view/item-view";

@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {

  user: User;

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
    if (this.navParams.get("user")) {
      this.user = this.navParams.get("user");
    }
    if (this.navParams.get("userId")) {
      const loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present();
      this.userProvider.findUserById(this.navParams.get('userId')).subscribe(user => {
        this.user = user;
        loading.dismiss();
      });
    }
    this.lendOutProvider.getLendoutsByUser(this.user.$key)
      .map((data: LendOut[]) => data.sort((a, b) => a.checkOutTime > b.checkOutTime ? -1 : 1))
      .subscribe((resp: LendOut[]) => {
        this.history = resp;
        if (this.history[0]) {
          this.stock = !!this.history[0].checkInTime;
        }
      });
  }

  public openEdit(): void {
    this.navCtrl.push(UserPage, {user: this.user});
  }

  public deleteItem(): void {
    this.userProvider.deleteUser(this.user);
    this.navCtrl.pop();
  }

  public findItemNameById(key) {
    if (!this.names.get(key)) {
      this.names.set(key, this.itemProvider.findItemById(key).map(u => u.name));
    }
    return this.names.get(key);
  }

  public goToItem(itemId: string) {
    this.navCtrl.push(ItemViewPage, {itemId: itemId});
  }
}
