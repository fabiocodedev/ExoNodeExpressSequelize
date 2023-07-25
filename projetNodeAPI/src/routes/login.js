const { User } = require('../database/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require("../auth/privat_key")
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if(!user) {
        const message = "L'utilisateur demandé n'existe pas..."
        return res.status(404).json({ message })
      }
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrecte...`;
          return res.status(401).json({ message })
        }
        else {
           //JWT
        const token = jwt.sign(
           { userId: user.id },
           privateKey,
           { expiresIn: '1h' }
        )
          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token })
          }
      })
    })
    .catch(error => {
      if(error) {
        const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants !`;
        return res.json({message, data: error})
      }
    })
  })
}