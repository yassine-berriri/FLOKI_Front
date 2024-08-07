import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup.component',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirmation-popup.component.component.html',
  styleUrl: './confirmation-popup.component.component.scss'
})
export class ConfirmationPopupComponentComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() footerButtons: { text: string, action: () => void }[] = [];
  @Output() codeSubmitted = new EventEmitter<string>();

  inputCode: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss();
    }

  submitCode() {
    this.codeSubmitted.emit(this.inputCode);
    this.close();
  }

}
