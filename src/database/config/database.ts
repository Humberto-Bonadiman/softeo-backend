import 'dotenv/config';
import Sequelize from 'sequelize';

class Database {
  public connection: Sequelize.Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize.Sequelize(process.env.DATABASE_URL as string);
  }
}

const database: Database = new Database();

export default database;
