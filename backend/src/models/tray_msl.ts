import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript"
import { ITrayMsl } from '../types/tray_msl'

@Table({
	tableName: "CSFRPROD_TRAY_MSL",
	timestamps: false 
})
class trayMsl extends Model<ITrayMsl, ITrayMsl> implements ITrayMsl {

    @Column({
    	field: "MSL",
    	primaryKey: true,
    	type: DataType.STRING(5) 
    })
    @Index({
    	name: "KEY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    MSL!: string;

    @Column({
    	field: "FLOOR_LIFE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    FLOOR_LIFE?: string;

}

export { trayMsl }