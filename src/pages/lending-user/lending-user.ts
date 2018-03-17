import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {LendOutProvider} from "../../providers/database/lendout";
import {LendOut} from "../../models/lendout";
import {Item} from "../../models/item";
import {UserProvider} from "../../providers/database/user";
import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-lending-user',
  templateUrl: 'lending-user.html',
})
export class LendingUserPage implements OnInit {

  item: Item;

  users: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lendoutProvider: LendOutProvider,
              public userProvider: UserProvider,
              public loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController) {
    this.item = navParams.get('item');
  }

  ngOnInit(): void {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.userProvider.userList.subscribe((users: User[]) => {
      loading.dismiss();
      this.users = users;
    });

  }

  public select(user: User): void {
    this.lendoutProvider.addNewLendOut(new LendOut(user.$key, this.item.$key, Date.now()));
    this.navCtrl.pop();
  }


  scan() {
    const barcodeOptions: BarcodeScannerOptions =  {
      orientation: 'portrait'
    };

    this.barcodeScanner.scan(barcodeOptions).then((barcodeData: BarcodeScanResult) => {
      console.log(barcodeData);
      const scannedUser: User = this.findUserForBarcode(barcodeData.text);
      if (scannedUser) {
        this.select(scannedUser);
      } else {
        let toast = this.toastCtrl.create({
          message: 'Barcode was not found',
          duration: 3000
        });
        toast.present();
      }
      barcodeData.text
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000
      });
      toast.present();
    });
  }

  private findUserForBarcode(barcode: string): User | undefined {
    for (const user of this.users) {
      if (user.barcode === barcode){
        return user;
      }
    }
    return undefined;
  }

}
