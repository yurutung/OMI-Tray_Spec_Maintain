import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript"
import { ITraySpec } from '../types/tray_spec'


@Table({
	tableName: "CSFRPROD_TRAY_SPEC",
	timestamps: false 
})
class traySpec extends Model<ITraySpec, ITraySpec> implements ITraySpec {

    @Column({
    	field: "CUST_CD",
    	primaryKey: true,
    	type: DataType.STRING(64) 
    })
    @Index({
    	name: "PRIMARY",
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
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    PRODSPEC_ID!: string;

    @Column({
    	field: "CUST_PART_ID",
    	allowNull: true,
    	type: DataType.STRING(64) 
    })
    CUST_PART_ID?: string;

    @Column({
    	field: "DESCRIPTION",
    	allowNull: true,
    	type: DataType.STRING(128) 
    })
    DESCRIPTION?: string;

    @Column({
    	field: "PIN_A1_LOC",
    	allowNull: true,
    	type: DataType.STRING(5) 
    })
    PIN_A1_LOC?: string;

    @Column({
    	field: "PACKING_TYPE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    PACKING_TYPE?: string;

    @Column({
    	field: "MSL",
    	allowNull: true,
    	type: DataType.STRING(5) 
    })
    MSL?: string;

    @Column({
    	field: "TRAY_SIZE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    TRAY_SIZE?: string;

    @Column({
    	field: "CHIP_SIZE",
    	allowNull: true,
    	type: DataType.STRING(20) 
    })
    CHIP_SIZE?: string;

    @Column({
    	field: "BIN_GRADE",
    	allowNull: true,
    	type: DataType.STRING(16) 
    })
    BIN_GRADE?: string;

    @Column({
    	field: "TERM_COMPOST",
    	allowNull: true,
    	type: DataType.STRING(16) 
    })
    TERM_COMPOST?: string;

    @Column({
    	field: "PB_FREE",
    	allowNull: true,
    	type: DataType.STRING(1) 
    })
    PB_FREE?: string;

    @Column({
    	field: "TEMP",
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    TEMP?: number;

    @Column({
    	field: "UPD_FLAG",
    	allowNull: true,
    	type: DataType.STRING(1) 
    })
    UPD_FLAG?: string;

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

    @Column({
    	field: "DATECODE_LIMIT",
    	type: DataType.INTEGER 
    })
    DATECODE_LIMIT!: number;

}

export { traySpec }