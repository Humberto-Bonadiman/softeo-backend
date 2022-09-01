import { DataTypes, Model } from 'sequelize';
import database from '../config/database';
import Dentist from './dentist';

class Client extends Model {
  declare id: number;

  declare name: String;

  declare treatment: String;

  declare date: Date;

  declare value: number;

  declare numberPlots: number;

  declare valuePlots: number;

  declare dentistId: number;
}

Client.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING },
  treatment: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE },
  value: { type: DataTypes.FLOAT, allowNull: false },
  numberPlots: { type: DataTypes.INTEGER },
  valuePlots: { type: DataTypes.FLOAT},
  dentistId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  underscored: true,
  sequelize: database.connection,
  modelName: 'Client',
  timestamps: false,
});

Client.belongsTo(Dentist, { foreignKey: 'dentist_id', as: 'dentistId' });

Dentist.hasMany(Client, { foreignKey: 'dentist_id', as: 'dentistId' });

export default Client;
