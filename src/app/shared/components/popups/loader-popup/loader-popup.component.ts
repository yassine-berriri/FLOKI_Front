import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { share } from 'rxjs';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-loader-popup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './loader-popup.component.html',
  styleUrl: './loader-popup.component.scss'
})
export class LoaderPopupComponent {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(LoadingPopupDialog, {
      width: '350px',
      height: '350px',
      disableClose: true
    });
  }

  close() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'app-loading-popup-dialog',
  standalone: true,
  template: `
    <div class="loading-container">
      <mat-spinner></mat-spinner>
    </div>
  `,
  imports: [SharedModule],
  styles: [`
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  `]
})
export class LoadingPopupDialog {}

