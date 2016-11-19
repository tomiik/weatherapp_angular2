import { Component, OnInit, OnChanges,ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { Weather } from '../lib/'

@Component({
  selector: 'wa-todays-weather',
  templateUrl: './todays-weather.component.html',
  styleUrls: ['./todays-weather.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodaysWeatherComponent implements OnInit {
  date: number;
  weather: string[];
  temp_c: number;
  temp_f: number;
  isDegreeTypeC:boolean;
  receivedData;
  weatherIcon;
  constructor(private weatherService: WeatherService) { }

  ngOnChanges()
  {
    console.log("todaysWeather.OnChanges()");
  }


  ngOnInit () {
    this.date = this.weatherService.getCurrentDate();
    this.weather = this.weatherService.getCurrentWeather();
    this.temp_c = this.weatherService.getCurrentTempC();
    this.temp_f = this.weatherService.getCurrentTempF();
    this.weatherService.isDegreeTypeC.subscribe(data => {this.receivedData = data})
    this.weatherIcon = Weather.getIcon(this.weather[1]);
    console.log("weatherIcon")
    console.log(this.weatherIcon)
  }
  onClickDegSelector(){
    console.log("onClickDegSelector()")
    this.weatherService.toggleDegreeType();
    this.isDegreeTypeC = !this.isDegreeTypeC;
//    console.log("onClickDegSelector()" + this.isDegreeTypeC);
    this.weatherService.isDegreeTypeC.next(this.isDegreeTypeC);

  }





    //
    // private data: Observable<any>;
    // private value: boolean[];
    // private receive: boolean;
    // private anyErrors: boolean;
    // private finished: boolean;
    // private subscription;
    //
    // init() {
    //   this.data = new Observable(observer => {
    //       setTimeout(() => {
    //           observer.next(this.value);
    //       }, 0);
    //
    //   });
    //   this.subscription = this.data.subscribe(
    //       value => this.receive = value[0],
    //       error => this.anyErrors = true,
    //       () => this.finished = true
    //   );
    // }

}
