const models = require('../database/models')

//
//
//

const findUserAll = (req, res) => {
  let {
    limit = 10,
    offset = 0
  } = req.query

  limit = parseInt(limit, 10)
  offset = parseInt(offset, 10)

  if (Number.isNaN(limit)) {
    return res.status(400).end()
  }
  if (Number.isNaN(offset)) {
    return res.status(400).end()
  }

  return models.User
    .findAll({
      limit,
      offset
    })
    .then(users => res.json(users))
}

const findUserByUserId = (req, res) => {
  let {
    userId
  } = req.params

  userId = parseInt(userId)

  if (Number.isNaN(userId)) {
    return res.status(400).end()
  }

  return models.User
    .findOne({
      where: {
        id: userId
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).end()
      }

      return res.json(user)
    })
}

const deleteUserByUserId = (req, res) => {
  let {
    userId
  } = req.params

  userId = parseInt(userId)

  if (Number.isNaN(userId)) {
    return res.status(400).end()
  }

  return models.User
    .destroy({
      where: {
        id: userId
      }
    })
    .then(() => res.status(204).end())
}

const saveUser = (req, res) => {
  const {
    name
  } = req.body

  if (!name) {
    return res.status(400).end()
  }

  return models.User.create({
    name
  })
  .then(user => res.status(201).json(user))
  .catch(err => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).end()
    }

    return res.status(500).end()
  })
}

const saveUserByUserId = (req, res) => {
  let {
    userId
  } = req.params

  userId = parseInt(userId)

  if (Number.isNaN(userId)) {
    return res.status(400).end()
  }

  const {
    name
  } = req.body

  if (!name) {
    return res.status(400).end()
  }

  return models.User
    .findOne({
      where: {
        id: userId
      }
   })
   .then(user => {
     if (!user) {
       return res.status(404).end()
     }

     user.name = name

     return user.save()
      .then(() => res.json(user))
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end()
        }

        return res.status(500).end()
      })
   })
}

//
//
//

module.exports = {
  findUserAll,
  findUserByUserId,
  deleteUserByUserId,
  saveUser,
  saveUserByUserId
}
