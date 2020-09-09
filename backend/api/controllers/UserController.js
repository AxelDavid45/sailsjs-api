const joi = require('joi')
const bcrypt = require('bcrypt')
const SALT_ROUND = 10
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
      const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required(),
      })
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
    return res.json({
      todo: 'login() is not implemented yet!'
    })
  }

}

