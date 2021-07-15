import * as models from '../models'
import { Sequelize } from 'sequelize-typescript'
import * as dotEnv from 'dotenv'

// set mongoDB connect
dotEnv.config()
const user = process.env.MARIADB_USER || 'root'
const password = process.env.MARIADB_PASSWORD || 'password'
const host = process.env.MARIADB_HOST || 'localhost'
const port = process.env.MARIADB_PORT || 3306
const database = process.env.MARIADB_DATABASE || 'TRAY_SPEC'

const establishConnection = async () => {

  const sequelize = new Sequelize(`mariadb://${user}:${password}@${host}:${port}/${database}`)

  sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

  sequelize.addModels(Object.values(models))
    
}

export { establishConnection }
