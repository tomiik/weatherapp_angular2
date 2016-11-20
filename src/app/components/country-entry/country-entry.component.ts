import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'wa-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CountryEntryComponent implements OnInit {
  cityname: string = 'Hyderabad';
  loading: boolean = false;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.loading.subscribe(loading => this.loading = loading);
  }
  onClick() {
    if (this.loading === false) {
      this.weatherService.getCurrentWeatherFromServer(this.cityname);
    }
  }
}
