import * as models from '../models'
import { Sequelize } from 'sequelize-typescript'
import * as dotEnv from 'dotenv'

// set mariaDB connect
dotEnv.config()
const user = process.env.MARIADB_USER || 'root'
const password = process.env.MARIADB_PASSWORD || 'password'
const host = process.env.MARIADB_HOST || 'localhost'
const port = process.env.MARIADB_PORT || 3306
const database = process.env.MARIADB_DATABASE || 'TRAY_SPEC'

/**
 * connect to database
 */
const establishConnection = async () => {

  const sequelize = new Sequelize(`mariadb://${user}:${password}@${host}:${port}/${database}`)

  await sequelize.authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.')
      await sequelize.addModels(Object.values(models))
    })
    .catch(err => console.error('Unable to connect to the database:', err))

}

export { establishConnection }
