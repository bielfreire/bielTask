import { Request, Response, Router} from 'express';
import { TaskModel } from '../model/task';
import { v4 as uuidV4 } from 'uuid';
import { checkIfYouCanCreate } from '../middlewares/checkIfYouCanCreate';
import { isExistsTask } from '../middlewares/isExistsTask';

const tasksRoutes = Router()

tasksRoutes.post('/', checkIfYouCanCreate, async (req, res) => {
  try {
    const {title,description,taskDateTime,duration,isComplete} = req.body

    const id = uuidV4();
    const task = await TaskModel.create({
      id,
      title,
      description,
      taskDateTime,
      duration,
      isComplete,
      created_at: new Date()
    })
    return res.status(201).json(task).send()
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error }).send();
  }
})

tasksRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.findAll({
      order: [['taskDateTime', 'DESC']]
    });
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

tasksRoutes.delete('/:id', isExistsTask, async (req, res) => {
  try {
    const { id } = req.params;

    await TaskModel.destroy({
      where: {
        id,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

tasksRoutes.put('/:id', isExistsTask, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, taskDateTime, duration, isComplete } = req.body;

    await TaskModel.update(
      {
        title,
        description,
        taskDateTime,
        duration,
        isComplete,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

tasksRoutes.patch('/:id', isExistsTask, async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    if (isComplete === undefined || isComplete === null) {
      return res.status(400).json({ Error: 'Não foi enviado o estado da tarefa' }).send();
    }

    await TaskModel.update(
      {
        isComplete,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



export {tasksRoutes}