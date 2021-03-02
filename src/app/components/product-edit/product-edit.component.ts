import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { EventDrivenService } from 'src/app/state/event.driven.service';
import { ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
productId: number;
productFormGroup: FormGroup;
submitted: boolean = false;
  constructor(private fb: FormBuilder, private eventDrivenService: EventDrivenService,
              private activatedRoute: ActivatedRoute, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productService.getProduct(this.productId).subscribe(
      product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required],
         });
      }
    );
  }
  onUpdateProduct(): void {
    this.submitted = true;
    if (this.productFormGroup.invalid) {
      return;
    }
    this.productService.updateProduct(this.productFormGroup.value).subscribe(data => {
     this.eventDrivenService.publishEvent({type: ProductActionsTypes.PRODUCT_UPDATED});
     alert('success update product');
    });
  }

}
