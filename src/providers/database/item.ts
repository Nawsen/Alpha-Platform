import {AngularFireDatabase} from 'angularfire2/database';
import {Injectable} from "@angular/core";
import {Item} from "../../models/item";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ItemProvider {

  ITEMS: string = '/items';

  filter: BehaviorSubject<string>;

  private items: Observable<Item[]>;

  constructor(private db: AngularFireDatabase) {
    //set the filter to nothing
    this.filter = new BehaviorSubject<string>('');
  }

  findByBarcode(barcode: string): Observable<Item[]> {
    return (<Observable<Item[]>>this.db.list(this.ITEMS, {
      query: {
        orderByChild: 'barcode',
        equalTo: barcode
      }
    }))
  }

  get itemList(): Observable<Item[]> {
    if (this.items) {
      return this.items;
    }
    // noinspection TypeScriptUnresolvedFunction
    this.items = <Observable<Item[]>>this.db.list(this.ITEMS)
      .combineLatest(this.filter, (items: Item[], filter: string) => this.doFilter(items, filter))
      .publishReplay().refCount();
    return this.items;
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

  setFilter(val: any): void {
    this.filter.next(val);
  }

  private doFilter(items: Item[], filter: string): Item[] {
    return items.filter(item => this.isValidByFilter(item, filter));
  }

  private isValidByFilter(item: Item, filter: string): boolean {
    return item.name.indexOf(filter) >= 0 ||
      item.category.indexOf(filter) >= 0;
  }

  public findItemById(key: string) {
    return this.db.object(this.ITEMS + '/' + key);
  }
}
