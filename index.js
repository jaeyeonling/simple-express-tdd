const server = require('./server/server')
const syncDB = require('./database/sync')

//
//
//

syncDB().then(() => {
  console.info('Sync database')

  server.listen(
    3000,
    () => console.log('Server is running...')
  )
})
