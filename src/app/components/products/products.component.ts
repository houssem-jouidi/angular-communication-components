import { EventDrivenService } from './../../state/event.driven.service';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from './../../state/product.state';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
products$: Observable<AppDataState<Product[]>> | null = null;
selectSubscription: Subscription;
readonly DataStateEnum =  DataStateEnum;
  constructor(private productService: ProductsService,
              private router: Router,
              private eventDrivenService: EventDrivenService
              ) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        this.onActionEvent(actionEvent);
      }
    );
  }
  onActionEvent($event: ActionEvent): void {
switch ($event.type) {
  case ProductActionsTypes.GET_ALL_PRODUCTS:
    this.onGetAllProducts();
    break;
    case ProductActionsTypes.GET_SELECTED_PRODUCTS:
      this.onGetSelectedProducts();
      break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
        case ProductActionsTypes.SEARCH_PRODUCTS:
          this.onSearch($event.payload);
          break;
          case ProductActionsTypes.NEW_PRODUCT:
          this.onNewProduct();
          break;
          case ProductActionsTypes.SELECT_PRODUCT:
            this.onSelect($event.payload);
            break;
            case ProductActionsTypes.EDIT_PRODUCT:
              this.onUpdateProduct($event.payload);
              break;
              case ProductActionsTypes.DELETE_PRODUCT:
                this.deleteProduct($event.payload);
                break;
}
  }
  onGetAllProducts(): void {
    this.products$ = this.productService.getAllProducts().pipe(
      map((dataP: Product[]) => ( {dataState : DataStateEnum.LOADED, data: dataP } )),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message }))

    );
  }
  onGetSelectedProducts(): void {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map((dataP: Product[]) => ( {dataState : DataStateEnum.LOADED, data: dataP } )),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message }))

    );
   }
   onGetAvailableProducts(): void {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map((dataP: Product[]) => ( {dataState : DataStateEnum.LOADED, data: dataP } )),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message }))

    );
   }
   onSearch(dataForms): void {
    this.products$ = this.productService.searchProducts(dataForms.keyword).pipe(
      map((dataP: Product[]) => ( {dataState : DataStateEnum.LOADED, data: dataP } )),
      startWith({dataState : DataStateEnum.LOADING }),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message }))

    );
   }
   onNewProduct(): void  {
    this.router.navigateByUrl('/newProduct');
   }
   onSelect(product: Product): void  {
   this.selectSubscription = this.productService.slectProduct(product).subscribe(data => product.selected = data.selected);
   }
   deleteProduct(product): void  {
    this.productService.deleteProduct(product).subscribe(data => this.onGetAllProducts() );
   }

   onUpdateProduct(product): void  {
    this.router.navigateByUrl('/editProduct/' + product.id);
   }
   ngOnDestroy(): void {
     if (this.selectSubscription) {
      this.selectSubscription.unsubscribe();
     }
   }
}
