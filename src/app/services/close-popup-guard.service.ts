import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class CanActivateChildGuard implements CanActivateChild {
  constructor(private dialog: MatDialog, private bottomSheet: MatBottomSheet) { }

  canActivateChild(): boolean {
    console.log(history.state);
    
    if (this.dialog.openDialogs.length > 0) {
      this.dialog.closeAll();
      return false;
    } else if (this.bottomSheet._openedBottomSheetRef) {
      this.bottomSheet._openedBottomSheetRef.dismiss()
      return false;
    } else {
      return true;
    }
  }
}