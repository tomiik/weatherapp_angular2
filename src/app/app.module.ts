import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CountryEntryComponent } from './components';
import { CountryInfoComponent } from './components';

import { ChartModule } from 'angular2-highcharts';

import { WeatherService,TodaysWeatherComponent, SelectorComponent, ChartComponent, DayIconComponent, DaySelectorComponent } from './components';
// import { MaterializeDirective } from "angular2-materialize";


@NgModule({
  declarations: [
    AppComponent,
    CountryEntryComponent,
    CountryInfoComponent,
    TodaysWeatherComponent,
    SelectorComponent,
    ChartComponent,
    DayIconComponent,
    DaySelectorComponent,
//    MaterializeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
