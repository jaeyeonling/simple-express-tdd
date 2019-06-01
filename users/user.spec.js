const request = require('supertest')
const should = require('should')

const server = require('../server/server')
const models = require('../database/models')

//
//
//


describe('GET /users는 ', () => {
  const users = [
    { name: 'hello' },
    { name: 'world' },
    { name: 'greet' }
  ]
  before(() => models.sequelize.sync({ force: true }))
  before(() => models.User.bulkCreate(users))

  describe('성공시 ', () => {
    before(() => models.sequelize.sync({ force: true }))
    before(() => models.User.bulkCreate(users))

    it('유저 객체를 담은 배열로 응답한다. ', done => {
      request(server)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array)
          done()
        })
    })

    const limit = 2
    it(`최대 limit(${limit}) 갯수만큼 응답한다.`, done => {
      request(server)
        .get(`/users?limit=${limit}`)
        .end((err, res) => {
          res.body.should.have.lengthOf(limit)
          done()
        })
    })
  })

  describe('실패시 ', () => {
    it('limit이 숫자형이 아니면 400을 응답한다.', done => {
      request(server)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })

    it('offset이 숫자형이 아니면 400을 응답한다.', done => {
      request(server)
        .get('/users?offset=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /users/:userId 는 ', () => {
  const users = [
    { name: 'hello' },
    { name: 'world' },
    { name: 'greet' }
  ]
  before(() => models.sequelize.sync({ force: true }))
  before(() => models.User.bulkCreate(users))

  describe('성공시', () => {
    const userId = 1

    it(`id가 ${userId}인 유저 객체를 반환한다. `, done => {
      request(server)
        .get(`/users/${userId}`)
        .end((err, res) => {
          res.body.should.have.property('id', userId)
          done()
        })
    })
  })

  describe('실패시', () => {
    it('id가 숫자형이 아니면 400을 응답한다. ', done => {
      request(server)
        .get('/users/one')
        .expect(400)
        .end(done)
    })

    it('id가 없는 아이디면 404를 리턴한다. ', done => {
      request(server)
        .get('/users/123456789')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /users/:userId 는 ', () => {
  const users = [
    { name: 'hello' },
    { name: 'world' },
    { name: 'greet' },
    { name: 'matt' }
  ]
  before(() => models.sequelize.sync({ force: true }))
  before(() => models.User.bulkCreate(users))

 describe('성공시', () => {
    it('204를 리턴한다. ', done => {
      request(server)
        .delete('/users/1')
        .expect(204)
        .end(done)
    })
  })

  describe('실패시', () => {
    it('id가 숫자형이 아니면 400을 응답한다. ', done => {
      request(server)
        .delete('/users/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /users는 ', () => {
  const users = [
    { name: 'hello' },
    { name: 'world' },
    { name: 'greet' },
    { name: 'matt' }
  ]
  before(() => models.sequelize.sync({ force: true }))
  before(() => models.User.bulkCreate(users))

  describe('성공시', () => {
    const user = {
      name: 'newUser'
    }
    let body

    before(done => {
      request(server)
        .post('/users')
        .send(user)
        .expect(201)
        .end((err, res) => {
          body = res.body
          done()
        })
    })

    it('생성된 유저 객체를 반환한다. ', () => body.should.have.property('id'))
    it('입력한 name을 반환한다. ', () => body.should.have.property('name', user.name))
  })

  describe('실패시', () => {
    it('name이 없을 시 400을 반환한다. ', done => {
      request(server)
        .post('/users')
        .send({ })
        .expect(400)
        .end(done)
    })

    it('name이 중복일 경우 409를 반환한다. ', done => {
      request(server)
        .post('/users')
        .send({ name: 'matt' })
        .expect(409)
        .end(done)
    })
  })
  })

describe('PUT /users/:userId는 ', () => {
  const users = [
    { name: 'hello' },
    { name: 'world' },
    { name: 'greet' },
    { name: 'matt' }
  ]
  before(() => models.sequelize.sync({ force: true }))
  before(() => models.User.bulkCreate(users))

  const userId = 2
  const user = { name: 'changeUser' }

  describe('성공시', () => {
    it('변경된 유저 객체를 반환한다. ', done => {
      request(server)
      .put(`/users/${userId}`)
      .send(user)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('name', user.name)
        done()
      })
    })
  })

  describe('실패시', () => {
    it('id가 숫자형이 아니면 400을 응답한다. ', done => {
      request(server)
        .put('/users/one')
        .expect(400)
        .end(done)
    })

    it('name이 없을 시 400을 반환한다. ', done => {
      request(server)
        .put(`/users/${userId}`)
        .send({ })
        .expect(400)
        .end(done)
    })

    it('name이 중복일 경우 409를 반환한다. ', done => {
      request(server)
        .put(`/users/${userId}`)
        .send({ name: 'matt' })
        .expect(409)
        .end(done)
    })

    it('없는 id일 경우 404를 응답한다. ', done => {
      request(server)
        .put('/users/123456789')
        .send({ name: 'matt' })
        .expect(404)
        .end(done)
    })
  })
})
