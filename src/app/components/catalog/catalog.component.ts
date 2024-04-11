import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/catalog.types';
import { CatalogStore } from './catalog.store';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ModalComponent } from "../modal/modal.component";
import { ProductComponent } from '../product/product.component';
import { FormCreateComponent } from '../form-create/form-create.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  providers: [CatalogStore, ModalComponent],
  imports: [AsyncPipe, NgFor, NgIf, ModalComponent, NgTemplateOutlet, ProductComponent, FormCreateComponent]
})
export class CatalogComponent implements OnInit {

  vm$ = this.catalogStore.vm$;

  public isToggleModalCreateProduct = false;

  constructor(
    private catalogStore: CatalogStore
  ) { }

  ngOnInit() {
    this.catalogStore.getCatalog();
  }

  handleToggle() {
    this.isToggleModalCreateProduct = !this.isToggleModalCreateProduct;
  }

  public handleDeleteProduct(id: number) {
    this.catalogStore.deleteItem(id);
  }

  public handleAddNewProduct(product: Partial<Product>) {
    product.image = 'https://i.pravatar.cc';

    this.catalogStore.postItemCatalog(product);
    this.handleToggle();
  }

  public handleChangeProduct(product: Partial<Product>) {
    this.catalogStore.changeItemCatalog(product);
  }
}
