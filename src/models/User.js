const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'user',
		{
            fullname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
	
			isActive:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			cellphone:{
				type: DataTypes.STRING,
				allowNull: false,
			},
			address:{
				type: DataTypes.TEXT,
				allowNull: false,
			},
			birthDate:{
				type: DataTypes.DATEONLY
			},
			expire:{
				type: DataTypes.DATEONLY,
			}
		
			
		},
		{ timestamps: true, createdAt: 'creado', updatedAt: false }
	);
};
//as