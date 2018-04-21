import {Component, OnInit} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {ItemProvider} from "../../providers/database/item";
import {Item} from "../../models/item";
import "rxjs";
import {ItemViewPage} from "../item-view/item-view";
import {BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-item-management',
  templateUrl: 'item-management.html',
})
export class ItemManagementPage implements OnInit {

  public itemList: Item[];

  public filter: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public itemService: ItemProvider,
              public loadingCtrl: LoadingController,
              private barcodeScanner: BarcodeScanner,
              public toastCtrl: ToastController) {
  }

  ngOnInit(): void {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present().then(() => {
      this.itemService.itemList.subscribe((items: Item[]) => {
        loading.dismiss();
        this.itemList = items;
      });
    });

  }

  select(item) {
    this.navCtrl.push(ItemViewPage, {item: item});
  }

  setFilter(event) {
    let val = event.target.value;
    if (val) {
      this.itemService.setFilter(val);
    }
  }

  clearFilter() {
    this.itemService.setFilter('');
  }

  scan() {
    const barcodeOptions: BarcodeScannerOptions =  {
      orientation: 'portrait'
    };

    this.barcodeScanner.scan(barcodeOptions).then((barcodeData: BarcodeScanResult) => {
      console.log(barcodeData);
      const scannedItem: Item = this.findItemForBarcode(barcodeData.text);
      if (scannedItem) {
        this.select(scannedItem);
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

  private findItemForBarcode(barcode: string): Item | undefined {
    for (const item of this.itemList) {
      if (item.barcode === barcode){
        return item;
      }
    }
    return undefined;
  }
}
