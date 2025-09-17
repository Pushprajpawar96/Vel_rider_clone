
const Static_Data =(sequelize,Sequelize)=>{

    const static_data = sequelize.define(
        'static_data',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },  
        },
        {
            timestamps: true,
        }
    )
    return static_data;
}

module.exports = {
    Static_Data
}