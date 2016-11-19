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
  constructor(private weatherService: WeatherService){
    this.weatherService.ngOnInit();
  }
  ngOnChanges()
  {
    console.log("appComponent.OnChanges()");
  }
  ngOnInit(){
  }
}
