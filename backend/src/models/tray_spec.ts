import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";
import { ITraySpec } from '../types/tray_spec'


@Table({
	tableName: "CSFRPROD_TRAY_SPEC",
	timestamps: false 
})
class traySpec extends Model<ITraySpec, ITraySpec> implements ITraySpec {

    @Column({
    	field: "CUST_ID",
    	primaryKey: true,
    	type: DataType.STRING(64) 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    custId!: string;

    @Column({
    	field: "PRODSPEC_ID",
    	primaryKey: true,
    	type: DataType.STRING(64) 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    prodspecId!: string;

    @Column({
    	field: "CUST_PART_ID",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    custPartId?: string;

    @Column({
    	field: "DESCRIPTION",
    	allowNull: true,
    	type: DataType.STRING(128) 
    })
    description?: string;

    @Column({
    	field: "PIN_A1_LOC",
    	allowNull: true,
    	type: DataType.STRING(5) 
    })
    pinA1Loc?: string;

    @Column({
    	field: "PACKING_TYPE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    packingType?: string;

    @Column({
    	field: "MSL",
    	allowNull: true,
    	type: DataType.STRING(5) 
    })
    msl?: string;

    @Column({
    	field: "TRAY_SIZE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    traySize?: string;

    @Column({
    	field: "CHIP_SIZE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    chipSize?: string;

    @Column({
    	field: "BIN_GRADE",
    	allowNull: true,
    	type: DataType.STRING(16) 
    })
    binGrade?: string;

    @Column({
    	field: "TERM_COMPOST",
    	allowNull: true,
    	type: DataType.STRING(16) 
    })
    termCompost?: string;

    @Column({
    	field: "PB_FREE",
    	allowNull: true,
    	type: DataType.STRING(1) 
    })
    pbFree?: string;

    @Column({
    	field: "TEMP",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    temp?: number;

    @Column({
    	field: "UPD_FLAG",
    	allowNull: true,
    	type: DataType.STRING(1) 
    })
    updFlag?: string;

    @Column({
    	field: "CLIAM_USER",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    cliamUser?: string;

    @Column({
    	field: "CLAIM_TIME",
    	allowNull: true,
    	type: DataType.DATE 
    })
    claimTime?: Date;

    @Column({
    	field: "DATECODE_LIMIT",
    	type: DataType.INTEGER 
    })
    datecodeLimit!: number;

}

export { traySpec }