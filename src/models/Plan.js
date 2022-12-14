const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'plan',
		{

            planName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			
            durationUnit: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			durationQty:{
				type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,

			},

			price:{
				type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0,

			},

			active:{
				type: DataTypes.BOOLEAN,
				defaultValue: true
			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as