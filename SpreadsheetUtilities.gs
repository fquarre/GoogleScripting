function getHeaderIndex(spreadsheetID, header) {
  var result = getColIndexByValue(spreadsheetID, 1, header);
  //log("getHeaderIndex debug: header "+header+" in position :"+result);
  return result;
}
function getHeaderIndexInRange(range, header) {
  var result = getColIndexByValueInRange(range, header);
  //log("getHeaderIndex debug: header "+header+" in position :"+result);
  return result;
}


/**
*
* @param 
* @param
* @return {integer}
*/
function getColIndexByValue(spreadsheetID, rowIndex, value) {
  var ss = SpreadsheetApp.openById(spreadsheetID);
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange(rowIndex, 1, rowIndex, sheet.getLastColumn());
  return getColIndexByValueInRange(range, value);
}

/**
*
* @param 
* @param
* @return {integer}
*/
function getColIndexByValueInRange(range, value) {
  var valuePresent = false;
  var rangeIterator = 0;
  var rangeLength = range.getLastColumn();
  var rangeData = range.getValues();
  
  //log("getColIndexByValueInRange Debug, searching for entry: "+value+" in a size of "+rangeLength);
  while ((rangeIterator < rangeLength) && (!valuePresent)) {
    //log("getColIndexByValueInRange Debug, currentEntry: "+rangeData[0][rangeIterator]);
    if (rangeData[0][rangeIterator] == value) {
      valuePresent = true;
    }
    rangeIterator++;
  }
  //log("getColIndexByValueInRange Debug, result: "+valuePresent);
  return valuePresent ? rangeIterator : -1;
}


function getRowIndexByValue(spreadsheetID, colIndex, value, hasHeader) {
  var startRow = hasHeader ? 2 : 1;
  var ss = SpreadsheetApp.openById(spreadsheetID);
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange(startRow, colIndex, sheet.getLastRow());
  return getRowIndexByValueInRange(range, value);
}
/**
*
* @param 
* @param
* @return {integer}
*/
function getRowIndexByValueInRange(range, value) {
  var valuePresent = false;
  var rangeIterator = 0;
  var rangeWidth = range.getLastRow();
  var rangeData = range.getValues();
  
  //log("getRowIndexByValueInRange Debug, searching for: "+value);
  while ((rangeIterator < rangeWidth) && (!valuePresent)) {
    //log("getRowIndexByValueInRange Debug, current value: "+rangeData[rangeIterator][0]);
    if (rangeData[rangeIterator][0] == value) {
      valuePresent = true;
    }
    rangeIterator++;
  }
  //log("getRowIndexByValueInRange Debug, found value: "+(valuePresent ? rangeIterator : -1));
  return valuePresent ? rangeIterator : -1;
}

/**
*
* @param 
* @param
* @return {boolean}
*/
function isValueInColumn(range, value) {
  return isValueIn1DRange(range, value)
}
function isValueIn1DRange(range, value) {
  var valuePresent = false;
  var rangeIterator = 0;
  var rangeLength = range.getLastRow() - 1;
  while ((rangeIterator < rangeLength-1) && (!valuePresent)) {
    if (range.getValues()[rangeIterator] == value) {
      valuePresent = true;
    }
    rangeIterator++;
  }
  return valuePresent;
}
