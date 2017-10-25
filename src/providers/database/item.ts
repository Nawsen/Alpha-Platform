import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {Item} from "../../models/item";
import {AuthProvider} from "../auth/auth";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ItemProvider {

  ITEMS: string = '/items';

  items: Observable<Item[]> = new Subject();

  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    this.auth.user.subscribe((user)=> {
      let userName = user.email.substring(0, user.email.indexOf('@'));
      this.ITEMS = userName + this.ITEMS;
      this.items = db.list(this.ITEMS);
    })
  }

  public addNewItem(user: Item) {
    this.db.list(this.ITEMS).push(user);
  }

  public editItem(item: Item) {
    this.db.list(this.ITEMS).update(item.$key, item);
  }

  public deleteItem(item: Item) {
    this.db.list(this.ITEMS).remove(item.$key);
  }
}
