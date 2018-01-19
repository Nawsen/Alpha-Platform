import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from "@angular/core";
import {Item} from "../../models/item";
import {AuthProvider} from "../auth/auth";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ItemProvider {

  ITEMS: string = '/items';

  filter: BehaviorSubject<string>;

  items: Subject<Item[]> = new ReplaySubject(1);

  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    //set the filter to nothing
    this.filter = new BehaviorSubject<string>('');
    this.auth.user
      .map((user) => user.email.substring(0, user.email.indexOf('@')) + this.ITEMS)
      .map((itemsUrl: string) => this.ITEMS = itemsUrl)
      .flatMap(() => this.db.list(this.ITEMS))
      .combineLatest(this.filter, (items: Item[], filter: string) => this.doFilter(items, filter))
      .subscribe(items => this.items.next(items));
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

  private doFilter(items: Item[], filter: string): Item[] {
    return items.filter(item => this.isValidByFilter(item, filter));
  }

  private isValidByFilter(item: Item, filter: string): boolean {
    return item.name.indexOf(filter) >= 0 ||
      item.category.indexOf(filter) >= 0;
  }

  setFilter(val: any): void {
    this.filter.next(val);
  }
}
