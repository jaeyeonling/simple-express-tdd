const models = require('./models')

//
//
//

const options = {
  force: process.env.NODE_ENV === 'test'
}

const sync = () => models.sequelize.sync(options)

//
//
//

module.exports = sync

