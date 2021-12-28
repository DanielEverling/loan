import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize} from '../../main'

class CustomerSequelize extends Model {}

CustomerSequelize.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.JSON,
  },
  ssNumber: {
    type: DataTypes.STRING
  }
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'customer', // We need to choose the model name
  tableName: 'customers'
});


export { CustomerSequelize }
