const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull:false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    summary:{
      type:DataTypes.STRING,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'https://us.123rf.com/450wm/yupiramos/yupiramos1903/yupiramos190311866/119117759-ilustraci%C3%B3n-de-vector-de-personaje-de-dibujos-animados-de-comida-de-hamburguesa.jpg?ver=6'
    },
    weightWatcherSmartPoints:{
      type:DataTypes.INTEGER
    },
    healthScore:{
      type:DataTypes.INTEGER
    },
    steps:{
      type:DataTypes.STRING
    },
    createdDB:{
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:true
    }
  },
  {
    timestamps: false
  });
};
