import { Component, ViewEncapsulation, Input, OnInit, AfterContentInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'wa-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SelectorComponent implements OnInit, AfterContentInit {
  @Input() mode: string = '';

  title: string;
  unit: string;
  value: number;
  receivedData;
  selectedDatatype = 'pressure';
  selectedTheme: string = 'theme-normal';

  constructor(private weatherService: WeatherService, private themeService: ThemeService) { }

  ngAfterContentInit() {
    // console.log("AfterViewInit()");
  }

  ngOnInit() {
    this.refreshView();
    this.weatherService.isDegreeTypeC.subscribe(isDegreeTypeC => {this.refreshView(); });
    this.weatherService.selectedDatatype.subscribe(selectedDatatype => {this.refreshView(selectedDatatype); });
    this.weatherService.loading.subscribe(loading => this.refreshView());
    this.themeService.selectedTheme.subscribe(selectedTheme => this.selectedTheme = selectedTheme);
  }

  onClick(value) {
    // console.log("refreshView" + value)
    if (value !== this.selectedDatatype) {
      this.weatherService.setSelectedDatatype(value);
    }else {
      this.weatherService.setSelectedDatatype('');
    }
  }

  refreshView(selectedDatatype = 'pressure') {
    // console.log("refreshView" + selectedDatatype)
    this.selectedDatatype = selectedDatatype;
    // onsole.log("selector.refresh():" + this.mode);
    switch (this.mode) {
      case 'pressure':
      this.title = 'Pressure';
      this.value = this.weatherService.getCurrentPressure();
      this.unit = 'Pa';
      break;
      case 'humidity':
      this.title = 'Humidity';
      this.value = this.weatherService.getCurrentHumidity();
      this.unit = '%';
      break;
      case 'wind':
      this.title = 'Wind';
      this.value = this.weatherService.getCurrentWind();
      this.unit = this.weatherService.getCurrentWindUnit();
      break;

      default:
      this.title = '';
      this.unit = '';
    }
  }

}
