import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import { UserListComponent } from './user-list/user-list';
import { ItemListComponent } from './item-list/item-list';
import { UserComponent } from './user/user';

@NgModule({
  declarations: [
    UserListComponent,
    ItemListComponent,
    UserComponent
  ],
  imports: [IonicModule],
  exports: [
    UserListComponent,
    ItemListComponent,
    UserComponent
  ]
})
export class ComponentsModule {
}
