import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthPageModule} from "../pages/auth/auth.module";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {HttpModule} from "@angular/http";
import {AuthProvider} from '../providers/auth/auth';
import {AngularFireAuthModule} from "angularfire2/auth";
import {LendingPage} from "../pages/lending/lending";
import {ComponentsModule} from "../components/components.module";
import {ItemProvider} from "../providers/database/item";
import {UserManagementPage} from "../pages/user-management/user-management";
import {ItemManagementPage} from "../pages/item-management/item-management";
import {ItemPage} from "../pages/item/item";
import {UserPage} from "../pages/user/user";
import {CategoryProvider} from "../providers/database/category";
import {UserProvider} from "../providers/database/user";
import {UserSelectPage} from "../pages/user-select/user-select";
import {LendOutProvider} from "../providers/database/lendout";

var firebaseConfig = {
  apiKey: "AIzaSyD6--rws7Va0-tCWJMATEcvgTOvmBvLyoY",
  authDomain: "alpha-e4ef9.firebaseapp.com",
  databaseURL: "https://alpha-e4ef9.firebaseio.com",
  projectId: "alpha-e4ef9",
  storageBucket: "",
  messagingSenderId: "587935848232"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LendingPage,
    ItemManagementPage,
    UserManagementPage,
    ItemPage,
    UserPage,
    UserSelectPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AuthPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    ComponentsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LendingPage,
    ItemManagementPage,
    UserManagementPage,
    ItemPage,
    UserPage,
    UserSelectPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ItemProvider,
    UserProvider,
    CategoryProvider,
    LendOutProvider
  ]
})
export class AppModule {
}

