import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wa-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.css'],
  encapsulation: ViewEncapsulation.Emulated

})
export class DaySelectorComponent implements OnInit {
  icons = [0, 1, 2, 3, 4];
  loading = true;
  constructor() {
 }

  ngOnInit() {
  }

}
