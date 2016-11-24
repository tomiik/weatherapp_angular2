import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Util, Weather } from '../../lib/';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'wa-day-icon',
  templateUrl: './day-icon.component.html',
  styleUrls: ['./day-icon.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DayIconComponent implements OnInit {
  @Input() icon;
  maxTemps;
  minTemps;
  weathers;
  max = 0;
  min = 0;
  weather;
  unit = '';
  day = 0;
  selectedDay = 0;
  weatherIcon: string;
  selectedTheme: string = 'theme-normal';
  selectedSize: string = 'size-normal';
  constructor(private weatherService: WeatherService, private themeService: ThemeService) { }

  ngOnInit() {
    this.refreshView();
    this.weatherService.isDegreeTypeC
        .subscribe(isDegreeTypeC => {this.refreshView(); });
    this.weatherService.selectedDay
        .subscribe(selectedDay => {this.selectedDay = selectedDay; });
    this.weatherService.loading
        .subscribe(loading => this.refreshView());
    this.themeService.selectedTheme.subscribe(selectedTheme => this.selectedTheme = selectedTheme);
    this.themeService.selectedSize.subscribe(selectedSize => this.selectedSize = selectedSize);

  }
  onClick(day) {
    console.log('day' + day);
    this.weatherService.setDay(day);
  }
  refreshView() {
    console.log('day-icon.refreshView()');
    this.maxTemps = this.weatherService.getMaxTemps();
    this.minTemps = this.weatherService.getMinTemps();
    this.weathers = this.weatherService.getWeathers();
    this.max = Util.round(this.maxTemps[this.icon], 1);
    this.min = Util.round(this.minTemps[this.icon], 1);
    this.weather = this.weathers[this.icon];
    this.unit = this.weatherService.getCurrentTemperatureUnit();
    this.day = this.weatherService.getDay()[this.icon];
    this.weatherIcon = Weather.getIcon(this.weather);
    // console.log("weatherIcon");
    // console.log(this.weather);
    // console.log(this.weatherIcon);

  }

}
