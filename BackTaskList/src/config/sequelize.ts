// sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db/tasks.db', // Especifique o caminho para o arquivo do banco de dados SQLite
});

export default sequelize;