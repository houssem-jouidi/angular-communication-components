import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output() productseventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  readonly DataStateEnum =  DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(product): void {
    this.productseventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: product});
  }
  deleteProduct(product): void {
    this.productseventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: product});

  }
  onUpdateProduct(product): void {
    this.productseventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: product});

  }
  onActionEvent($event: ActionEvent): void {
  this.productseventEmitter.emit($event);
  }
}
