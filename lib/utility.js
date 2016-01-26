'use strict'

module.exports.getProjection = (schema) => {
  let projection = {}
  schema.fields.forEach((fi) => {
    if(fi.hidden) {
      projection[fi.name] = 0
    }
  })
  return projection
}
