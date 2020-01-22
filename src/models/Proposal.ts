import TempEnum from "./enums/TempEnum";
import NightDayEnum from "./enums/NightDayEnum";
import WeekOrWeekendEnum from "./enums/WeekOrWeekendEnum";
import IsPassportEnum from "./enums/IsPassportEnum";
import EquipmentTypeEnum from "./enums/EquipmentTypeEnum";

interface IGeneralInfo {
    companyName: string,
    customerFullName: string,
    customerPosition: string,
    customerEmail: string,
    customerPhoneNumber: string
}

interface passportInfo {
    passport: IsPassportEnum,
    equipmentManufacturer: string,
    equipmentType: EquipmentTypeEnum,
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
    temp: TempEnum,
    time: {
        nightDay: NightDayEnum,
        weekOrWeekend: WeekOrWeekendEnum,
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

export default interface Proposal {
    date: Date,
    general: IGeneralInfo,
    equipmentInfo: equipmentInformation,

}