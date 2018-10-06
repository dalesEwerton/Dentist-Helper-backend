const form = require('./form')

form.methods(['get', 'post', 'put', 'delete'])

form.updateOptions({new: true, runValidators: true})

module.exports = form