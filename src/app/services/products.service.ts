import { environment } from './../../environments/environment';

import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 host = environment.host;
  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products`);
  }
  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?selected=true`);
  }
  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?available=true`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/products?name_like=${keyword}`);
  }
  slectProduct(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }
  saveProduct(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.post<Product>(`${this.host}/products`, product);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`, product);
  }
}
