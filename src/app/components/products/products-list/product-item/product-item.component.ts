import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { EventDrivenService } from 'src/app/state/event.driven.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
 @Input() product: Product;
 // @Output() itemEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor(private eventDrivenService: EventDrivenService) { }

  ngOnInit(): void {
  }
  onSelect(product): void {
   // this.itemEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
   this.eventDrivenService.publishEvent({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
  }
  deleteProduct(product): void {
   // this.itemEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: product});
   this.eventDrivenService.publishEvent({type: ProductActionsTypes.DELETE_PRODUCT, payload: product});

  }
  onUpdateProduct(product): void {
   // this.itemEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});
   this.eventDrivenService.publishEvent({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});

  }

}
