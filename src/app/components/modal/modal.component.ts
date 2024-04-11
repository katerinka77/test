import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input()
  isShow: boolean = false;

  @Output() onClose = new EventEmitter<any>();
  close() {
    this.onClose.emit();
  }

  handleCloseModal() {
    this.isShow = false;
  }
}
