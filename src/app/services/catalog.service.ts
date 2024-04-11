import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Product } from "../models/catalog.types";
import { Observable, catchError, delay, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CatalogService {
  constructor(
    private http: HttpClient
  ) {
  }

  getCatalog(): Observable<Product[]> {
    return this.http.get<Product[]>('http://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: { limit: 10 }
      })
    }).pipe(
      delay(1000),
      catchError(this.handleError.bind(this))
    )
  }

  fetchDeleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://fakestoreapi.com/products/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  fetchPostItemCatalog(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>('http://fakestoreapi.com/products', product).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  fetchPutItemCatalog(product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`http://fakestoreapi.com/products/${product.id}`, product).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.message);
  }
}
