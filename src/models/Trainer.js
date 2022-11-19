const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'trainer',
		{
			idNumber:{
				type: DataTypes.INTEGER,
				allowNull: false, 
				unique: true,

				  
			},
			idType:{
				type: DataTypes.STRING,
				allowNull: false,

			},
		
			isActive:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			firstName:{
				type: DataTypes.STRING,
				allowNull: false,

			},
			lastName:{
				type: DataTypes.STRING,
				allowNull: false,

			},
			cellphone:{
				type: DataTypes.STRING,

			},
			address:{
				type: DataTypes.TEXT,

			},
			birthDate:{
				type: DataTypes.DATEONLY
			}
		
			
		},
		{ timestamps: true, createdAt: 'creado', updatedAt: false }
	);
};
//as