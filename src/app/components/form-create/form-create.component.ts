import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Product } from '../../models/catalog.types';
import { NgIf } from '@angular/common';
import { RateInputComponent } from '../rate-input/rate-input.component';

export function checkRegExp(regExp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regExp.test(control.value);
    return forbidden ? null : { forbiddenValue: { value: control.value } };
  }
}

@Component({
  selector: 'app-form-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RateInputComponent],
  templateUrl: './form-create.component.html',
  styleUrl: './form-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCreateComponent implements AfterViewChecked, OnInit {
  @Input() changeableProduct: Product | null = null;
  createForm?: FormGroup;
  ngAfterViewChecked(): void {

    if (this.isError) {
      this.isError = false;
    }
  }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(this.changeableProduct?.title || '', [Validators.required, Validators.minLength(3), checkRegExp(/^[A-Za-zА-Яа-я _-]+$/)]),
      price: new FormControl(this.changeableProduct?.price || '', [Validators.required, checkRegExp(/^\d+(\.\d+)?$/)]),
      description: new FormControl(this.changeableProduct?.description || '', Validators.required),
      category: new FormControl(this.changeableProduct?.category || '', Validators.required),
      rate: new FormControl(this.changeableProduct?.rating?.rate ? Math.floor(this.changeableProduct.rating.rate) : ''),
    });

  }

  isError = false;

  @Output() onCreate = new EventEmitter<Partial<Product>>();
  create(newProduct: Partial<Product>) {
    this.onCreate.emit(newProduct);
  }

  handleSend() {
    if (!this.createForm) {
      return;
    }

    if (this.createForm?.status === 'INVALID') {
      this.isError = true;

      return;
    }

    const product = {
      ...(this.changeableProduct && { id: this.changeableProduct.id }),
      title: this.createForm.value.title,
      price: this.createForm.value.price,
      description: this.createForm.value.description,
      category: this.createForm.value.category,
      rating: {
        rate: this.createForm.value.rate
      }
    }

    this.create(product as Partial<Product>);
    if(!this.changeableProduct) this.createForm.reset();
  }
}
