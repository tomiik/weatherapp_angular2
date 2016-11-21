import { Component } from '@angular/core';
import { WeatherService } from './components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  loading = true;
  constructor(private weatherService: WeatherService) {
    this.weatherService.ngOnInit();
    this.weatherService.loading.subscribe(loading => this.loading = loading);
  }
}
