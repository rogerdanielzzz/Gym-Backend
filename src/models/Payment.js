const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'payment',
		{
         
            name:{
				type: DataTypes.TEXT,
				allowNull: false,

			},
            currency:{
                type: DataTypes.TEXT,
                allowNull:false,
			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as