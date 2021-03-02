import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.scss']
})
export class ProductsNavBarComponent implements OnInit {
@Output() producteventEmitter: EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onGetAllProducts(): void {
   this.producteventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS});
  }
  onGetSelectedProducts(): void {
    this.producteventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS});

  }
  onGetAvailableProducts(): void {
    this.producteventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS});

  }
  onNewProduct(): void {
    this.producteventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCT});

  }
  onSearch(dataForms: any): void {
    this.producteventEmitter.emit({type: ProductActionsTypes.SEARCH_PRODUCTS, payload: dataForms});

  }

}
