function log(logEntry) { //create service utility for all these functions; leverage range utility from utility
  var SPREADSHEETID_LOG = "[INSERT FILE YOU WANT TO USE FOR TRACKING]";
  
  if (SPREADSHEETID_LOG == ""){  // logging file was omitted, exit
    Logger.log("SCRIPT TERMINATION: Logging constant SPREADSHEETID_LOG was not initiated");
    return false;
  }
  
  var ssLog = SpreadsheetApp.openById(SPREADSHEETID_LOG);
  var sheetLog = ssLog.getSheets()[0];
  var newLogData = [[new Date().toTimeString(), logEntry]];
  sheetLog.getRange(sheetLog.getLastRow()+1, 1, 1, 2).setValues(newLogData);

  return true;
}
