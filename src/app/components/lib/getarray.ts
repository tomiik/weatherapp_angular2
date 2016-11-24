import { DatePipe } from './date-format';
import { Util } from './util';
import { ENUM_DEG_TYPE, ENUM_WEATHER, ENUM_MAX_MIN} from '../enum';
import * as moment from 'moment'


export var Getarray = {
  init: function(){
  },
  date: function(data, format){
    console.log('getDateArray()');
    let array = [];
    for (let i = 0; i < data.list.length; i++) {
      let date = Util.convDate((data.list[i]).dt,format);
      array.push(date);
    }
    console.log(array);
    return array;
  },
  temp: function(data, type, mode){
    // type : enum_temp_degree, .K: kelvin, .F:farenheit .C:celcius
    // mode : enum_temp_type, .NORMAL"normal", .MAX"max", .MIN"min"
    var array = [];
    var temp = 0;
    var temp_k = 0;
    var temp_c = 0;
    var temp_f = 0;
    for(var i = 0; i < data.list.length; i++) {
      if(mode === ENUM_MAX_MIN.MIN) {
        temp_k = (data.list[i]).main.temp_min;
      }else if(mode === ENUM_MAX_MIN.MAX) {
        temp_k = (data.list[i]).main.temp_max;
      }else{
        temp_k = (data.list[i]).main.temp;
      }
      temp = Util.convTemp(temp_k,type);
      array.push(temp);
    }
    return array;
  },
  pressure: function(data){
    var array = [];
    var humid = 0;
    for(var i = 0; i < data.list.length; i++){
      humid = (data.list[i]).main.pressure;
      array.push(humid);
    }
    return array;
  },
  humidity: function(data){
    var array = [];
    var humid = 0;
    for(var i = 0; i < data.list.length; i++){
      humid = (data.list[i]).main.humidity;
      array.push(humid);
    }
    return array;
  },
  wind: function(data){
    var array = [];
    var windspeed = 0;
    for(var i = 0; i < data.list.length; i++){
      windspeed = (data.list[i]).wind.speed;
      array.push(windspeed);
    }
    return array;
  },
  weather: function(data,mode){
    var array = [];
    var weather = 0;
    var description = 0;
    for (let i = 0; i < data.list.length; i++) {
      weather = ((data.list[i]).weather[0]).main;
      description = ((data.list[i]).weather[0]).description;
      if (mode === ENUM_WEATHER.DETAIL) {
        weather = description;
      }
      array.push(weather);
    }
    return array;
  },
  extractDay: function(data, day){
    var array = [];
    array.push(data[day * 3]);
    array.push(data[day * 3 + 1]);
    array.push(data[day * 3 + 2]);
    return array;
  }
}
