const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'costumer',
		{
			idNumber:{
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			idType:{
				type: DataTypes.STRING,
				allowNull: false,

			},
			typeUse:{
				type: DataTypes.STRING,
				allowNull: false,
			},
		
			hasVerifiedCellphone:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			registerApp:{
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
				allowNull:false
			}
		
			
		},
		{ timestamps: true, createdAt: 'creado', updatedAt: false }
	);
};
//as