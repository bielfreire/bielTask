import {v4 as uuidV4} from 'uuid'
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Task {
  id: string = '';
  title: string = '';
  description: string = '';
  taskDateTime: string | Date = '';
  duration: number | string = '';
  isComplete: boolean = false;
  created_at: Date = new Date();

  constructor() {
    if(!this.id) {
      this.id == uuidV4();      
    }
  }
}

class TaskModel extends Model {
  id!: string;
  title!: string;
  description!: string;
  taskDateTime!: string | Date;
  duration!: number | string;
  isComplete!: boolean;
  created_at!: Date;
}

TaskModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);


export {Task, TaskModel}