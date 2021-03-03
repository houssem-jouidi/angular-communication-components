import { Component, Input, OnInit } from '@angular/core';
import { ProductsState } from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
@Input() product: ProductsState|null = null;
  constructor() { }

  ngOnInit(): void {
  }

}
