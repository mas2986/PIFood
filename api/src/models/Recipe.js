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
    title: {
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
      defaultValue:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8SnSB3yeB6CxBsI1aFM9OhK6Q5KqH99A-oVqY4NLOTO5N2v9SGhPcejQiy9bJKdkf24I&usqp=CAU'
    },    
    healthScore:{
      type:DataTypes.INTEGER,
      //defaultValue:40,
      validate:{
        min:0,
        max:100
      }
    },
    steps:{
      type:DataTypes.STRING,
      get(){
        const rawValue = this.getDataValue('steps');
        return rawValue ? [rawValue] : [];
      }
    },
    dishTypes:{
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
