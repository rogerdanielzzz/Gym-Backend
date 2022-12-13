const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'checkin',
		{
         
       
            acepted:{
				type: DataTypes.BOOLEAN,
                allowNull: false,

			},
            year:{
				type: DataTypes.INTEGER,

			},
			month:{
				type: DataTypes.INTEGER,

			},
			day:{
				type: DataTypes.INTEGER,

			},
			hour:{
				type: DataTypes.STRING,

			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as