import { Component, OnInit } from '@angular/core';
import { WeatherService } from './components';
import { ThemeService } from './components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  loading = true;
  selectedTheme: string = 'theme-normal';
  selectedSize: string = 'size-normal';
  constructor(private weatherService: WeatherService, private themeService: ThemeService) {
    this.weatherService.ngOnInit();
    this.weatherService.loading.subscribe(loading => this.loading = loading);
  }
  ngOnInit() {
    this.themeService.selectedTheme.subscribe(selectedTheme => this.selectedTheme = selectedTheme);
    this.themeService.selectedSize.subscribe(selectedSize => this.selectedSize = selectedSize);
  }
}
