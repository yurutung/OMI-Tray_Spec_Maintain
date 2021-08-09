
interface ITrayMsl {
    id?: string,
    MSL: string;
    FLOOR_LIFE?: string;
}

interface ITraySpec {
    id?: string,
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

interface ITrayLsrMrk {
    CUST_CD: string;
    PRODSPEC_ID: string;
    MARK_LOGO: string;
    MARK_TEXT1?: string;
    MARK_TEXT2?: string;
    MARK_TEXT3?: string;
    MARK_TEXT4?: string;
    MARK_TEXT5?: string;
    MARK_TEXT6?: string;
    MARK_TEXT7?: string;
    MARK_TEXT8?: string;
    MARK_TEXT9?: string;
    // ACTIVE_FLG: string;
    CLAIM_USER?: string;
    CLAIM_TIME?: Date;
}