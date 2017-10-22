import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {Item} from "../../models/item";

@Injectable()
export class ItemProvider {

  ITEMS: string = 'items';

  items: Observable<Item[]>;

  constructor(private db: AngularFireDatabase) {
    this.items = db.list(this.ITEMS);
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
