import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'wa-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CountryInfoComponent implements OnInit, AfterViewInit {
  cityName: string = 'NoName';
  countryCode: string = 'NoName';
  selectedTheme: string = 'theme-normal';
  constructor(private weatherService: WeatherService, private themeService: ThemeService) {
    this.themeService.selectedTheme.subscribe(selectedTheme => this.selectedTheme = selectedTheme);
  }
  changeTheme() {
    this.themeService.changeTheme();
  }
  changeSize() {
    this.themeService.changeSize();
  }
  ngOnInit () {
    this.weatherService.loading
        .subscribe(loading => this.refreshView());
  }
  refreshView() {
    this.cityName = this.weatherService.getCityName();
    this.countryCode = this.weatherService.getCountryCode().toLowerCase();
  }
  ngAfterViewInit() {
  //  this.cityName = this.weatherService.getCityName();
  //  console.log(this.cityName)
  }




}
