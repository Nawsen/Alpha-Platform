import {Component, EventEmitter, Output} from '@angular/core';
import {Item} from "../../models/item";
import 'rxjs/add/operator/map'
import {ItemProvider} from "../../providers/database/item";
import {CategoryProvider} from "../../providers/database/category";
import {Category} from "../../models/category";

/**
 * Generated class for the CatalogComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-catalog',
  templateUrl: 'catalog.html'
})
export class CatalogComponent {

  categories: Category[] = [];

  selectedCategory: string = "";

  items: Item[] = [];

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private item: ItemProvider, private category: CategoryProvider) {
    this.category.categories
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        if (this.selectedCategory === "") {
          this.selectedCategory = this.categories[0].name;
        }
        this.loadItemsFromCategory(this.selectedCategory);
      });
  }

  changeCategory(tab) {
    this.loadItemsFromCategory(tab.value);
  }

  selected(item: Item) {
    this.selectedEvent.next(item);
  }

  private loadItemsFromCategory(tab: string) {
    this.item.items.subscribe((resp: Item[]) => {
      this.items = [];
      for (const item of resp) {
        if (item.category === tab) {
          this.items.push(item);
        }
      }
    })
  }
}
