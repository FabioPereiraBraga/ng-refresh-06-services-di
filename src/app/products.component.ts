import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {

  products = [];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }

  onAddProduct(form) {
    if (form.valid) {
      this.productsService.addProduct(form.value.productName);
    }
  }
  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
