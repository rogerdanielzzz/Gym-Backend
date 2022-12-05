const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Paidamount',
		{
         
       
            amount:{
				type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,

			},

		
			
		},
		{ timestamps: false, createdAt: 'Realizado', updatedAt: false }
	);
};
//as