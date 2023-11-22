import express from 'express'
const cors = require('cors')
import { tasksRoutes } from './routes/tasks.routes'
import sequelize from './config/sequelize'
const app = express()
app.use(cors())
app.listen(3333)
app.use(express.json())

sequelize.sync().then(() => {
    console.log("Banco de dados SqLite Sincronizado!")
})

app.use("/tasks", tasksRoutes)