import { Task } from "../model/task";
import {v4 as uuidV4} from 'uuid'

// DTO => Data Transfer Object
interface IDataTaskDTO {
  title: string;
  description: string;
  taskDateTime: string | Date;
  duration: number | string;
  isComplete: boolean;
}

// ESSA É COMO SE FOSSE UMA CLASSE PARA TESTES, SÓ SUBSTITUIR O TASKMODEL POR ESSAs
class TasksRepository {
  private tasks: Task[]

  constructor() {
    this.tasks = [
      {
      id: String(uuidV4()),
      title: "Academia",
      description: "Treinar Braço",
      taskDateTime: "2022-10-25 09:00:30",
      duration: 3,
      isComplete: false,
      created_at: new Date()
    },
    {
      id: String(uuidV4()),
      title: "Estudar Tecnoloigia",
      description: "Trilha Full Stack",
      taskDateTime: "2022-10-18 07:00:00",
      duration: 2,
      isComplete: true,
      created_at: new Date()
    },
    {
      id: String(uuidV4()),
      title: "Estudar testes e Next",
      description: "Módulo 5",
      taskDateTime: "2022-10-23 20:00:05",
      duration: 12,
      isComplete: true,
      created_at: new Date()
    },
  ]
  }

  create({title, description, taskDateTime, duration, isComplete }: IDataTaskDTO): Task[]{
    const task = new Task()

    Object.assign(task, {
      id: String(uuidV4()),
      title,
      description,
      taskDateTime,
      duration,
      isComplete,
      created_at: new Date()
    })

    this.tasks.unshift(task)
    return this.tasks
  }

  getTasks() {
    return this.tasks
  }

  removeTask(id: string) {
    const removedTask = this.tasks.filter(task => task.id !== id)
    this.tasks = removedTask
    return removedTask
  }

  alterTask(id: string, {title, description, taskDateTime, duration, isComplete }: IDataTaskDTO) {
      const newTasks = this.tasks.map((task, index) => {
        if(task.id == id) {
          task.id = id,
          task.title = title,
          task.description = description,
          task.taskDateTime = taskDateTime,
          task.duration = duration,
          task.isComplete = isComplete
          task.created_at
        }
        return task
      })
      this.tasks = newTasks
      return this.tasks
  }

  IsThrutyOrfalsyCompleteTask(id: string, {isComplete }: Pick<IDataTaskDTO, "isComplete" >) {
    const newTasks = this.tasks.map((task) => {
      if(task.id == id) {
        task.id = id,
        task.isComplete = isComplete
      }
      return task
    })
    this.tasks = newTasks
    return this.tasks
}
}

export {TasksRepository}