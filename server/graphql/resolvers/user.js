const User = require("../../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError }  = require('apollo-server')

const { SECRET_KEY } = require('../../models')
const { validateRegisterInput, validateLoginInput }= require('../../util/validator')

function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '3h' }
    );
  }

const resolvers = {
    Query: {
        async getUser() {
            try {
                const users = await User.find()
                return users
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async register(_, {registerInput: {username, email, password, confirmPassword}}) {
            //validate user
            // make sure unique

            const {valid, errors} = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
              );
            if(!valid) {
                throw new UserInputError('Errors',{errors})
            }
            const user = User.findOne({username})
            /*
            if (user) {
                throw new UserInputError('Username is taken', {
                  errors: {
                    username: 'This username is taken'
                  }
                });
              }
            */
            // hahs pwd and create auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                password,
                username,
                createdAt: new Date().toString()
            })

            const res = await newUser.save() //save to db

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(_,{username, password}) {
            const {errors, valid} = validateLoginInput(username,password)

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({username})
            if(!user){
                errors.general = "User not found"
                throw new UserInputError('Wrong credentials', {errors})
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match) {
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', {errors})  
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}

module.exports = resolvers