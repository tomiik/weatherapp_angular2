import { Injectable, OnInit } from '@angular/core';
import { CURRENT, FORECAST} from './mockdata';
import { Util, Getarray } from './lib';
import { ENUM_DEG_TYPE, ENUM_MAX_MIN, ENUM_WEATHER } from './enum';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService implements OnInit {
  public isDegreeTypeC: BehaviorSubject<any> = new BehaviorSubject([]);
  public selectedDay: BehaviorSubject<any> = new BehaviorSubject([]);
  public selectedDatatype: BehaviorSubject<any> = new BehaviorSubject([]);
  public receivedTime: BehaviorSubject<any> = new BehaviorSubject([]);
  public loading: BehaviorSubject<any> = new BehaviorSubject([]);

  currentData = {};
  forecastData = {};

  chartData = [];
  color_index = 0;
  symbol_index = 0;
  dates = [];
  temps = [];
  temps_c;
  temps_c_max;
  temps_c_min;
  temps_f;
  temps_f_max;
  temps_f_min;

  today = 'thursday';
  temps_c_2d = [];
  temps_c_max_2d = [];
  temps_c_min_2d = [];
  temps_f_2d = [];
  temps_f_max_2d = [];
  temps_f_min_2d = [];
  dates_2d = [];
  weather_2d = [];
  pressure_2d = [];
  humidity_2d = [];
  wind_kph_2d = [];
  wind_mph_2d = [];
  weather;
  pressure;
  humidity;
  wind_kph;
  wind_mph;

  // private urlCurrent = 'http://api.openweathermap.org/data/2.5/weather?q=Hyderabad&APPID=';  // URL to web api

  private appid = '0a72030de86532dc606cd9e539fc94bd';
  private cityName = 'Hyderabad';
  private urlCurrentBase = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlForecastBase = 'http://api.openweathermap.org/data/2.5/forecast/city?q=';

  constructor(private http: Http) { }

  getCurrentWeatherFromServer(cityName): Promise<any> {
    console.log('getCurrentWeatherFromServer()');
    this.cityName = cityName;
    this.loading.next(true);
    let url = this.urlCurrentBase + this.cityName + '&APPID=' + this.appid;  // URL to web api
    return this.http.get(url)
               .toPromise()
               // .then(response => this.currentData = response.json().data)
               .then(response => this.currentData = response.json())
               // .then(response => this.refresh())
               .then(response => this.getForecastWeatherFromServer(this.cityName))
               .catch(this.handleError);
  }
  getForecastWeatherFromServer(cityName): Promise<any> {
    console.log('getForecastWeatherFromServer()');
    this.cityName = cityName;
    let url = this.urlForecastBase + this.cityName + '&APPID=' + this.appid;  // URL to web api
    return this.http.get(url)
               .toPromise()
               // .then(response => this.currentData = response.json().data)
               .then(response => this.forecastData = response.json())
               .then(response => this.refresh())
               .catch(this.handleError);
  }
  handleError() {
    console.log('HTTP failed');
  }

  ngOnInit() {
    this.loading.next(true);
    this.isDegreeTypeC.next('true');
    this.currentData = this.getCurrentData();
    this.forecastData = this.getForecastData();
    this.getCurrentWeatherFromServer(this.cityName);
    this.parse();
    this.selectedDay.next(0);
    this.selectedDatatype.next('');
    this.getPressureArray();
    console.log('serviceOnInit()');
    // this.log();
  }
  refresh() {
    console.log(this.currentData);
    this.parse();
  }
  parse() {
    console.log('parse()');
        this.dates = Getarray.date(this.forecastData, 'ddd HH');
        this.temps_c = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.C, ENUM_MAX_MIN.NORMAL);
        this.temps_c_max = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.C, ENUM_MAX_MIN.MAX);
        this.temps_c_min = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.C, ENUM_MAX_MIN.MIN);
        this.temps_f = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.F, ENUM_MAX_MIN.NORMAL);
        this.temps_f_max = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.F, ENUM_MAX_MIN.MAX);
        this.temps_f_min = Getarray.temp(this.forecastData, ENUM_DEG_TYPE.F, ENUM_MAX_MIN.MIN);
        this.weather = Getarray.weather(this.forecastData, ENUM_WEATHER.NORMAL);
        this.pressure = Getarray.pressure(this.forecastData);
        this.humidity = Getarray.humidity(this.forecastData);
        this.wind_kph = Getarray.wind(this.forecastData);
        this.wind_mph = Util.convKphToMphArr(this.wind_kph);

        this.dates_2d = Util.convTo2dArray(this.dates, this.dates);
        this.temps_c_2d = Util.convTo2dArray(this.temps_c, this.dates);
        this.temps_c_max_2d = Util.convTo2dArray(this.temps_c, this.dates);
        this.temps_c_min_2d = Util.convTo2dArray(this.temps_c, this.dates);

        this.temps_f_2d = Util.convTo2dArray(this.temps_f, this.dates);
        this.temps_f_max_2d = Util.convTo2dArray(this.temps_f, this.dates);
        this.temps_f_min_2d = Util.convTo2dArray(this.temps_f, this.dates);


        for (let i = 0; i < this.temps_c_2d.length; i++) {
          if (this.temps_c_min_2d[i].length > 0) {
            this.temps_c_min_2d[i] = this.temps_c_min_2d[i]
            .reduce(function(a, b){return Math.min(a, b); }); };
          if (this.temps_c_max_2d[i].length > 0) {
            this.temps_c_max_2d[i] = this.temps_c_max_2d[i]
            .reduce(function(a, b){return Math.max(a, b); }); };
          if (this.temps_f_min_2d[i].length > 0) {
            this.temps_f_min_2d[i] = this.temps_f_min_2d[i]
            .reduce(function(a, b){return Math.min(a, b); }); };
          if (this.temps_f_max_2d[i].length > 0) {
            this.temps_f_max_2d[i] = this.temps_f_max_2d[i]
            .reduce(function(a, b){return Math.max(a, b); }); };
          // this.temps_c_max_2d[i] = this.temps_c_max_2d[i].reduce(function(a,b){return Math.max(a,b)});
          // this.temps_f_min_2d[i] = this.temps_f_min_2d[i].reduce(function(a,b){return Math.min(a,b)});
          // this.temps_f_max_2d[i] = this.temps_f_max_2d[i].reduce(function(a,b){return Math.max(a,b)});
        }
        console.log('temps_c_min');
        console.log(this.temps_c_min_2d);

        this.weather_2d = Util.convTo2dArray(this.weather, this.dates);
        this.pressure_2d = Util.convTo2dArray(this.pressure, this.dates);
        this.humidity_2d = Util.convTo2dArray(this.humidity, this.dates);
        this.wind_kph_2d = Util.convTo2dArray(this.wind_kph, this.dates);
        this.wind_mph_2d = Util.convTo2dArray(this.wind_mph, this.dates);
        this.loading.next(false);
  }
  log() {
            console.log(this.dates);
            console.log(this.temps_c);
            console.log(this.temps_c_max);
            console.log(this.temps_c_min);
            console.log(this.temps_f);
            console.log(this.temps_f_max);
            console.log(this.temps_f_min);
            console.log(this.weather);
            console.log(this.pressure);
            console.log(this.humidity);
            console.log(this.wind_kph);
            console.log(this.wind_mph);

            console.log(this.dates_2d);
            console.log(this.temps_c_2d);
            console.log(this.temps_f_2d);
            console.log(this.weather_2d);
            console.log(this.pressure_2d);
            console.log(this.humidity_2d);
            console.log(this.wind_kph_2d);
            console.log(this.wind_mph_2d);
  }

  getCurrentData() {
    return this.getCurrentMockData();
  }
  getForecastData() {
    return this.getForecastMockData();
  }
  getCurrentMockData() {
    return CURRENT;
  }
  getForecastMockData() {
    return FORECAST;
  }
  getCityName() {
    let ret: string = this.currentData['name'];
    return ret;
    //  console.log(this.getCurrentData())
  }
  getCountryCode() {
    let ret: string = this.currentData['sys']['country'];
    return ret;
  }
  getCurrentWeather() {
    let ret: string[] = [this.currentData['weather'][0]['main'], this.currentData['weather'][0]['description']];
    return ret;
  }
  getCurrentDate() {
    let ret: number = parseInt(this.currentData['dt'], 0);
    return ret;
  }
  getCurrentTempC() {
    return Util.round(Util.convTemp(this.currentData['main']['temp'], ENUM_DEG_TYPE.C), 1);
  }
  getCurrentTempF() {
    return Util.round(Util.convTemp(this.currentData['main']['temp'], ENUM_DEG_TYPE.F), 1);
  }
  getCurrentPressure() {
    return this.currentData['main']['pressure'];
  }
  getCurrentHumidity() {
    return this.currentData['main']['humidity'];
  }
  getCurrentWind() {
    let ret = this.currentData['wind']['speed'];
    if (!this.isDegreeTypeC.getValue()) {
      ret = Util.round(this.currentData['wind']['speed'] / 1.609344, 1);
    }
    return ret;
  }
  getCurrentWindUnit() {
    let ret = 'km/h';
    if (!this.isDegreeTypeC.getValue()) {
      ret = 'mph';
    }
    return ret;
  }
  getCurrentTemperatureUnit() {
    let ret = '°C';
    if (!this.isDegreeTypeC.getValue()) {
      ret = '°F';
    }
    return ret;
  }
  toggleDegreeType() {
    this.isDegreeTypeC.next(!this.isDegreeTypeC.getValue());
  }
  setSelectedDay(day) {
    this.selectedDay.next(day);
  }
  getPressureArray() {
    let ret = this.pressure_2d;
    ret = ret[this.selectedDay.getValue()];
    return ret;
  }
  getHumidityArray() {
    let ret = this.humidity_2d;
    ret = ret[this.selectedDay.getValue()];
    return ret;
  }
  getWindArray() {
    let ret = this.wind_kph_2d;
    if (!this.isDegreeTypeC.getValue()) {
      ret = this.wind_mph_2d;
    }
    ret = ret[this.selectedDay.getValue()];
    return ret;
  }
  getTemperatureArray() {
    let ret = this.temps_c_2d;
    if (!this.isDegreeTypeC.getValue()) {
      ret = this.temps_f_2d;
    }
    ret = ret[this.selectedDay.getValue()];
    return ret;
  }
  getDates() {
    let ret = this.dates_2d;
    ret = ret[this.selectedDay.getValue()];
    return ret;
  }
  getHours() {
    let dates = this.getDates();
    let ret = [];
    for (let i = 0; i < dates.length; i++ ){
      ret.push(dates[i].slice(4, 7));
    }
    console.log('getHours():');
    console.log(ret);
    return ret;
  }
  getMaxTemps() {
    let ret = this.temps_c_max_2d;
    if (!this.isDegreeTypeC.getValue()) {
      ret = this.temps_f_max_2d;
    }
    return ret;
  }
  getMinTemps() {
    let ret = this.temps_c_min_2d;
    // console.log(ret);
    if (!this.isDegreeTypeC.getValue()) {
      ret = this.temps_f_min_2d;
    }
    return ret;
  }
  setDay(day: number) {
    this.selectedDay.next(day);
  }
  setSelectedDatatype(datatype) {
    this.selectedDatatype.next(datatype);
  }
  getWeathers() {
    let ret = this.weather;
    return ret;
  }
  getDay() {
    let ret = [];
    for (let i = 0; i < this.dates_2d.length; i++) {
      ret.push(this.dates_2d[i].slice(0, 1));
      if (ret[i].length > 0) {ret[i] = ret[i][0].slice(0, 3); };
    }
    // console.log("!!!!!!!!!!!!!!!!!")
    // console.log(ret)
    return ret;
  }
}
