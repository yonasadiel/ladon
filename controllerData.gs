/**
 * get sheet with name sheetName
 * callback(sheet)
 */
function getSheet(sheetName, callback) {
  return callback(
    SpreadsheetApp
      .openById(SPREADSHEET_ID)
      .getSheetByName(sheetName)
  )
}

/**
 * get every data in sheet as object
 * { headers : [ every header in sheet ] 
 *   rows : [ { a row as object } for every rows ] }
 * callback(data)
 */
function loadSheet(sheet, callback) {
  var sheetArr = sheet.getSheetValues(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  var data = { headers: [], rows: [] }
  for (var j = 0; j < sheetArr[0].length; j++) {
    data.headers.push(sheetArr[0][j])
  }
  for (var i = 1; i < sheetArr.length; i++) {
    var row = {}
    for (var j = 0; j < sheetArr[i].length; j++) {
      row[sheetArr[0][j]] = sheetArr[i][j]
    }
    data.rows.push(row)
  }
  return callback(data)
}

function addRow(row) {
  getSheet(SCHEMA.sheetName, function (sheet) {
    sheet.appendRow(row)
  })
}

/**
 * callback([{ a data } for every row have prop set to content ])
 */
function find(prop, content, callback) {
  getSheet(SCHEMA.sheetName, function(sheet) {
    loadSheet(sheet, function(data) {
      if (data.headers.indexOf(prop) === -1)
        throw 'no prop found'
      var rowsMatched = []
      data.rows.forEach(function(item, index) {
        if (item[prop] == content) {
          rowsMatched.push(item)
        }
      })
      return callback(rowsMatched)
    })
  })
}

function FormValidationFailureException(error) {
  this.message = JSON.stringify(error)
  this.toString = function() {
    return this.message
  }
}

function processFormData(formData) {
  var error = []
  var data = []
  for (var sectionIdx = 0; sectionIdx < SCHEMA.sections.length; sectionIdx++) {
    for (var fieldIdx = 0; fieldIdx < SCHEMA.sections[sectionIdx].fields.length; fieldIdx++) {
      var field = SCHEMA.sections[sectionIdx].fields[fieldIdx]
      var exist = false
      if (field.type === 'paragraph') { }
      else if (field.type === 'updateTimestamp') { data.push(new Date()) }
      else if (field.type === 'createTimestamp') { data.push(new Date()) }
      else {
        for (var name in formData) {
          if (name === field.id) {
            if (field.type === 'checkbox') {
              if (typeof formData[name] === "string") {
                formData[name] = [formData[name]]
              }
              data.push(formData[name].join(", "))
            } else if (field.type === 'number') {
              data.push("'" + formData[name])
            } else {
              data.push(formData[name])
            }
            exist = true
            
            try {
              validateFieldValue(field, formData[name])
            } catch (err) {
            Logger.log(err)
              error.push({ id: field.id, msg: err })
            }
          }
        }
        if (!exist) {
          data.push("")
          if ((typeof field.validate !== 'undefined' && ! "".match(field.validate)) || (typeof field.minimum !== 'undefined')) {
            error.push({id: field.id, msg: field.error})
          }
        }
      }
    }
  }
  if (error.length > 0) {
    throw new FormValidationFailureException(error)
  } else {
    addRow(data)
    return
  }
}

function validateFieldValue(field, val) {
  var success = true
  if (typeof field.validate === 'string') field.validate = new RegExp(field.validate)
  if ((field.type === 'text'
       || field.type === 'number'
       || field.type === 'date'
       || field.type === 'radio'
       || field.type === 'email'
       || field.type === 'autocomplete')
      && typeof field.validate !== 'undefined') {
    if (! val.match(field.validate)) {
      success = false
    }
  }
  if (field.type === 'checkbox') {
    if (typeof field.minimum !== 'undefined' && val < field.minimum)
      success = false
    if (typeof field.maximum !== 'undefined' && val > field.maximum)
      success = false
  }
  if (field.type === 'number')
    if ((typeof field.minimum !== 'undefined' && parseInt(val) < field.minimum)
        || (typeof field.maximum !== 'undefined' && parseInt(val) > field.maximum))
      success = false
      
  if (success)
    return
  else
    if (typeof field.error !== 'undefined')
      throw field.error
    else
      throw 'Entry doesn\'t match to required format'
}

function getListOf(headers) {
  if (typeof headers === 'string')
    headers = [headers]
  var rows = []
  getSheet(SCHEMA.sheetName, function(sheet) {
    loadSheet(sheet, function(data) {
      data.rows.forEach(function(item, index) {
        var newItem = {}
        for (var headerIdx = 0; headerIdx < headers.length; headerIdx++)
          newItem[headers[headerIdx]] = item[headers[headerIdx]]
        rows.push(newItem)
      })
    })
  })
  return rows
}

function getJSONRowById(idx) {
  var row = null
  getSheet(SCHEMA.sheetName, function(sheet) {
    loadSheet(sheet, function(data) {
      row = data.rows[idx]
    })
  })
  return JSON.stringify(row)
}