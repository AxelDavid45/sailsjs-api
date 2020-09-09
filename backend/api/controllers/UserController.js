const joi = require('joi')
const bcrypt = require('bcrypt')
const AuthenticationService = require('../services/AuthenticationService')
const SALT_ROUND = 10
const schema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
})
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const { email, password } = await schema.validateAsync(req.allParams())
      const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
      const user = await User.create({ email, password: hashedPassword }).fetch()
      return res.ok(user)
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({ err }).json()
      }
      return res.serverError({ err }).json()
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const { email, password } = await schema.validateAsync(req.allParams())
      const user = await User.findOne({ email })
      if (user) {
        const passwordValidation = await bcrypt.compare(password, user.password)
        if (passwordValidation) {
          const token = AuthenticationService.JWTIssuer({ user: user.id }, '1 day')
          return res.ok({ token })
        }
      }
      return res.notFound({ error: 'User not found' })
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({ err }).json()
      }
      return res.serverError({ err }).json()
    }
  }

}

