import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Injectable} from "@angular/core";
import {Category} from "../../models/category";
import {AuthProvider} from "../auth/auth";
import {Subject} from "rxjs/Subject";

@Injectable()
export class CategoryProvider {

  CATEGORIES: string = '/categories';

  categories: Observable<Category[]> = new Subject();

  constructor(private auth: AuthProvider, private db: AngularFireDatabase) {
    this.auth.user.subscribe((user)=> {
      let userName = user.email.substring(0, user.email.indexOf('@'));
      this.CATEGORIES = userName + this.CATEGORIES;
      this.categories = db.list(this.CATEGORIES);
    });
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
