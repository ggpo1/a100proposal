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
        startTime: Date,
        endTime: Date,
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