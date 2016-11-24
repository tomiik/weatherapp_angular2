import {ENUM_DEG_TYPE} from '../enum';
import * as moment from 'moment';


export var Util = {
  init: function(){
  },
  convTo2dArray(data, dates) {
    let result = [];
    let day = dates[0].slice(0, 3);
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (day !== dates[i].slice(0, 3)) {
        result.push(temp);
        temp = [];
      }else {
        temp.push(data[i]);
      }
      day = dates[i].slice(0, 3);
    }
    result.push(temp);
    return result;
  },
  removeDay: function(date){
    let result = [];
    for (let i = 0; i < date.length; i++) {
      result.push(date[i].slice(4, date[i].length));
    }
    return result;
  },
  averageArray: function(arr){
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
      result += arr[i];
    }
    return result;
  },
  maxArray: function(arr){
    let result = -999;
    for (let i = 0; i < arr.length; i++) {
      result = Math.max(result, arr[i]);
    }
    return result;
  },
  minArray: function(arr){
    let result = 999;
    for (let i = 0; i < arr.length; i++) {
      result = Math.min(result, arr[i]);
    }
    return result;
  },
  convTemp(temp_k, degtype) {
    let temp_c: number = this.round(temp_k - 273.15, 2);
    let temp_f: number = this.round(((9 / 5) * temp_c + 32), 2);
    let  temp: number = temp_c;

    if (degtype === ENUM_DEG_TYPE.F) {
      temp = temp_f;
    }else if (degtype === ENUM_DEG_TYPE.C) {
      temp = temp_c;
    }else {
      temp = temp_k;
    }
    return temp;
  },
  getCountryFlag: function(country){
    country = country.toLowerCase();
    let result = '<span class=\'flag-icon flag-icon-' + country + '\'></span>';
    // console.log(result);
    return result;
  },
  withCountryFlag: function(country){
    return this.getCountryFlag(country) + ' ' + country;
  },
  round: function(data, digit){
    let shift = Math.pow(10, digit);
    data = Math.round(data * shift) / shift;
    return data;
  },
  convDate: function(date, format){
    return date = moment(date * 1000).format(format);
  },
  // unselectAllDayButton: function(){
  //   $("#day0").removeClass("selected");
  //   $("#day1").removeClass("selected");
  //   $("#day2").removeClass("selected");
  //   $("#day3").removeClass("selected");
  //   $("#day4").removeClass("selected");
  // },
  // removeDay: function(date){
  //   console.log("removeDay")
  //   var result = [];
  //   for(var i = 0; i < date.length; i++){
  //     result.push(date[i].slice(4,date[i].length));
  //   }
  //   console.log(result)
  //   return result;
  // },
  convKphToMphArr: function(data){
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(this.convKphToMph(data[i]));
    }
    return result;
  },
  convKphToMph: function(data){
    return Util.round(data / 1.609344, 2);
  }
};
