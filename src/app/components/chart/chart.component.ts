import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';
import { WeatherService } from '../weather.service';
@Component({
    selector: 'wa-chart',
    templateUrl: 'chart.component.html',
    styleUrls: ['./chart.component.css'],
    encapsulation: ViewEncapsulation.Emulated

  })
export class ChartComponent implements OnInit {
  options: Object;
  loading: boolean = true;
  constructor(private weatherService: WeatherService) {
      this.options = {
          title : { text : 'simple chart' },
          series: [{
              data: [29.9, 71.5, 106.4, 129],
          }]
      };
  }

  ngOnInit() {
    this.weatherService.isDegreeTypeC.subscribe(isDegreeTypeC => {this.refreshView(); });
    this.weatherService.selectedDay.subscribe(selectedDay => {this.refreshView(); });
    this.weatherService.selectedDatatype.subscribe(selectedDatatype => {this.refreshView(selectedDatatype); });
    this.weatherService.loading.subscribe(loading => this.refreshView());
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
    if (selectedDatatype === '') {
      this.options = this.simpleChart('Temperature', this.weatherService.getDates(), this.weatherService.getTemperatureArray(), this.weatherService.getCurrentTemperatureUnit());
    }else if ( selectedDatatype === 'Pressure') {
      this.options = this.simpleChart('Pressure', this.weatherService.getDates(), this.weatherService.getPressureArray(), 'Pa');
    }else if (selectedDatatype === 'Wind') {
      this.options = this.simpleChart('Wind', this.weatherService.getDates(), this.weatherService.getWindArray(), this.weatherService.getCurrentWindUnit());
    }else if (selectedDatatype === 'Humidity') {
      this.options = this.simpleChart('Humidity', this.weatherService.getDates(), this.weatherService.getHumidityArray(), '%');
    }
    this.loading = false;
    console.log("loading:");
    console.log(this.loading)
    // console.log(this.options)
  }

  simpleChart (title, dates,temps,unit) {
    // console.log(dummy);
    // console.log(dates);
    // console.log(temps);
    let ret = {
      // chart: {
      //   type: 'line'
      // },
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
           text: title + ' [' + unit + ']'
         }
      },
      xAxis: {
         categories: dates
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
      // series: dummy
      series: [{data: temps}]
    };
    return ret;
  }
}
