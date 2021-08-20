import { Sequelize } from 'sequelize-typescript'
import * as models from '../models'
import * as dotEnv from 'dotenv'

// set mariaDB connect
dotEnv.config()
const user = process.env.MARIADB_USER || 'root'
const password = process.env.MARIADB_PASSWORD || 'password'
const host = process.env.MARIADB_HOST || 'localhost'
const port = process.env.MARIADB_PORT || 3306
const database = process.env.MARIADB_DATABASE || 'TRAY_MAINTAIN'

class DBConnection {
  private static sequelize: Sequelize

  // connection to database
  public static async establishConnection() {
    this.sequelize = new Sequelize(`mariadb://${user}:${password}@${host}:${port}/${database}`)
    // add models
    await this.sequelize.addModels(Object.values(models))
    // if table does not exist, then create table
    await this.sequelize.sync()
    // check connection
    await this.sequelize.authenticate()
      .then(async () => console.log('Connection has been established successfully.'))
      .catch(err => console.error('Unable to connect to the database:', err))
  }

  // if want to add transaction, get sequelize .transaction()
  public static getSequelize() {
    return this.sequelize
  }
}

export { DBConnection }
