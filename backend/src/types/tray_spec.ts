// tray spec model interface
interface ITraySpec {
    CUST_CD: string;
    PRODSPEC_ID: string;
    CUST_PART_ID?: string;
    DESCRIPTION?: string;
    PIN_A1_LOC?: string;
    PACKING_TYPE?: string;
    MSL?: string;
    TRAY_SIZE?: string;
    CHIP_SIZE?: string;
    BIN_GRADE?: string;
    TERM_COMPOST?: string;
    PB_FREE?: string;
    TEMP?: number;
    UPD_FLAG?: string;
    CLAIM_USER?: string;
    CLAIM_TIME?: Date;
    DATECODE_LIMIT: number;
}

export { ITraySpec }
