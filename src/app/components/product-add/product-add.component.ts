import { ProductActionsTypes } from './../../state/product.state';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { EventDrivenService } from 'src/app/state/event.driven.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
 productFormGroup: FormGroup;
 submitted: boolean = false;
  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private eventDrivenService: EventDrivenService
              ) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
     name: ['', Validators.required],
     price: [0, Validators.required],
     quantity: [0, Validators.required],
     selected: [true, Validators.required],
     available: [true, Validators.required],
    });
  }
  onSaveProduct(): void {
   this.submitted = true;
   if (this.productFormGroup.invalid) {
     return;
   }
   this.productService.saveProduct(this.productFormGroup.value).subscribe(data => {
     this.eventDrivenService.publishEvent({type: ProductActionsTypes.PRODUCT_ADDED});
     alert('success saving product');
   });
  }

}
