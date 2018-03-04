import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import { UserListComponent } from './user-list/user-list';
import { ItemListComponent } from './item-list/item-list';

@NgModule({
  declarations: [
    UserListComponent,
    ItemListComponent
  ],
  imports: [IonicModule],
  exports: [
    UserListComponent,
    ItemListComponent
  ]
})
export class ComponentsModule {
}
