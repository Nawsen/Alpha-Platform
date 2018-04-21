import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {CategoryProvider} from "../../providers/database/category";
import {LendOut} from "../../models/lendout";
import {UserProvider} from "../../providers/database/user";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user";
import {UserPage} from "../user/user";
import {ItemViewPage} from "../item-view/item-view";
import {TimeTrackingProvider} from "../../providers/database/time-tracking";
import {TimeTrackingPage} from "../time-tracking/time-tracking";
import {TimeTracking} from "../../models/time-tracking";

declare var BrowserPrint: any;

@Component({
  selector: 'page-user-view',
  templateUrl: 'user-view.html',
})
export class UserViewPage {

  tab: string = "items";

  totalTimeWorked: number;

  user: User;

  stock: boolean = true;

  history: LendOut[] = [];

  timeTrackings: TimeTracking[] = [];

  names: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoryProvider: CategoryProvider,
              private itemProvider: ItemProvider,
              private lendOutProvider: LendOutProvider,
              private userProvider: UserProvider,
              public loadingCtrl: LoadingController,
              public timeTrackingProvider: TimeTrackingProvider,
              public toastCtrl: ToastController) {
    if (this.navParams.get("user")) {
      this.user = this.navParams.get("user");
      this.getLendOuts();
      this.getTrackingByUser();
    }
    if (this.navParams.get("userId")) {
      const loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present().then(() => {
        this.userProvider.findUserById(this.navParams.get('userId')).subscribe(user => {
          this.user = user;
          this.getLendOuts();
          this.getTrackingByUser();
          loading.dismiss();
        });
      });
    }
    if (this.navParams.get('barcode')) {
      const loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present().then(() => {
        this.userProvider.findByBarcode(this.navParams.get('barcode'))
          .map((users: User[]) => users[0])
          .subscribe(user => {
            if (!user) {
              let toast = this.toastCtrl.create({
                message: 'Barcode was not found',
                duration: 3000
              });
              toast.present();
              loading.dismiss();
              this.navCtrl.pop();
              return;
            }
            this.user = user;

            this.getLendOuts();
            this.getTrackingByUser();
            loading.dismiss();
          });
      });
    }


  }

  private getLendOuts() {
    this.lendOutProvider.getLendoutsByUser(this.user.$key)
      .map((data: LendOut[]) => data.sort((a, b) => a.checkOutTime > b.checkOutTime ? -1 : 1))
      .subscribe((resp: LendOut[]) => {
        this.history = resp;
        if (this.history[0]) {
          this.stock = !!this.history[0].checkInTime;
        }
      });
  }

  private getTrackingByUser() {
    this.timeTrackingProvider.getTrackingByUser(this.user.$key)
      .map((data: TimeTracking[]) => data.sort((a, b) => a.time > b.time ? -1 : 1))
      .subscribe((resp: TimeTracking[]) => {
        this.timeTrackings = resp;
        this.calculateTimeWorked();
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

  public addItemTracking(): void {
    this.navCtrl.push(TimeTrackingPage, {user: this.user});
  }

  public getList() {
    return this.timeTrackingProvider.getTrackingByUser(this.user.$key)
  }

  private calculateTimeWorked() {
    const timeline: TimeTracking[] = this.timeTrackings.slice(0).reverse();
    this.totalTimeWorked = 0;
    let lastTimeTrack: number = 0;
    for( let timeTrack of timeline) {
      if (lastTimeTrack !== 0) {
        this.totalTimeWorked = this.totalTimeWorked + (timeTrack.time - lastTimeTrack);
        lastTimeTrack = 0;
      } else {
        lastTimeTrack = timeTrack.time
      }
    }
  }

  public convertMillisToTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    return h + 'h ' + m + 'm';
  }

  public editTime(timeTrack: TimeTracking) {
    this.navCtrl.push(TimeTrackingPage, {user: this.user, timetrack: timeTrack});
  }

  public print() {
    BrowserPrint.getDefaultDevice("printer", (device) => {
      device.send(`^XA
        ^FO20,700^XGE:LOGO.GRF^FS
        ^FO225,1100^ADR,54,30^FD${this.user.name}^FS
        ^FO80,1100^BY5^B3R,N,120,Y,N^FDU${this.user.barcode}^FS
        ^FO225,2000^ADR,54,30^FD${this.user.organization}^FS
        ^FO50,2000^ADR,54,30^FD${this.user.zones}^FS
        ^XZ`, undefined, undefined);
    }, (error) => {
      alert(error);
    });
  }

}
