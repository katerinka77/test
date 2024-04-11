import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/catalog.types';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { CatalogStore } from '../catalog/catalog.store';
import { FormCreateComponent } from '../form-create/form-create.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, NgTemplateOutlet, ModalComponent, FormCreateComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [CatalogStore, ModalComponent],

})
export class ProductComponent {

  @Input() product?: Product | undefined = undefined;

  @Output() onDelete = new EventEmitter<any>();
  delete() {
    this.onDelete.emit();
  }

  @Output() onChange = new EventEmitter<Partial<Product>>();
  change(newProduct: Partial<Product>) {
    this.onChange.emit(newProduct);
  }

  public isShow = false;
  public isShowModalChange = false;

  handleShowModalDelete() {
    this.isShow = !this.isShow;
  }

  handleToggleModalChange() {
    this.isShowModalChange = !this.isShowModalChange;
  }
}

