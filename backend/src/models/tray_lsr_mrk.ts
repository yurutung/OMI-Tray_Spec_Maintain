import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript"
import { ITrayLsrMrk } from '../types/tray_lsr_mrk'

@Table({
	tableName: "CSFRPROD_LSRMRK",
	timestamps: false 
})
class trayLsrMrk extends Model<ITrayLsrMrk, ITrayLsrMrk> implements ITrayLsrMrk {

    @Column({
    	field: "CUST_CD",
    	primaryKey: true,
    	type: DataType.STRING(64) 
    })
    @Index({
    	name: "KEY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    CUST_CD!: string;

    @Column({
    	field: "PRODSPEC_ID",
    	primaryKey: true,
    	type: DataType.STRING(64) 
    })
    @Index({
    	name: "KEY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    PRODSPEC_ID!: string;

    @Column({
    	field: "MARK_LOGO",
    	type: DataType.STRING(64) 
    })
    MARK_LOGO!: string;

    @Column({
    	field: "MARK_TEXT1",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT1?: string;

    @Column({
    	field: "MARK_TEXT2",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT2?: string;

    @Column({
    	field: "MARK_TEXT3",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT3?: string;

    @Column({
    	field: "MARK_TEXT4",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT4?: string;

    @Column({
    	field: "MARK_TEXT5",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT5?: string;

    @Column({
    	field: "MARK_TEXT6",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT6?: string;

    @Column({
    	field: "MARK_TEXT7",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT7?: string;

    @Column({
    	field: "MARK_TEXT8",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT8?: string;

    @Column({
    	field: "MARK_TEXT9",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    MARK_TEXT9?: string;

    @Column({
    	field: "ACTIVE_FLG",
    	type: DataType.STRING(64) 
    })
    ACTIVE_FLG!: string;

    @Column({
    	field: "CLAIM_USER",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    CLAIM_USER?: string;

    @Column({
    	field: "CLAIM_TIME",
    	allowNull: true,
    	type: DataType.DATE 
    })
    CLAIM_TIME?: Date;

}

export { trayLsrMrk }