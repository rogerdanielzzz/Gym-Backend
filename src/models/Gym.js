const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'gym',
		{			
		
			name:{
				type: DataTypes.STRING,
				allowNull: false,

			},
			rif:{
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			
		
			
		},
		{ timestamps: true, createdAt: 'creado', updatedAt: false }
	);
};
//as