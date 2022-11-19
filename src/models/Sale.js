const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'sale',
		{
            isPaid:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
            description:{
				type: DataTypes.TEXT,
				allowNull: false,

			},
            amountUSD:{
				type: DataTypes.INTEGER,
				defaultValue: 0,

			},
            amountBs:{
				type: DataTypes.INTEGER,
				defaultValue: 0,

			},
            rate:{
				type: DataTypes.INTEGER,
				defaultValue: 0,

			},
		
			
		},
		{ timestamps: true, createdAt: 'Realizado', updatedAt: false }
	);
};
//as