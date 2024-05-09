import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-icon-selection',
  templateUrl: './icon-selection.component.html',
  styleUrls: ['./icon-selection.component.scss']
})
export class IconSelectionComponent implements OnInit {

  icons = ['blanket', 'blazer', 'curtain', 'dress-alt', 'dress', 'fabric', 'jeans', 'jumpsuit', 'lab-coat-alt', 'lab-coat', 'long-sleeved-shirt', 'overall', 'pants', 'pillow', 'polo-shirt', 'robe', 'scarf', 'shorts', 'skirt', 'sweater', 't-shirt', 'tie', 'undershirt']
  constructor(private bottomSheetRef: MatBottomSheetRef<IconSelectionComponent>) { }

  ngOnInit() {
  }

  pickIcon(icon: string) {
    this.bottomSheetRef.containerInstance.bottomSheetConfig.data.icon = icon
    this.bottomSheetRef.dismiss();
  }

}
