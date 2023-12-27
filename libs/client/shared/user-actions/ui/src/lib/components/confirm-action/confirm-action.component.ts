import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// TODO for extremely easy reuse of this in many places we should make a confirm dialog service that handles the triggering and closing of the modal itself.
// Then consumers can just say this.confirmService.confirm({ someOptions }).subscribe({next: (res) => if(res) { doSomething} })
// And then wont need to know about dialogs at all
@Component({
  selector: 'glist-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss'],
  standalone: true,
  imports: [MatButtonModule]
})
export class ConfirmActionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { phrase?: string; okayButtonText?: string; cancelButtonText?: string },
    public dialogRef: MatDialogRef<ConfirmActionComponent>
  ) {}
}
