//returns a weekending date. weeks end on saturday: week of day = 6
function getWeekEnding(date) {
  date = (typeof date == "string") ? new Date(date) : date;
  var dateDayOfWeek = date.getDay();
  return getDateByDaysOffset(date, 6-dateDayOfWeek);
}

//returns a date with +/-days of offset
function getDateByDaysOffset(date, offset) {
  date = (typeof date == "string") ? new Date(date) : date;
  var MILSECONDS_IN_A_DAY = 1000*60*60*24;  
  return new Date(date.valueOf()+(offset*MILSECONDS_IN_A_DAY));  
}

var TimesheetShortDay = { //replace direct access to constants with this Enum
  0:"n",1:"m",2:"t",3:"w",4:"r",5:"f",6:"s",
  Sun:"n",Mon:"m",Tue:"t",Wed:"w",Thu:"r",Fri:"f",Sat:"s",
  Sunday:"n",Monday:"m",Tuesday:"t",Wednesday:"w",Thursday:"r",Friday:"f",Saturday:"s"
};

function getShortdayFromDate(date) {
  var result;

  switch(Utilities.formatDate(date, "EST", "E")) {
    case "Sun":
      result = "n";
      break;
    case "Mon":
      result = "m";
      break;
    case "Tue":
      result = "t";
      break;
    case "Wed":
      result = "w";
      break;
    case "Thu":
      result = "r";
      break;
    case "Fri":
      result = "f";
      break;
    case "Sat":
      result = "s";
      break;
    default:
      result = -1;
      break;
  }
  
  return result;
}
