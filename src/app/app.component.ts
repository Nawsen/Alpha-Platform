import {Component, HostListener, ViewChild} from '@angular/core';
import {App, MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {AuthProvider} from "../providers/auth/auth";
import {ItemManagementPage} from "../pages/item-management/item-management";
import {UserManagementPage} from "../pages/user-management/user-management";
import {AuthPage} from "../pages/auth/auth";
import {CategoryManagementPage} from "../pages/category-management/category-management";
import {ItemViewPage} from "../pages/item-view/item-view";
import {UserViewPage} from "../pages/user-view/user-view";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  enableSideMenu: boolean = false;

  pages: Array<{ title: string, component: any, icon: string }>;

  activeScan: Scan = {started: false, startTime: 0, stack: ''};

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (!this.enableSideMenu){
      return;
    }
    if (event.code === 'ShiftLeft') {
      this.activeScan.started = true;
      this.activeScan.startTime = new Date().getTime();
      return;
    }
    if (this.activeScan.started && event.key === 'Enter' && (new Date().getTime() - this.activeScan.startTime < 500)) {
      console.log('scanned');
      if (this.activeScan.stack.startsWith('I')) {
        this.nav.push(ItemViewPage, {barcode: this.activeScan.stack});
      }
      if (this.activeScan.stack.startsWith('U')) {
        this.nav.push(UserViewPage, {barcode: this.activeScan.stack.substr(1)});
      }
      this.activeScan = {started: false, startTime: 0, stack: ''};
      return;
    }
    if (this.activeScan.started) {
      this.activeScan.stack += event.key;
    }
  }

  constructor(public app: App,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public auth: AuthProvider,
              private menuController: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage, icon: 'home'},
      // { title: 'Lending', component: LendingPage, icon: 'repeat' },
      {title: 'Item management', component: ItemManagementPage, icon: 'pricetags'},
      {title: 'User management', component: UserManagementPage, icon: 'people'},
      {title: 'Category management', component: CategoryManagementPage, icon: 'bookmark'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuController.close();
      this.auth.user.subscribe((user) => {
        if (user === null) {
          this.menuController.close();
          this.app.getRootNav().setRoot(AuthPage);
          this.menuController.close().then(() => {
            this.enableSideMenu = false;
          });

        } else {
          this.app.getRootNav().setRoot(HomePage);
          this.enableSideMenu = true;
          this.menuController.open();
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
  }

}

export interface Scan {
  started: boolean;
  startTime: number;
  stack: string;
}
