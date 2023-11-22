import {Request, Response, NextFunction} from 'express';
import { TaskModel } from '../model/task';

export async function checkIfYouCanCreate(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, taskDateTime, duration, isComplete } = req.body;

    const existingTask = await TaskModel.findOne({
      where: {
        title,
      },
    });

    if (existingTask) {
      return res.status(400).json({ Error: 'Tarefa já existente' }).send();
    }

    if (!title.trim() || !description.trim() || !taskDateTime.trim() || !duration.toString()) {
      return res.status(400).json({ Error: 'Preencha todos os campos corretamente!' }).send();
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' }).send();
  }
}
