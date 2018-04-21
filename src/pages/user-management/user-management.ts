import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../models/user";
import {UserProvider} from "../../providers/database/user";
import {UserViewPage} from "../user-view/user-view";
import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {UserPage} from "../user/user";

@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage {

  users: User[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userProvider: UserProvider,
              public loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController) {
  }

  ngOnInit(): void {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present().then(() => {
      this.userProvider.setFilter('');
      this.userProvider.findByBarcode('');
      this.userProvider.userList.subscribe((users: User[]) => {
        loading.dismiss();
        this.users = users;
      });
    });

  }

  public select(user: User): void {
    this.navCtrl.push(UserViewPage, {user: user});

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

  public add(): void {
    this.navCtrl.push(UserPage)
  }


}
