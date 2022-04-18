function fetchFromAssessor() {
  var sourceSheet = SpreadsheetApp.openById("1h-0HeI-u4L5R3RJJWdXIGT9yLrjJiMEPlXS5dpA4knk").getSheetByName("Sheet1");
  var url = "https://www.cookcountyassessor.com/pin/"
  
  //Retrieve website page
  var startRow = 98;
  var pinsRange = sourceSheet.getRange("E"+startRow+":E488");
    // console.info(pinsRange)
  var pinsArr = pinsRange.getValues();
    // console.info(pinsArr[0][0])


  var reTEV = new RegExp("<div class=\"col-xs-3 pt-header\">Total Estimated Market Value<\/div>\\n\\s+<div class=\"col-xs-4\">(.+)<\/div>\\n\\s+<div class=\"col-xs-5\">(.+)<\/div>\\n\\s+<\/div>", "i");
  var reTSHIP = new RegExp("\\s+<span class=\"detail-row--label\">Township<\/span>\\n\\s+<span class=\"detail-row--detail\">\\n\\s+(.+)\\n\\s+<\/span>\\n\\s+<\/div>", "i");
  var reSQFT = new RegExp("<div class=\"detail-row\">\\n\\s+<span class=\"detail-row--label\">Building Square Footage<\/span>\\n\\s+<span class=\"detail-row--detail\">(.+)<\/span>\\n\\s+<\/div>", "i");
  var reAge =  new RegExp("<div class=\"detail-row\">\\n\\s+<span class=\"detail-row--label\">Age<\/span>\\n\\s+<span class=\"detail-row--detail\">(.+)<\/span>\\n\\s+<\/div>", "i");

  for (var pinIt = 0; pinIt < pinsArr.length; pinIt++) {
    pinnedURL = url + pinsArr[pinIt][0];
    // console.info("URL: "+pinnedURL);
    
    try {
      var urlContent = UrlFetchApp.fetch(pinnedURL).getContentText();
    // console.info(urlContent);
    } catch(e) {
      console.info("Error fetching URL");
    }

    // var value2021 = reTEV.exec(urlContent)[1]; // console.info(value2021);
    // var value2020 = reTEV.exec(urlContent)[2]; // console.info(value2020);
    
    try { // Township
      sourceSheet.getRange(pinIt+startRow, 6, 1, 1).setValue(reTSHIP.exec(urlContent)[1]);
    } catch(e) {
      sourceSheet.getRange(pinIt+startRow, 6, 1, 1).setValue("Retrieval Error");
    }
    try { // 2020 value
      sourceSheet.getRange(pinIt+startRow, 7, 1, 1).setValue(reTEV.exec(urlContent)[2]); 
    } catch(e) {
      sourceSheet.getRange(pinIt+startRow, 7, 1, 1).setValue("Retrieval Error");
    }
    try { // 2021 value
      sourceSheet.getRange(pinIt+startRow, 8, 1, 1).setValue(reTEV.exec(urlContent)[1]); 
    } catch(e) {
      sourceSheet.getRange(pinIt+startRow, 8, 1, 1).setValue("Retrieval Error");
    }

    try { // SquareFootage
      sourceSheet.getRange(pinIt+startRow, 11, 1, 1).setValue(reSQFT.exec(urlContent)[1]); 
    } catch(e) {
      sourceSheet.getRange(pinIt+startRow, 11, 1, 1).setValue("Retrieval Error");
    }

    try { // Age
      sourceSheet.getRange(pinIt+startRow, 12, 1, 1).setValue(reAge.exec(urlContent)[1]); 
    } catch(e) {
      sourceSheet.getRange(pinIt+startRow, 12, 1, 1).setValue("Retrieval Error");
    }

    Utilities.sleep(2000);
  }
}
