RegExp.prototype.toJSON = function() { return this.source }

function doGet() {
  bootstrap()
  return outputHtmlFromFile('viewForm')
}

function getPage(page, idx) {
  bootstrap()
  if (page === 'form')
    return outputHtmlFromFile('viewForm').getContent()
  else if (page === 'result')
    if (typeof idx === 'undefined' || idx === null)
      return outputHtmlFromFile('viewDataAll').getContent()
    else
      return outputHtmlFromFile('viewDataSingle', { idx: idx }).getContent()
  else
    throw 'Page not found.'
}