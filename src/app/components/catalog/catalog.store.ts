import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Product, Storage } from "../../models/catalog.types";
import { EMPTY, Observable, catchError, exhaustMap, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { CatalogService } from "../../services/catalog.service";

const initialState: Storage = {
  catalog: [],
  isLoading: false,
  error: null,
};

@Injectable()
export class CatalogStore extends ComponentStore<Storage> {

  private isLoading$ = this.select(state => state.isLoading);
  public readonly catalog$ = this.select(state => state.catalog);
  private error$ = this.select(state => state.error);
  vm$ = this.select({
    isLoading: this.isLoading$,
    catalog: this.catalog$,
    error: this.error$,
  })

  constructor(private catalogService: CatalogService) {
    super(initialState);
  }

  setIsLoading = this.updater((state) => ({
    ...state,
    isLoading: true,
  }));

  setError = this.updater((state, error: HttpErrorResponse) => ({
    ...state,
    error: error.message,
  }));

  addCatalog = this.updater((state, catalog: Product[]) => {
    console.log('addCatalog', catalog)
    return {
      ...state,
      isLoading: false,
      catalog: catalog,
    }
  });

  deleteItemCatalog = this.updater((state, id: number) => {
    return {
      ...state,
      catalog: state.catalog.filter((item) => item.id !== id),
    }
  });

  changeProduct = this.updater((state, data: Product) => {
    const currentProduct = state.catalog.findIndex((product) => product.id === data.id);
    state.catalog.splice(currentProduct, 1, data);

    return {
      ...state,
      catalog: state.catalog,
    }
  });

  addNewProduct = this.updater((state, data: Product) => {
    state.catalog.push(data);

    return {
      ...state,
      catalog: state.catalog,
    }
  });

  getCatalog = this.effect((trigger$) => {
    return trigger$.pipe(
      tap(() => {
        this.setIsLoading();
      }),
      exhaustMap(() => {
        return this.catalogService.getCatalog().pipe(
          tapResponse(
            (catalog) => this.addCatalog(catalog),
            (e: HttpErrorResponse) => this.setError(e)
          )
        )
      })
    )
  });

  postItemCatalog = this.effect((product$: Observable<Partial<Product>>) => {
    return product$.pipe(
      switchMap((product) => {
        return this.catalogService.fetchPostItemCatalog(product).pipe(
          tapResponse({
            next: (data: Product) => this.addNewProduct(data),
            error: (error: HttpErrorResponse) => this.setError(error),
          }),
        )
      })
    )
  });

  changeItemCatalog = this.effect((product$: Observable<Partial<Product>>) => {
    return product$.pipe(
      switchMap((product: Partial<Product>) => {
        return this.catalogService.fetchPutItemCatalog(product).pipe(
          tapResponse({
            next: (data: Product) => this.changeProduct(data),
            error: (error: HttpErrorResponse) => this.setError(error),
          })
        )
      })
    )
  })

  deleteItem = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      exhaustMap((id) => {
        return this.catalogService.fetchDeleteProduct(id).pipe(
          tapResponse(
            (data) => this.deleteItemCatalog(data?.id || 21),
            (e: HttpErrorResponse) => this.setError(e)
          )
        )
      })
    )
  });


}
