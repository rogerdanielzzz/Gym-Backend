const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'paidamount',
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