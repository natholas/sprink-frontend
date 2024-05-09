import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shop-order-comment',
  templateUrl: './shop-order-comment.component.html',
  styleUrls: ['./shop-order-comment.component.scss']
})
export class ShopOrderCommentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShopOrderCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
