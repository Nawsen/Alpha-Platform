import {Component, EventEmitter, Output} from '@angular/core';
import {Item} from "../../models/item";
import {ItemProvider} from "../../providers/database/item";

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

  categories: string[] = ["building", "communication"];

  selectedCategory: string = this.categories[0];

  items: Item[] = [];

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private item: ItemProvider) {
    this.loadItemsFromCategory(this.selectedCategory);
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
