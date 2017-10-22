import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {Category} from "../../models/category";

@Injectable()
export class CategoryProvider {

  CATEGORIES: string = 'categories';

  categories: Observable<Category[]>;

  constructor(private db: AngularFireDatabase) {
    this.categories = db.list(this.CATEGORIES);
  }

  public addNewItem(category: Category) {
    this.db.list(this.CATEGORIES).push(category);
  }

  public editItem(category: Category) {
    this.db.list(this.CATEGORIES).update(category.$key, category);
  }

  public deleteItem(category: Category) {
    this.db.list(this.CATEGORIES).remove(category.$key);
  }
}
