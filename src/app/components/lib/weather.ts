
export var Weather = {
  getIcon(str: string) {
    str = str.toLowerCase();
    // console.log("str=" + str)
    // str = str.toLowerCase();
    let icon = '';
    if (str.match('haze') != null) {
      icon = 'wi-day-haze';
    }else if (str.match('few cloud') != null) {
      icon = 'wi-day-cloudy';
    }else if (str.match('clear') != null) {
      icon = 'wi-day-sunny';
    }else if (str.match('rain') != null) {
      icon = 'wi-rain';
    }else if (str.match('cloud') != null) {
      icon = 'wi-cloud';
    }else if (str.match('mist') != null) {
      icon = 'wi-dust';
    }else if (str.match('fog') != null) {
      icon = 'wi-dust';
    }else if (str.match('snow') != null) {
      icon = 'wi-snow';
    }
    return icon;
  }
};
