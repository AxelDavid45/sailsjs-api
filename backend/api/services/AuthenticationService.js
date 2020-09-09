'use strict'
const jwt = require('jsonwebtoken')
const SECRET = '12356789'
const JWTIssuer = (payload, expiresIn) => {
  return jwt.sign(payload, SECRET, {
    expiresIn
  })
}
const JWTVerifier = (token) => {
  return jwt.verify(token, SECRET)
}

module.exports = {
  JWTIssuer, JWTVerifier
}
