//IMPORTS
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/database/sequelize')


//DECLARATIONS
const app = express()
const port = 3000 



//MIDDLEWARE 
app.use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json())
  
//GESTION DES ERREURS 404

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée... Essayer un autre URL !'
    res.status(404).json({message})
})


//ROUTES AUSSI APPELER ENDPOINT OU POINT DE TERMINAISON

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPK')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// app.get('/', (req,res)=> res.send("Hello Node !"))

// app.get('/api/pokemons/:id', (req,res)=> {
    //     const id = parseInt(req.params.id)
//     const pokemon = pokemons.find(pokemon => pokemon.id === id)
//     // res.send(`Vous avez demander le pokemon ${pokemon.name}`)
//     const message = "un pokémon a bien été trouvé."
//     //res.json(pokemon)
//     res.json(success(message, pokemon))
// })

// app.get('/api/pokemons', (req,res) => {
    //     // const pokemonNb = pokemons.length
    //     // res.send(`Il y a ${pokemonNb} pokemons dans le pokédex pour le moment !`)
    //     const message = 'la liste des pokémons a bien été récuperée.'
    //     res.json(success(message, pokemons))
    // })
    

    // app.post('/api/pokemons', (req, res) => {
        //     const id = getUniqueId(pokemons)
        //     const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
        //     pokemons.push(pokemonCreated)
        //     const message = `Le pokemon ${pokemonCreated.name} a bien été crée !`
        //     res.json(success(message, pokemonCreated))
        // })

// app.put('/api/pokemons/:id', (req, res) => {
    //     const id = parseInt(req.params.id)
    //     const pokemonUpdated = {  ...req.body, id: id }
    //     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === id ? pokemonUpdated : pokemon
//     })
//     const message = `Le pokémon ${pokemonUpdated.name} a bien été updaté !`
//     res.json(success(message, pokemonUpdated))
// })

// app.delete('/api/pokemons/:id', (req, res) => {
    //     const id = parseInt(req.params.id)
    //     const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
//     pokemons = pokemons.filter(pokemon => pokemon.id !== id)
//     const message = `Le pokemon ${pokemonDeleted.name} a bien été deleté !`
//     res.json(success(message, pokemonDeleted))
// })



//BDD SEQUELIZE
sequelize.initDb()

// const sequelize = new Sequelize(
//     //nom DB
//     'pokedex',
//     //id DB
//     'root', 
//     // mdp
//     '',
//     //config
//     {
//         host: 'localhost',
//         dialect: 'mariadb',
//         dialectOptions: {
//             timezone: 'Etc/GMT-2',
//         },
//         logging: false
//     }
// )

// sequelize.authenticate()
//     .then(_ => console.log('La connection à la base de données a bien été établie !'))
//     .catch(error => console.log(`Impossible de se connecter à la base de données... ${error}`))
  
// const Pokemon = PokemonModel(sequelize, DataTypes)

// sequelize.sync({force: true})
//     .then(_ => {

//         console.log("La base de donnée 'Pokedex' a bien été synchronisée !")

//         pokemons.map(pokemon => {
//             Pokemon.create({
//                 name: pokemon.name,
//                 hp: pokemon.hp,
//                 cp: pokemon.cp,
//                 picture: pokemon.picture,
//                 types: pokemon.types.join()
//               }).then(pokemon => console.log(pokemon.toJSON()))
//         })
//     })
app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))