import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'wa-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CountryEntryComponent implements OnInit {
  countryname: string = "Hyderabad";
  constructor() { }

  ngOnInit() {

  }
  onClick(){
    console.log(this.countryname)
  }
}
