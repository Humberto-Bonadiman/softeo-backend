import { DataTypes, Model } from 'sequelize';
import database from '../config/database';

class Dentist extends Model {
  declare id: number;

  declare email: string;

  declare name: string;
}

Dentist.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, },
  name: { type: DataTypes.STRING },
}, {
  underscored: true,
  sequelize: database.connection,
  modelName: 'Dentist',
  timestamps: false,
});

export default Dentist;