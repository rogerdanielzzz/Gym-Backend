const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'costumer',
		{
			idNumber:{
				type: DataTypes.INTEGER,
				allowNull: false,
				unique:true
			},
			idType:{
				type: DataTypes.STRING,
				allowNull: false,

			},
			isActive:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			fullname: {
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
			},
			expire:{
				type: DataTypes.DATEONLY,
				allowNull:false
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
			},

			show:{
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		
		
			
		},
		{ timestamps: true, createdAt: 'creado', updatedAt: false }
	);
};
//as