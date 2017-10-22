import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../models/item";

@Component({
  selector: 'app-catalog-item',
  templateUrl: 'item.html'
})
export class ItemComponent {

  @Input() item: Item;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  select(evt) {
    this.selectedEvent.next(this.item);
  }

}
