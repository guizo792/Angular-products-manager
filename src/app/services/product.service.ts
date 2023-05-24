import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;
  constructor() {
    this.products = [
      {
        id: UUID.UUID(),
        name: 'Computer',
        price: 4299,
        promotion: true,
      },
      {
        id: UUID.UUID(),
        name: 'Printer',
        price: 2000,
        promotion: false,
      },
      {
        id: UUID.UUID(),
        name: 'SmartPhone',
        price: 599,
        promotion: true,
      },
    ];

    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: UUID.UUID(),
        name: 'Computer',
        price: 6500,
        promotion: true,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'Printer',
        price: 1200,
        promotion: false,
      });
      this.products.push({
        id: UUID.UUID(),
        name: 'SmartPhone',
        price: 490,
        promotion: false,
      });
    }
  }

  public getAllProducts(): Observable<Array<Product>> {
    let random = Math.random();
    if (random < 0.1)
      return throwError(() => new Error('Internet connexion error'));
    return of(this.products);
  }

  public getPageProduct(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = ~~(this.products.length / size);
    if (this.products.length % size != 0) {
      totalPages++;
    }
    let pageProducts = this.products.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    });
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter((p) => p.id != id);
    return of(true);
  }

  public setPromotion(id: string) {
    let product = this.products.find((p) => p.id == id);
    if (product != undefined) {
      product.promotion = !product?.promotion;
      return of(true);
    }
    throwError(() => new Error('Product not found!'));
    return of(false);
  }

  public searchProducts(
    keyword: string,
    page: number,
    size: number
  ): Observable<PageProduct> {
    let results = this.products.filter((p) => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(results.length / size);
    if (this.products.length % size != 0) {
      totalPages++;
    }
    let pageProducts = results.slice(index, index + size);
    return of({
      page: page,
      size: size,
      totalPages: totalPages,
      products: pageProducts,
    });
  }
}
