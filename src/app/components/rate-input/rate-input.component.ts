import { NgFor } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './rate-input.component.html',
  styleUrl: './rate-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RateInputComponent),
      multi: true,
    }
  ]
})
export class RateInputComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';
  randomString = '';
  starControl = new FormControl();
  onChange = (value: number) => value;
  onTouched = (value: number) => value;

  writeValue(value: number): void {
    this.starControl.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.getRandomString();
    this.starControl.valueChanges.subscribe((val) => {
      this.onChange(val);
    })
  }

  getRandomString() {
    this.randomString = Math.random().toString(36).substring(7);
  }

}
