import {Request, Response, NextFunction} from 'express';
import { TaskModel } from '../model/task';

export async function isExistsTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const task = await TaskModel.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      return res.status(404).json({ Error: 'Tarefa não encontrada' }).send();
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' }).send();
  }
}