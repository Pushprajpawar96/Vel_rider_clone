const { CategoryData, TransmissionData, FuelTypeData, ManufacturerData } = require('./Data/CategoryData');
const db = require('./Models/Config/db.config');
const Static_Data = db.static_data;

exports.MakeData = async () => {
    try {
      await Promise.all(
        CategoryData.map(async (role) => {

            const id_on2 = await Static_Data.findOne({ where: { name: role.name } });
            if(id_on2){
                return;
            }else{
                await Static_Data.create({ name: role.name, id: role.id, type: role.type })
            }
        })
      );

      await Promise.all(
        TransmissionData.map(async (role) => {
            const id_on2 = await Static_Data.findOne({ where: { name: role.name } });
            if(id_on2){
                return;
            }else{
                await Static_Data.create({ name: role.name, id: role.id, type: role.type })
            }
        })
      );

      await Promise.all(
        FuelTypeData.map(async (role) => {
            const id_on2 = await Static_Data.findOne({ where: { name: role.name } });
            if(id_on2){
                return;
            }else{
                await Static_Data.create({ name: role.name, id: role.id, type: role.type })
            }
        })
      );

      await Promise.all(
        ManufacturerData.map(async (role) => {
            const id_on2 = await Static_Data.findOne({ where: { name: role.name } });
            if(id_on2){
                return;
            }else{
                await Static_Data.create({ name: role.name, id: role.id, type: role.type })
            }
        })
      );
  
  
  
      console.log('Database seeding completed successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  };