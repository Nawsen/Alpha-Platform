import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../models/item";

@Component({
  selector: 'app-item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {

  @Output() selectedEvent = new EventEmitter();

  @Input() items: Item[];

  constructor() {
  }

  select(item: Item) {
    this.selectedEvent.next(item);
  }

}
