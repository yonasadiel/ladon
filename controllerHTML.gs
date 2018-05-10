function outputHtmlFromFile(file, data) {
  var output = outputHtmlFromTemplate(file, data)
  return outputHtmlFromPage(output)
}

function outputHtmlFromPage(page) {
  page.addMetaTag('viewport', 'width=device-width, initial-scale=1')
  
  if (typeof APPS_NAME !== 'undefined')
    page.setTitle(APPS_NAME)
  else
    page.setTitle('Untitled Ladon Project')
    
  if (typeof FAVICON_URL !== 'undefined')
    page.setFaviconUrl(FAVICON_URL)
  return page;
}

function outputHtmlFromTemplate(template, data) {
  var template = HtmlService.createTemplateFromFile(template)
  template.data = data
  return template.evaluate()
}

function outputHtmlFromText(text) {
  return outputHtmlFromPage(HtmlService.createHtmlOutput(text))
}

function outputJSONFromObject(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JAVASCRIPT)
}

function include(filename, data) {
  return outputHtmlFromTemplate(filename, data).getContent()
}