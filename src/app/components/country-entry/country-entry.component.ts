import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'wa-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.css'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class CountryEntryComponent implements OnInit {
  cityname: string = 'Hyderabad';
  loading: boolean = false;
  selectedTheme: string = 'theme-normal';
  constructor(private weatherService: WeatherService, private themeService: ThemeService) { }

  ngOnInit() {
    this.weatherService.loading.subscribe(loading => this.loading = loading);
    this.themeService.selectedTheme.subscribe(selectedTheme => this.selectedTheme = selectedTheme);

  }
  onClick() {
    if (this.loading === false) {
      this.weatherService.getCurrentWeatherFromServer(this.cityname);
    }
  }
}
