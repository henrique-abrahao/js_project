const Rank = require('../../../model/rankModel')

Rank.methods(['get', 'post', 'put', 'delete'])
Rank.updateOptions({new: true, runValidators: true})

module.exports = Rank