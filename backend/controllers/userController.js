const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModels')
const Session = require('../models/sessionModel')

const signUp = async(req, res) =>{
  try{
    const user = new User({
      password: req.body.password,
      email: req.body.email,
      userName: req.body.username
    })
    let savedUser = await user.save();

    res.send(savedUser)

  } catch (e){
    res.status(400).send(e)
  }
}

const signIn = async (req, res) =>{
  try{
    let user = await User.findOne({email: req.body.email})
    if (!user) throw {message: "Wrong email"}

    let passwordMatch  = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordMatch) throw {message: "Wrong password"}

    let token = jwt.sign({
      id: user._id,
    }, process.env.JWT_PASSWORD)

    let session = new Session({
      sessionToken: token,
      expires: new Date().setMonth(new Date().getMonth() + 1)
    })

    await session.save();

    res.header('imageauth', token).send(user)

  }catch (e){
    res.status(400).send(e)
  }
}

const currentUser = (req, res) =>{
  res.send(req.user)
}

const logOut = async (req, res) => {
  try {
    let token = req.sessionToken
    await token.remove()
    res.send({
      message: 'Success'
    })
  } catch (e) {
    res.status(400).send({
      message: 'Something went wrong'
    })
  }
}

module.exports = {
  signUp,
  signIn,
  currentUser,
  logOut,
}
