var fieldIdToName = { }
var fieldNameToId = { }

function bootstrap() {
  for (var sectionIdx = 0; sectionIdx < SCHEMA.sections.length; sectionIdx++) {
    for (var fieldIdx = 0; fieldIdx < SCHEMA.sections[sectionIdx].fields.length; fieldIdx++) {
      var field = SCHEMA.sections[sectionIdx].fields[fieldIdx]
      
      fieldIdToName[field.id] = field.name
      fieldNameToId[field.name] = field.id
    }
  }
}

