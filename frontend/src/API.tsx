import axios, { AxiosResponse } from 'axios'

const getFunctionList = async (): Promise<Array<Object>> => {
    try {
        // const l = await axios.get(`https://omibe-omi2-bpcf.gw.tack8s.tsmc.com.tw/OMI2.0/rest/InFO/funcTree?_dc=1629958770440&userAccount=YTTUNGD&siteCd=BP01&node=root`)
        const l = [{ "id": "1001000", "text": "DMS Die Map System", "leaf": false, "expanded": true, "children": [{ "id": "1001001", "text": "Die Map Config", "leaf": true, "expanded": true, "url": "https://dmsmodwaf.tsmc.com.tw/dms/mapConfig.html", "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }, { "id": "1001002", "text": "Die Map Generation History", "leaf": true, "expanded": true, "url": "https://dmsmodwaf.tsmc.com.tw/dms/mapGenHist.html", "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }, { "id": "1001003", "text": "DMS Modify Map GUI", "leaf": true, "expanded": true, "url": "https://dmsmodwaf.tsmc.com.tw/dms/mapModification.html", "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }, { "id": "1001004", "text": "DMS Golden Map Config", "leaf": true, "expanded": true, "url": "https://dmsmodwaf.tsmc.com.tw/dms/goldenConfig.html", "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }, { "id": "1001005", "text": "DMS Modify Map History", "leaf": true, "expanded": true, "url": "https://dmsmodwaf.tsmc.com.tw/dms/mapModifyHist.html", "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }], "roles": "MAP_CONFIG_MANAGEMENT,MODIFY_MAP_F2T,GEN_MAP_HIST,MODIFY_MAP_CHIP_CONTAINER,MODIFY_MAP_DS,MODIFY_MAP_MANAGEMENT,MAP_CHAR_TRANSFER_MANAGEMENT,GOLDEN_MAP_CONFIG_MANAGEMENT,MODIFY_MAP_DATT,MODIFY_MAP_HIST" }]
        return l
    } catch (error) {
        console.error(`ERROR: ${error}`)
        throw error
    }
}

export { getFunctionList }