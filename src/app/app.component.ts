import { Component, OnInit, OnChanges } from '@angular/core';
import { CountryEntryComponent } from './components'
import { CountryInfoComponent } from './components'
import { WeatherService } from './components'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  loading = true;
  constructor(private weatherService: WeatherService){
    this.weatherService.ngOnInit();
    this.weatherService.loading.subscribe(loading => this.loading = loading);
  }
  ngOnChanges()
  {
    console.log("appComponent.OnChanges()");
  }
  ngOnInit(){
  }
}
