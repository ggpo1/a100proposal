import TempEnum from "./enums/TempEnum";
import NightDayEnum from "./enums/NightDayEnum";
import WeekOrWeekendEnum from "./enums/WeekOrWeekendEnum";
import IsPassportEnum from "./enums/IsPassportEnum";
import EquipmentTypeEnum from "./enums/EquipmentTypeEnum";
import Decimal from "decimal.js";

interface IGeneralInfo {
    companyName: string,
    customerFullName: string,
    customerPosition: string,
    customerEmail: string,
    customerPhoneNumber: string
}

interface passportInfo {
    passport: string,
    equipmentManufacturer: string,
    equipmentType: string,
    epmCount: string,
    rackHeight: string,
    ratedLoad: {
        forCell: string,
        forPallet: string,
    }
}

interface warehouseInfo {
    address: string,
    name: string,
    storageVolume: string,
    temp: string,
    time: {
        nightDay: string,
        weekOrWeekend: string,
    },
    equipmentProvision: string,
    passports: Array<passportInfo>,
}

interface equipmentInformation {
    warehouseCount: number,
    warehousesInfo: Array<warehouseInfo>,
    pto: string,
    price: string,
    days: string,
}

interface staticTests {
    isTesting: boolean,
    testsCount: number,
    testsType: string,
    controlsProvision: string,
    controlCargoType: string,
    controlCargoDelivery: string,
    staticTestsEquipmentProvision: string,
    price: string
}

interface EquipmentCalculations {
    eqtCalculations1: {
        type: string,
        typesCount: string,
        oneTypePrice: string,
        fullPrice: string
    },
    needPassport1: {
        type: string,
        typesCount: string,
        oneTypePrice: string,
        fullPrice: string
    },
    eqtCalculations2: {
        type: string,
        typesCount: string,
        oneTypePrice: string,
        fullPrice: string
    },
    needPassport2: {
        type: string,
        typesCount: string,
        oneTypePrice: string,
        fullPrice: string
    },
    windOrSnowTests: string,
    price: string,
    daysForWork: string
}

export default interface Proposal {
    date: string,
    general: IGeneralInfo,
    equipmentInfo: equipmentInformation,
    stillagesStaticTests: staticTests
    equipmentCalculations: EquipmentCalculations,
    fullPrice: string | (() => number) | (null),
    paymentType: string,
    paymentDays: string,
    manager: {
        fullName: string,
        position: string,
        cellPhone: string,
        workPhone: string,
        email: string
    }
}
