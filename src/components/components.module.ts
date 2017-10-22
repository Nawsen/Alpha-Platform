import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import {CatalogComponent} from './catalog/catalog';
import {ItemComponent} from './item/item';
import { UserListComponent } from './user-list/user-list';

@NgModule({
  declarations: [
    CatalogComponent,
    ItemComponent,
    UserListComponent,
    UserListComponent
  ],
  imports: [IonicModule],
  exports: [
    CatalogComponent,
    ItemComponent,
    UserListComponent,
    UserListComponent
  ]
})
export class ComponentsModule {
}
