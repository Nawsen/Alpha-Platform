import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../models/item";
import {LendOutProvider} from "../../providers/database/lendout";
import {LendOut} from "../../models/lendout";

@Component({
  selector: 'app-catalog-item',
  templateUrl: 'item.html'
})
export class ItemComponent implements OnInit {
  ngOnInit(): void {
    this.lendOutProvider.lendOuts.subscribe((resp: LendOut[]) => {
      for (const lendout of resp) {
        if (lendout.itemId === this.item.$key && !lendout.checkInTime) {
          this.lendout = true;
          return
        }
        this.lendout = false;
      }
    })
  }

  @Input() item: Item;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();

  lendout: boolean = false;

  constructor(public lendOutProvider: LendOutProvider) {

  }

  select(evt) {
    this.selectedEvent.next(this.item);
  }

}
