const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('diet',{      
        name:{
            type:DataTypes.ENUM('gluten free',
            'dairy free',
            'lacto ovo vegetarian',
            'vegan',            
            'paleolithic',
            'primal',
            'whole 30',
            'pescatarian',
            'ketogenic',
            'fodmap friendly')           
        }
    },
    {
        timestamps:false
    })
}