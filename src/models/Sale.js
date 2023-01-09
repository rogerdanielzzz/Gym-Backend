const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'sale',
		{
            saleDetail:{
				type: DataTypes.TEXT,
				defaultValue: 1,
			},
            description:{
				type: DataTypes.TEXT,
				allowNull: false,

			},
            mustAmount:{
				type: DataTypes.INTEGER,
				defaultValue: 0,

			},
       
            rate:{
				type: DataTypes.FLOAT,
				defaultValue: 0,

			},
			year:{
				type: DataTypes.INTEGER,
				defaultValue: 2022,

			},
			month:{
				type: DataTypes.INTEGER,
				defaultValue: 11,

			},
			day:{
				type: DataTypes.INTEGER,
				defaultValue: 20,

			},
			hour:{
				type: DataTypes.STRING,

			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as