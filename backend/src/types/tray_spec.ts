
interface ITraySpec {
    custId: string;
    prodspecId: string;
    custPartId?: string;
    description?: string;
    pinA1Loc?: string;
    packingType?: string;
    msl?: string;
    traySize?: string;
    chipSize?: string;
    binGrade?: string;
    termCompost?: string;
    pbFree?: string;
    temp?: number;
    updFlag?: string;
    cliamUser?: string;
    claimTime?: Date;
    datecodeLimit: number;
}

export { ITraySpec }
