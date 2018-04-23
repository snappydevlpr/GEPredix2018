function tempHumidityOzone(var humidity,var temp){
  return -0.01034 + 0.0002211*humidity + .0003525*temp;
}

function tempPressureOzone(var pressure, var temp){
  return 1.68 + -.05495*pressure + -.0001346*temp
}

function ozonePredictor()
{
  var temp      = document.getElementById("temp").value;
  var pressure  = document.getElementById("pressure").value;
  var humidity  = document.getElementById("humidity").value;
  var warning   = document.getElementById("warning");
  var numeric   = document.getElementById("numeric");
  var ozone1    = tempPressureOzone(pressure,temp);
  var ozone2    = tempHumidityOzone(humidity,temp);

  var ozoneMedium = (ozone1+ozone2)/2;

  switch(ozoneMedium)
  {
    case 0<=ozoneMedium && ozoneMedium<=.05:
      document.getElementById("warning").innerHTML = "Ozone levels are good!";
      break;
    case .05 < ozoneMedium && ozoneMedium <= .30:
      document.getElementById("warning").innerHTML = "Ozone levels are ok!";
      break;
    case .3 < ozoneMedium && ozoneMedium <= 25:
      document.getElementById("warning").innerHTML = "Ozone levels are bad!";
      break;
    case default:
      document.getElementById("warning").innerHTML = "Ozone levels cant be read";
      break;
  }
}
