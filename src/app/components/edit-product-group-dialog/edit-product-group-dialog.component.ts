import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-edit-product-group-dialog',
  templateUrl: './edit-product-group-dialog.component.html',
  styleUrls: ['./edit-product-group-dialog.component.scss']
})
export class EditProductGroupDialogComponent {

  group: any

  constructor(
    public dialogRef: MatDialogRef<EditProductGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public state: StateService
  ) {
    this.group = this.data.group
  }

  save(form: NgForm) {
    if (!form.valid) return
    this.dialogRef.close(this.group)
  }
  
  deleteGroup() {
    this.dialogRef.close('delete')
  }

}
