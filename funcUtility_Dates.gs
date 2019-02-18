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
