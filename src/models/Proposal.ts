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
    epmCount: number,
    rackHeight: number,
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
    price: Decimal,
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
    price: Decimal
}

interface EquipmentCalculations {
    eqtCalculations1: {
        type: string,
        typesCount: string,
        oneTypePrice: Decimal,
        fullPrice: Decimal
    },
    needPassport1: {
        type: string,
        typesCount: string,
        oneTypePrice: Decimal,
        fullPrice: Decimal
    },
    eqtCalculations2: {
        type: string,
        typesCount: string,
        oneTypePrice: Decimal,
        fullPrice: Decimal
    },
    needPassport2: {
        type: string,
        typesCount: string,
        oneTypePrice: Decimal,
        fullPrice: Decimal
    },
    windOrSnowTests: boolean,
    price: Decimal,
    daysForWork: string
}

export default interface Proposal {
    date: Date,
    general: IGeneralInfo,
    equipmentInfo: equipmentInformation,
    stillagesStaticTests: staticTests
    equipmentCalculations: EquipmentCalculations,
    fullPrice: Decimal,
    paymentType: string
    manager: {
        fullName: string,
        position: string,
        cellPhone: string,
        workPhone: string,
        email: string
    }
}