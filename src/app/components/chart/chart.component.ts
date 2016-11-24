import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { WeatherService } from '../weather.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'wa-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['./chart.component.css'],
  // encapsulation: ViewEncapsulation.Emulated

})
export class ChartComponent implements OnInit {
  options: Object;
  loading: boolean = true;
  bgColor: string = '#ddd';
  fontColor: string = '#333';
  fontSize: string = '1em';
  selectedDatatype = 'Temperature';
  selectedTheme: string = 'theme-normal';
  selectedSize: string = 'size-normal';
  marginLeft: number = 50;
  ylabelx: number = 0;
  constructor(private weatherService: WeatherService, private themeService: ThemeService) {
    this.options = {
      title : { text : 'simple chart' },
      series: [{
        data: [29.9, 71.5, 106.4, 129],
      }]
    };
  }
  sizeChanged() {
    switch (this.selectedSize) {
      case 'size-normal':
        this.fontSize = '1em';
        this.marginLeft = 50;
        this.ylabelx = 0;
        break;
      case 'size-mini':
        this.fontSize = '0.5em';
        this.marginLeft = 45;
        this.ylabelx = 1;
        break;
    }
    this.refreshView();
  }
  themeChanged() {
    switch (this.selectedTheme) {
      case 'theme-normal':
        this.bgColor = '#ddd';
        this.fontColor = '#333';
        break;
      case 'theme-dark':
        this.bgColor = '#333';
        this.fontColor = '#ddd';
        break;
      case 'theme-warm':
        this.bgColor = '#f82';
        this.fontColor = '#eee';
        break;
      case 'theme-cold':
        this.bgColor = '#06e';
        this.fontColor = '#eee';
        break;
    }
    this.refreshView();
  }

  ngOnInit() {
    this.weatherService.isDegreeTypeC.subscribe(isDegreeTypeC => {this.refreshView(); });
    this.weatherService.selectedDay.subscribe(selectedDay => {this.refreshView(); });
    this.weatherService.selectedDatatype.subscribe(selectedDatatype => {
                                        this.selectedDatatype = selectedDatatype;
                                        this.refreshView(); });
    this.weatherService.loading.subscribe(loading => this.refreshView());
    this.themeChanged();
    this.themeService.selectedSize.subscribe(selectedSize => {this.selectedSize = selectedSize;  this.sizeChanged(); });
    this.themeService.selectedTheme.subscribe(selectedTheme => {this.selectedTheme = selectedTheme; this.themeChanged(); });
  }

  refreshView(selectedDatatype = '') {
    let params = {
      title : { text : 'simple chart' },
      series: [{
        data: this.weatherService.getWindArray(),
      }]
    };
    // console.log(this.weatherService.getDates());
    // console.log(this.weatherService.getWindArray());
    if (this.selectedDatatype === '') {
      this.options = this.simpleChart('Temperature', this.weatherService.getTemperatureArray(), this.weatherService.getCurrentTemperatureUnit());
    }else if ( this.selectedDatatype === 'Pressure') {
      this.options = this.simpleChart('Pressure', this.weatherService.getPressureArray(), 'Pa');
    }else if ( this.selectedDatatype === 'Wind') {
      this.options = this.simpleChart('Wind', this.weatherService.getWindArray(), this.weatherService.getCurrentWindUnit());
    }else if ( this.selectedDatatype === 'Humidity') {
      this.options = this.simpleChart('Humidity', this.weatherService.getHumidityArray(), '%');
    }
    this.loading = false;
    console.log('loading:');
    console.log(this.loading);
    // console.log(this.options)
  }

  simpleChart (title, temps, unit) {
    let hours = this.weatherService.getHours();
    // console.log(dummy);
    // console.log(dates);
    // console.log(temps);
    let ret = {
      // chart: {
      //   type: 'line'
      // },
      colors: [this.fontColor],
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      // subtitle: {
      //   text: source
      // },
      tooltip: {
        valueSuffix: unit
      },
      yAxis: {
        title: {
          text: title + ' [' + unit + ']',
          style: {
            'color': this.fontColor,
            fontSize: this.fontSize,
          }
        },
        labels: {
          style: {
            fontFamily: 'Unica One, sans-serif',
            color: this.fontColor,
            fontSize: this.fontSize,
          }
        },
      },
      xAxis: {
        categories: hours,
        style: {
          'color': this.fontColor
        },
        gridLineWidth: 1,
        labels: {
          style: {
            fontFamily: 'Unica One, sans-serif',
            color: this.fontColor,
            fontSize: this.fontSize,
          }
        },
        // lineColor: "#ff0",
        tickWidth: 1,
      },
      credits: {
        enabled: false
      },
      // plotOptions: {
      //   line: {
      //     dataLabels: {
      //       enabled: true
      //     },
      //     enableMouseTracking: true
      //   }
      // },
      legend: {
        enabled: false
      },
      chart: {
        backgroundColor: this.bgColor,
        spacingTop: 3,
        spacingRight: 0,
        spacingBottom: 3,
        spacingLeft: 0,
        marginLeft: this.marginLeft,
      },
      // series: dummy
      series: [{data: temps}],

    };
    return ret;
  }
}
