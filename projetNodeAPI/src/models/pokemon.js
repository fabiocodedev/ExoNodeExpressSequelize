const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est deja pris !"
        },
        validate: {
          notEmpty: { msg: "Cette propriété ne peut pas être vide."},
          notNull: { msg: "Le nom une propriété requise."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utiliser uniquement des nombres entiers pour les points de vie."},
          notNull: { msg: "Les points de vies sont une propriété requise."},
          min: {
            args: [5] , 
            msg:"Les HP doivent être supérieur ou égale à 5."
          },
          max: {
            args: [999], 
            msg:"Les HP doivent être inférieur à 1000." 
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utiliser uniquement des nombres entiers pour les points de capacitée."},
          notNull: { msg: "Les points de capacitée sont une propriété requise."},
          min: {
            args: [1] , 
            msg:"Les CP doivent être supérieur ou égale à 1."
          },
          max: {
            args: [99], 
            msg:"Les CP doivent être inférieur à 1000." 
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisé un URL valide."},
          notNull: { msg: "L'URL est une une propriété requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        //GETTEUR
        get() {
            return this.getDataValue('types').split(',')
        },
        //SETTEUR
        set(types) {
            this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokemon doit au moins avoir 1 type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokemon ne peut pas avoir plus de 3 type.')
            }
            value.split(",").forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d\'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }