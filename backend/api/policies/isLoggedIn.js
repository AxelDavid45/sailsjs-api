'use strict'
const AuthenticationService = require('../services/AuthenticationService')
module.exports = async function (req, res, next) {
  const headers = req.headers.authorization
  if (!headers) {
    return res.badRequest({ error: 'Authorization headers is not defined'})
  }
  const token = req.headers.authorization
  const decodedToken = AuthenticationService.JWTVerifier(token)
  const user = await User.findOne({ id: decodedToken.user})
  if (!user) {
    return next({ error: 'Unauthorized'})
  }
  req.user = user.id
  next()
}
