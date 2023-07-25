const { Pokemon } = require('../database/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require("../auth/auth")
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `Le pokemon demandé n/'existe pas, réesayez avec un autre id !`
          return res.status(404).json({message, data: error})
        }
        else {
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`
          res.json({message, data: pokemon })
        }
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({message: error.message, data: error})
      }
      else if(error instanceof UniqueConstraintError) {
        res.status(400).json({message : error.message, data: error})
      }
      else{
        const message = `Le pokemon n/'a pas pu être modifié, réesayez dans quelques instants !`
        res.status(500).json({message, data: error})
      }
    })
  })
}