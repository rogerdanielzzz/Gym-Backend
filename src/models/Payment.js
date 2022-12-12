const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'payment',
		{
         
            name:{
				type: DataTypes.TEXT,
				allowNull: false,

			},
			description:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('description'))
					  return
					return this.getDataValue('description')
				  }
			},
			banco:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('banco'))
					  return
					return this.getDataValue('banco')
				  }
			},
			correo:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('correo'))
					  return
					return this.getDataValue('correo')
				  }
			},
			telefono:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('telefono'))
					  return
					return this.getDataValue('telefono')
				  }
			},
			cedula:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('cedula'))
					  return
					return this.getDataValue('cedula')
				  }
			},		
			cuenta:{
				type: DataTypes.TEXT,
				get() {
					if(!this.getDataValue('cuenta'))
					  return
					return this.getDataValue('cuenta')
				  }
			},
            currency:{
                type: DataTypes.TEXT,
                allowNull:false,
			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as