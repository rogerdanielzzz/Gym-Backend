const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'plan',
		{

            planName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			
            durationType: {
				type: DataTypes.STRING,
				allowNull: false,
			},
       
            price:{
				type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,

			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as