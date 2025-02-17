import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
 productFormGroup: FormGroup;
 submitted: boolean = false;
  constructor(private fb: FormBuilder, private productService: ProductsService) { }

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
      alert('success saving product')
   });
  }

}
