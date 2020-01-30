import React, {Component, isValidElement} from 'react';
import IProposalViewProps from "../../../models/components/ProposalView/IProposalViewProps";
import IProposalViewState from "../../../models/components/ProposalView/IProposalViewState";
import './ProposalView.css';
import './ToggleButton.css';
import IsPassportEnum from "../../../models/enums/IsPassportEnum";
import Decimal from 'decimal.js';
import DataLists from "../../../data/static/DataLists";
import ProposalViewSource from "../../../data/static/ProposalViewSource";
import {AnyAaaaRecord} from "dns";
// import html2pdf from 'html2pdf.js'

export default class ProposalView extends Component<IProposalViewProps, IProposalViewState> {
    public worker: any;
    constructor(props: IProposalViewProps) {
        super(props);
        this.state = {
            loader: false,
            proposalTemplateVisibility: false,
            selectedWarehouse: 0,
            source: ProposalViewSource.source
        };
        this.worker = require('html2pdf.js');

        this.state.source.date = this.getCurrentDate;
    }

    public get getCurrentDate(): string {
        let date = new Date();
        return date.getDate() + '.' + date.getMonth()+1 + '.' + date.getFullYear();
    }

    public get getFullPrice(): number | string {
        const {source} = this.state;
        let price: number = 0;
        if (source.equipmentInfo.price.length !== 0) price += parseInt(source.equipmentInfo.price);
        if (source.stillagesStaticTests.price.length !== 0) price += parseInt(source.stillagesStaticTests.price);
        if (source.equipmentCalculations.eqtCalculations1.typesCount.length !== 0 && source.equipmentCalculations.eqtCalculations1.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.eqtCalculations1.typesCount) * parseInt(source.equipmentCalculations.eqtCalculations1.oneTypePrice));
        if (source.equipmentCalculations.needPassport1.typesCount.length !== 0 && source.equipmentCalculations.needPassport1.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.needPassport1.typesCount) * parseInt(source.equipmentCalculations.needPassport1.oneTypePrice));
        if (source.equipmentCalculations.eqtCalculations2.typesCount.length !== 0 && source.equipmentCalculations.eqtCalculations2.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.eqtCalculations2.typesCount) * parseInt(source.equipmentCalculations.eqtCalculations2.oneTypePrice));
        if (source.equipmentCalculations.needPassport2.typesCount.length !== 0 && source.equipmentCalculations.needPassport2.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.needPassport2.typesCount) * parseInt(source.equipmentCalculations.needPassport2.oneTypePrice));

        return price;
    }

    public get getEqCalcPrice(): number | string {
        const { source } = this.state;
        let price: number = 0;
        if (source.equipmentCalculations.eqtCalculations1.typesCount.length !== 0 && source.equipmentCalculations.eqtCalculations1.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.eqtCalculations1.typesCount) * parseInt(source.equipmentCalculations.eqtCalculations1.oneTypePrice));
        if (source.equipmentCalculations.needPassport1.typesCount.length !== 0 && source.equipmentCalculations.needPassport1.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.needPassport1.typesCount) * parseInt(source.equipmentCalculations.needPassport1.oneTypePrice));
        if (source.equipmentCalculations.eqtCalculations2.typesCount.length !== 0 && source.equipmentCalculations.eqtCalculations2.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.eqtCalculations2.typesCount) * parseInt(source.equipmentCalculations.eqtCalculations2.oneTypePrice));
        if (source.equipmentCalculations.needPassport2.typesCount.length !== 0 && source.equipmentCalculations.needPassport2.oneTypePrice.length !== 0) price += (parseInt(source.equipmentCalculations.needPassport2.typesCount) * parseInt(source.equipmentCalculations.needPassport2.oneTypePrice));
        return price;
    }

    updateValue = (fieldName: string, value: string) => {
        const { source } = this.state;
        switch (fieldName) {
            case 'companyName':
                source.general.companyName = value;
                break;
            case 'customerFullName':
                source.general.customerFullName = value;
                break;
            case 'customerPosition':
                source.general.customerPosition = value;
                break;
            case 'customerEmail':
                source.general.customerEmail = value;
                break;
            case 'customerPhone':
                source.general.customerPhoneNumber = value;
                break;
            case 'pto':
                source.equipmentInfo.pto = value;
                break;
            case 'eqInfoPrice':
                source.equipmentInfo.price = value;
                break;
            case 'eqInfoDays':
                source.equipmentInfo.days = value;
                break;
            case 'testsType':
                source.stillagesStaticTests.testsType = value;
                break;
            case 'cargoProvision':
                source.stillagesStaticTests.controlsProvision = value;
                break;
            case 'controlCargoType':
                source.stillagesStaticTests.controlCargoType = value;
                break;
            case 'controlCargoDelivery':
                source.stillagesStaticTests.controlCargoDelivery = value;
                break;
            case 'staticTestsEquipmentProvision':
                source.stillagesStaticTests.staticTestsEquipmentProvision = value;
                break;
            case 'staticTestsPrice':
                source.stillagesStaticTests.price = value;
                break;
            case 'eqtCalculations1Type':
                source.equipmentCalculations.eqtCalculations1.type = value;
                break;
            case 'eqtCalculations2Type':
                source.equipmentCalculations.eqtCalculations2.type = value;
                break;
            case 'eqtCalculations1TypesCount':
                source.equipmentCalculations.eqtCalculations1.typesCount = value;
                break;
            case 'eqtCalculations1OneTypePrice':
                source.equipmentCalculations.eqtCalculations1.oneTypePrice = value;
                break;
            case 'eqtCalculations1FullPrice':
                source.equipmentCalculations.eqtCalculations1.fullPrice = value;
                break;
            case 'needPassport1Type':
                source.equipmentCalculations.needPassport1.type = value;
                break;
            case 'needPassport1TypesCount':
                source.equipmentCalculations.needPassport1.typesCount = value;
                break;
            case 'needPassport1FullPrice':
                source.equipmentCalculations.needPassport1.fullPrice = value;
                break;
            case 'needPassport1OneTypePrice':
                source.equipmentCalculations.needPassport1.oneTypePrice = value;
                break;
            case 'eqtCalculations2TypesCount':
                source.equipmentCalculations.eqtCalculations2.typesCount = value;
                break;
            case 'eqtCalculations2OneTypePrice':
                source.equipmentCalculations.eqtCalculations2.oneTypePrice = value;
                break;
            case 'eqtCalculations2FullPrice':
                source.equipmentCalculations.eqtCalculations2.fullPrice = value;
                break;
            case 'needPassport2Type':
                source.equipmentCalculations.needPassport2.type = value;
                break;
            case 'needPassport2TypesCount':
                source.equipmentCalculations.needPassport2.typesCount = value;
                break;
            case 'needPassport2OneTypePrice':
                source.equipmentCalculations.needPassport2.oneTypePrice = value;
                break;
            case 'needPassport2FullPrice':
                source.equipmentCalculations.needPassport2.fullPrice = value;
                break;
            case 'windOrSnowTests':
                source.equipmentCalculations.windOrSnowTests = value;
                break;
            case 'testsPrice':
                source.equipmentCalculations.price = value;
                break;
            case 'daysForWork':
                source.equipmentCalculations.daysForWork = value;
                break;
            case 'proposalFullPrice':
                source.fullPrice = value;
                break;
            case 'proposalPaymentType':
                source.paymentType = value;
                break;
            case 'managerFullName':
                source.manager.fullName = value;
                break;
            case 'managerPosition':
                source.manager.position = value;
                break;
            case 'managerCellPhone':
                source.manager.cellPhone = value;
                break;
            case 'managerWorkPhone':
                source.manager.workPhone = value;
                break;
            case 'managerEmail':
                source.manager.email = value;
                break;
            case 'paymentDays':
                source.paymentDays = value;
                break;

            case 'isStaticTests':
                source.stillagesStaticTests.isTesting = !source.stillagesStaticTests.isTesting;
                break;
        }
        this.setState({source});
    };

    addWarehouseAction = () => {
        const { source } = this.state;
        if (this.state.source.equipmentInfo.warehouseCount < 5) {
            source.equipmentInfo.warehouseCount++;
            source.equipmentInfo.warehousesInfo.push({
                address: '',
                name: '',
                storageVolume: '',
                temp: '',
                time: {
                    nightDay: '',
                    weekOrWeekend: '',
                },
                equipmentProvision: '',
                passports: [],
            });
            this.setState({source});
        }
    };

    deleteWarehouse = (index: number) => {
        const { source } = this.state;
        source.equipmentInfo.warehousesInfo = source.equipmentInfo.warehousesInfo.splice(index, 1);
        this.setState({source});
    };

    updateWarehouseValues = (fieldName: string, index: number, value: string) => {
        const { source } = this.state;
        switch (fieldName) {
            case 'address': {
                source.equipmentInfo.warehousesInfo[index].address = value;
                break;
            }
            case 'name': {
                source.equipmentInfo.warehousesInfo[index].name = value;
                break;
            }
            case 'storageVolume': {
                source.equipmentInfo.warehousesInfo[index].storageVolume = value;
                break;
            }
            case 'temp': {
                source.equipmentInfo.warehousesInfo[index].temp = value;
                break;
            }
            case 'nightDay': {
                source.equipmentInfo.warehousesInfo[index].time.nightDay = value;
                break;
            }
            case 'weekOrWeekend': {
                source.equipmentInfo.warehousesInfo[index].time.weekOrWeekend = value;
                break;
            }
            case 'equipmentProvision': {
                source.equipmentInfo.warehousesInfo[index].equipmentProvision = value;
                break;
            }
        }
        this.setState({ source });
    };

    updateWarehousePassports = (fieldName: string, wIndex: number, pIndex: number, value: string) => {
        const { source, selectedWarehouse } = this.state;
        switch (fieldName) {
            case 'passport': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].passport = value;
                break;
            }
            case 'eqManufacturer': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].equipmentManufacturer = value;
                break;
            }
            case 'eqType': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].equipmentType = value;
                break;
            }
            case 'epmCount': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].epmCount = value;
                break;
            }
            case 'rackHeight': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].rackHeight = value;
                break;
            }
            case 'forCell': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].ratedLoad.forCell = value;
                break;
            }
            case 'forPallet': {
                source.equipmentInfo.warehousesInfo[wIndex].passports[pIndex].ratedLoad.forPallet = value;
                break;
            }
        }

        this.setState({source});
    };

    generateAction = () => {
        const { source } = this.state;
        let element = document.getElementById('pdf-wrapper');
        this.setState({proposalTemplateVisibility: true, loader: true});

        let opt = {
            margin:       0,
            filename:     new Date() + '.pdf',
            image:        { type: 'jpeg', quality: 1 },
            // jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        let that = this;

        // setTimeout(() => {
        this.worker().from(element).set(opt).save();

        // }, 3000);
        setTimeout(() => {
            that.setState({proposalTemplateVisibility: false});
        }, 100);

        setTimeout(() => {
            that.setState({loader: false});
        }, 2000);

    };

    render() {
        const { source } = this.state;
        let warehouses: Array<JSX.Element> = [];
        let staticTests;
        let warehousesTableRows: Array<JSX.Element> = [];
        let staticTestsTableRows: Array<JSX.Element> = [];

        let warehouseTemps: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let nightDayOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let weekOrWeekendOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let equipmentProvisionOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let isPassportOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let equipmentManufacturerOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let equipmentTypeOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let rackHeightOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let ptoOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let testsTypeOptions: Array<JSX.Element> = [<option value="null"> не выбрано</option>];
        let staticTestsEquipmentProvisionOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let controlCargoTypeOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let controlCargoDeliveryOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let eqCalculationsTypeOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let yesOrNoOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];
        let paymentTypeOptions: Array<JSX.Element> = [<option value="null">не выбрано</option>];

        DataLists.TempValuesList.forEach((el) => warehouseTemps.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.NightDayValuesList.forEach((el) => nightDayOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.WeekOrWeekendValuesList.forEach((el) => weekOrWeekendOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.EquipmentProvisionValuesList.forEach((el) => equipmentProvisionOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.IsPassportValuesList.forEach((el) => isPassportOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.EquipmentManufacturerValuesList.forEach((el) => equipmentManufacturerOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.EquipmentTypeValuesList.forEach((el) => equipmentTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.RackHeightValuesList.forEach((el) => rackHeightOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.ptoValuesList.forEach((el) => ptoOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.testsTypeValuesList.forEach((el) => testsTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.staticTestsEquipmentProvisionValuesList.forEach((el) => staticTestsEquipmentProvisionOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.controlCargoTypeValuesList.forEach((el) => controlCargoTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.controlCargoDeliveryValuesList.forEach((el) => controlCargoDeliveryOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.eqCalculationsTypeValuesList.forEach((el) => eqCalculationsTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.YesOrNoValuesList.forEach((el) => yesOrNoOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.paymentTypeValuesList.forEach((el) => paymentTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));


        for (let i = 1; i <= source.equipmentInfo.warehouseCount; i++) {
            // warehousesTableRows.splice(0, warehousesTableRows.length);
            warehousesTableRows = [];
            for (let j = 0; j < 10; j++) {
                warehousesTableRows.push(
                    <div key={'table_rows_' + i + '_' + j}>
                        <div style={{width: '82%'}}>
                            <select onChange={(e) => this.updateWarehousePassports('passport', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].passport}>
                                {isPassportOptions}
                            </select>
                        </div>
                        <div style={{width: '93%'}}>
                            <select onChange={(e) => this.updateWarehousePassports('eqManufacturer', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].equipmentManufacturer}>
                                {equipmentManufacturerOptions}
                            </select>
                        </div>
                        <div style={{width: '140%'}}>
                            <select onChange={(e) => this.updateWarehousePassports('eqType', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].equipmentType}>
                                {equipmentTypeOptions}
                            </select>
                        </div>
                        <div style={{width: '92%'}}>
                            <input onChange={(e) => this.updateWarehousePassports('epmCount', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].epmCount} type="text"/>
                        </div>
                        <div style={{width: '95%'}}>
                            <select onChange={(e) => this.updateWarehousePassports('rackHeight', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].rackHeight}>
                                {rackHeightOptions}
                            </select>
                        </div>
                        <div style={{width: '116.5%'}}>
                            <input onChange={(e) => this.updateWarehousePassports('forCell', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].ratedLoad.forCell} type="text"/>
                        </div>
                        <div style={{width: '117%'}}>
                            <input  onChange={(e) => this.updateWarehousePassports('forPallet', i-1, j, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].passports[j].ratedLoad.forPallet} type="text"/>
                        </div>
                    </div>
                );
            }

            warehouses.push(
                <div key={'object_fields_' + i} className={'kp-warehouse'}>
                    <div className={'object-title'}>
                        <h4>Объект <span>{i} </span><span onClick={() => this.deleteWarehouse(i-1)} style={{color: 'red', textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'}}>(удалить)</span></h4>
                    </div>
                    <div>
                        <h4>Адрес места проведения работ: </h4>
                        <input onChange={(e) => this.updateWarehouseValues('address', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].address} type="text"/>
                    </div>
                    <div>
                        <h4>Наименование объекта: </h4>
                        <input onChange={(e) => this.updateWarehouseValues('name', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].name} type="text"/>
                    </div>
                    <div>
                        <h4>Суммарный объем хранения: </h4>
                        <input onChange={(e) => this.updateWarehouseValues('storageVolume', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].storageVolume} type="text"/>
                    </div>
                    <div>
                        <h4>Температруный режим: </h4>
                        <select onChange={(e) => this.updateWarehouseValues('temp', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].temp}>
                            {warehouseTemps}
                        </select>
                    </div>
                    <div>
                        <h4>Время проведения работ: </h4>
                        <div style={{width: '100%'}}>
                            <select onChange={(e) => this.updateWarehouseValues('nightDay', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].time.nightDay}>
                                {nightDayOptions}
                            </select>
                            <select onChange={(e) => this.updateWarehouseValues('weekOrWeekend', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].time.weekOrWeekend}>
                                {weekOrWeekendOptions}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4>Предоставление техники: </h4>
                        <select onChange={(e) => this.updateWarehouseValues('equipmentProvision', i-1, e.target.value)} value={source.equipmentInfo.warehousesInfo[i-1].equipmentProvision}>
                            {equipmentProvisionOptions}
                        </select>
                    </div>
                </div>,
                <div key={'object_table_' + i} style={{border: '1px solid #c4c4c4', width: '100%'}} className={'kp-statictests'}>
                    <div className={'table-header'}>
                        <div style={{width: '35%'}}><p>Паспорт</p></div>
                        <div style={{width: '40%'}}><p>Производитель оборудования</p></div>
                        <div style={{width: '60%'}}><p>Тип оборудования в соответствии с паспортом</p></div>
                        <div style={{width: '40%'}}><p>Кол-во ЕПМ, шт</p></div>
                        <div style={{width: '40%'}}><p>Высота стойки</p></div>
                        <div>
                            <div><p>Номинальная нагрузка в соответствии с паспортом, кг</p></div>
                            <div>
                                <p>на 1 ячейку</p>
                                <p>на 1 п/место</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => { this.setState({selectedWarehouse: i-1}) }} className={'table-rows'}>
                        {warehousesTableRows}
                    </div>
                </div>
            );
        }

        if (source.stillagesStaticTests.isTesting) {
            let k = 0;
            for (let i = 0; i < source.equipmentInfo.warehousesInfo.length; i++) {
                for (let j = 0; j < source.equipmentInfo.warehousesInfo[i].passports.length; j++) {
                    if (source.equipmentInfo.warehousesInfo[i].passports[j].passport !== '') {
                        staticTestsTableRows.push(
                            <div key={'static_table_row_' + i + '_' + j}>
                                <div style={{width: '50%'}}>
                                    <input readOnly={true} type={'text'} value={k + 1}/>
                                </div>
                                <div style={{width: '58%'}}>
                                    <input type={'text'} readOnly={true} value={source.equipmentInfo.warehousesInfo[i].passports[j].passport} />
                                </div>
                                <div style={{width: '67.5%'}}>
                                    <input type={'text'} readOnly={true} value={source.equipmentInfo.warehousesInfo[i].passports[j].equipmentManufacturer} />
                                </div>
                                <div style={{width: '100.5%'}}>
                                    <input type={'text'} readOnly={true} value={source.equipmentInfo.warehousesInfo[i].passports[j].equipmentType} />
                                </div>
                                <div style={{width: '84%'}}>
                                    <input type="text" readOnly={true} value={source.equipmentInfo.warehousesInfo[i].passports[j].ratedLoad.forCell} />
                                </div>
                                <div style={{width: '84%'}}>
                                    <input type="text" readOnly={true} value={source.equipmentInfo.warehousesInfo[i].passports[j].ratedLoad.forPallet} />
                                </div>
                            </div>
                        );
                        k++;
                    }
                }
            }
            let testsCount = k;
            staticTests = [
                <div key={'staticTests_table'} style={{border: '1px solid #c4c4c4'}} className={'kp-statictests'}>
                    <div className={'table-header'}>
                        <div><p>№<br/>п/п</p></div>
                        <div style={{width: '35%'}}><p>Паспорт</p></div>
                        <div style={{width: '40%'}}><p>Производитель оборудования</p></div>
                        <div style={{width: '60%'}}><p>Тип оборудования в соответствии с паспортом</p></div>
                        <div>
                            <div><p>Номинальная нагрузка в соответствии с паспортом, кг</p></div>
                            <div>
                                <p>на 1 ячейку</p>
                                <p>на 1 п/место</p>
                            </div>
                        </div>
                    </div>
                    <div className={'table-rows'} style={{ overflowY: 'auto' }}>
                        {staticTestsTableRows}
                    </div>
                </div>,
                <div key={'staticTests_additional_fields'} className={'kp-generalinfo'}>
                    <div>
                        <h4>Всего испытаний: </h4>
                        <input readOnly={true} value={testsCount} type="text"/>
                    </div>
                    <div>
                        <h4>Испытания проводятся с применением: </h4>
                        <select onChange={(e) => this.updateValue('testsType', e.target.value)} value={source.stillagesStaticTests.testsType}>
                            {testsTypeOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Контрольные грузы/весы предоставляет: </h4>
                        <select onChange={(e) => this.updateValue('cargoProvision', e.target.value)} value={source.stillagesStaticTests.controlsProvision}>
                            {staticTestsEquipmentProvisionOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Тип контрольных грузов: </h4>
                        <select onChange={(e) => this.updateValue('controlCargoType', e.target.value)} value={source.stillagesStaticTests.controlCargoType}>
                            {controlCargoTypeOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Доставку контрольных грузов/весов осуществляет: </h4>
                        <select onChange={(e) => this.updateValue('controlCargoDelivery', e.target.value)} value={source.stillagesStaticTests.controlCargoDelivery}>
                            {controlCargoDeliveryOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Технику для проведения статических испытаний предоставляет: </h4>
                        <select onChange={(e) => this.updateValue('staticTestsEquipmentProvision', e.target.value)} value={source.stillagesStaticTests.staticTestsEquipmentProvision}>
                            {controlCargoDeliveryOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Стоимость, руб. с НДС: </h4>
                        <input onChange={(e) => this.updateValue('staticTestsPrice', e.target.value)} value={source.stillagesStaticTests.price} type="text"/>
                    </div>
                </div>
            ];
        }


        let pdfEquipmentInfoTable: Array<JSX.Element> = [];
        for (let i = 0; i < source.equipmentInfo.warehousesInfo.length; i++) {
            const el = source.equipmentInfo.warehousesInfo[i];
            let warPassports: Array<JSX.Element> = [];
            el.passports.forEach((passport, i) => {
                if (!(passport.passport.length === 0 || passport.passport === 'null')) {
                    warPassports.push(
                        <tr>
                            <td>{i + 1}</td>
                            <td>{passport.passport}</td>
                            <td>{passport.equipmentManufacturer}</td>
                            <td>{passport.equipmentType}</td>
                            <td>{passport.epmCount}</td>
                            <td>{passport.rackHeight}</td>
                            <td style={{display: 'flex'}}>
                                <td style={{
                                    display: 'block',
                                    width: '50%',
                                    border: 'none',
                                    clear: 'both'
                                }}>{passport.ratedLoad.forCell}
                                </td>
                                <td style={{
                                    display: 'block',
                                    width: '50%',
                                    border: 'none',
                                    clear: 'both'
                                }}>{passport.ratedLoad.forPallet}</td>
                            </td>
                        </tr>
                    );
                }
            });

            if (el.address.length !== 0 && el.name) {
                pdfEquipmentInfoTable.push(
                    <div className={'pdf-header'} style={{marginTop: '15px'}}>
                        <img src={'assets/page_header.jpg'} alt=""/>
                    </div>
                );
                pdfEquipmentInfoTable.push(<h5 className={'warehouse-info-title'} style={{marginTop: '10px', marginLeft: '10%'}}><span style={{marginLeft: '30px'}}>Информация</span> об оборудовании Заказчика (Объект №{i+1}):</h5>);
                pdfEquipmentInfoTable.push(
                    <div className="warehouses-info">
                        <table className={'customer-info-table warehouse-info-table'}>
                            <tr>
                                <td className={'par-span-bold'}>Адрес места проведения работ:</td>
                                <td>{el.address}</td>
                                {/*<td hidden={true}></td><td hidden={true}></td>*/}
                            </tr>
                            <tr>
                                <td className={'par-span-bold'}>Наименование объекта:</td>
                                <td>{el.name}</td>
                                {/*<td hidden={true}></td><td hidden={true}></td>*/}
                            </tr>
                            <tr>
                                <td className={'par-span-bold'}>Суммарный объем хранения:</td>
                                <td>{el.storageVolume}</td>
                                {/*<td hidden={true}></td><td hidden={true}></td>*/}
                            </tr>
                            <tr>
                                <td className={'par-span-bold'}>Температурный режим:</td>
                                <td>{el.temp}</td>

                            </tr>
                            <tr>
                                <td className={'par-span-bold'}>Работы проводятся:</td>
                                <td>{el.time.nightDay + ' ' + el.time.weekOrWeekend}</td>
                            </tr>
                            <tr>
                                <td className={'par-span-bold'}>Технику для подъема людей на высоту предоставляет:</td>
                                <td>{el.equipmentProvision}</td>
                            </tr>
                        </table>
                        <table className={'warehouse-passports-table'} style={{marginTop: '-1px'}}>
                            <tr>
                                <th>№ п/п</th>
                                <th>Паспорт</th>
                                <th>Производитель оборудования</th>
                                <th>Тип Оборудования в соответстии с паспортом</th>
                                <th>Кол-во ЕПМ*, шт.</th>
                                <th>Высота стойки (рамы), мм</th>
                                <th>
                                    <tr style={{display: 'block', border: 'none', width: '100%'}}>
                                        <th style={{border: 'none',}}>Номинальная нагрузка в соотв. с паспортом, кг</th>
                                    </tr>
                                    <tr>
                                        <th style={{border: 'none',}}>на 1 ячейку</th>
                                        <th style={{border: 'none',}}>на 1 п/место</th>
                                    </tr>
                                </th>
                            </tr>
                            {warPassports}
                        </table>
                    </div>);
                pdfEquipmentInfoTable.push(
                    <div className="html2pdf__page-break"></div>
                );
            }
        }

        let staticTestsBlock: Array<JSX.Element> = [];
        let allPassports: Array<JSX.Element> = [];
        let lastFooter;
        let eqCalcTablesRows: Array<JSX.Element> = [];
        let isEqCals: boolean = false;
        if (source.stillagesStaticTests.isTesting) {
            let passportK = 1;
            let passportsCount = 0;
            for (let i = 0; i < source.equipmentInfo.warehousesInfo.length; i++) {
                const el = source.equipmentInfo.warehousesInfo[i];
                el.passports.forEach((passport) => {
                    if (!(passport.passport.length === 0 || passport.passport === 'null')) {
                        passportsCount++;
                    }
                });
            }
            for (let i = 0; i < source.equipmentInfo.warehousesInfo.length; i++) {
                const el = source.equipmentInfo.warehousesInfo[i];
                el.passports.forEach((passport) => {
                    if (!(passport.passport.length === 0 || passport.passport === 'null')) {
                        if (passportsCount-1 >= 10 && passportK-1 === 10){
                            lastFooter = (
                                <div className={'pdf-footer'} style={{marginTop: '5%'}}>
                                    <img src={'assets/down1.jpg'} alt=""/>
                                    <img src={'assets/down2.jpg'} alt=""/>
                                </div>
                            );
                            staticTestsBlock.push(
                                <div className={'pdf-footer'} style={{marginTop: '400px', marginLeft: '-0.5%', width: '100%'}}>
                                    <img src={'assets/down1.jpg'} alt=""/>
                                    <img src={'assets/down2.jpg'} style={{marginLeft: '-10px'}} alt=""/>
                                </div>
                            );
                            staticTestsBlock.push(<div className="html2pdf__page-break" />);
                            staticTestsBlock.push(
                                <div className={'pdf-header'} style={{marginLeft: '-6%', width: '110%', marginTop: '15px'}}>
                                    <img src={'assets/page_header.jpg'} style={{width: '110%', height: 'auto'}} alt=""/>
                                </div>
                            );
                        }
                        allPassports.push(
                            <tr>
                                <td>{passportK}</td>
                                <td>{passport.passport}</td>
                                <td>{passport.equipmentManufacturer}</td>
                                <td>{passport.equipmentType}</td>
                                <td style={{display: 'flex'}}>
                                    <td style={{
                                        display: 'block',
                                        width: '50%',
                                        border: 'none',
                                        clear: 'both'
                                    }}>{passport.ratedLoad.forCell}
                                    </td>
                                    <td style={{
                                        display: 'block',
                                        width: '50%',
                                        border: 'none',
                                        clear: 'both'
                                    }}>{passport.ratedLoad.forPallet}</td>
                                </td>
                            </tr>
                        );
                        passportK++;
                    }
                });
            }


            staticTestsBlock.push(
                <table style={{marginTop: passportsCount-1 > 10 ? '15px' : '5px'}}>
                    <tr>
                        <td><span className={'par-span-bold'}>Стоимость</span>, руб. с НДС 20%:</td>
                        <td>{source.equipmentInfo.price}</td>
                    </tr>
                    <tr>
                        <td><span className={'par-span-bold'}>Продолжительность:</span></td>
                        <td>Работы на объекте – {source.equipmentInfo.days} раб.дней<br/>Отчет в печатном формате – 5 раб.дней</td>
                    </tr>
                </table>);
            staticTestsBlock.push(<h4>Проведение статических испытаний стеллажей (п. 10.3.2 ГОСТ Р 55525-2017)</h4>);
            staticTestsBlock.push(
                <table className={'warehouse-passports-table'} style={{marginTop: '-7px'}}>
                    <tr>
                        <th>№ п/п</th>
                        <th>Паспорт</th>
                        <th>Производитель оборудования</th>
                        <th>Тип Оборудования в соответстии с паспортом</th>
                        <th>
                            <tr style={{display: 'block', border: 'none', width: '100%'}}>
                                <th style={{border: 'none',}}>Номинальная нагрузка в соотв. с паспортом, кг</th>
                            </tr>
                            <tr>
                                <th style={{border: 'none',}}>на 1 ячейку</th>
                                <th style={{border: 'none',}}>на 1 п/место</th>
                            </tr>
                        </th>
                    </tr>
                    {allPassports}
                </table>
            );
            if (passportK-1 >= 1 && passportK-1 < 11) {
                lastFooter = (
                    <div className={'pdf-footer'} style={{marginTop: '55%'}}>
                        <img src={'assets/down1.jpg'} alt=""/>
                        <img src={'assets/down2.jpg'} alt=""/>
                    </div>
                );
                console.log('this: ' + true);
                console.log(passportK - 1);
                const defaultTop = 32;
                const ONE_TABLE_ROW_HEIGHT = 3;
                // let mTop = Math.abs((110 - (50 * (12 - passportK)))).toString() + 'px';
                let top = Math.abs(defaultTop - (passportK - 1) * ONE_TABLE_ROW_HEIGHT).toString() + '%';
                // let top = -4;
                console.log('TOP: ' + top);
                // passportK-1 === 1 ? defaultTop.toString() + 'px' : top
                staticTestsBlock.push(
                    <div className={'pdf-footer'} style={{marginTop: passportK-1 === 1 ? defaultTop.toString() + '%' : top, marginLeft: '5px', width: '100%'}}>
                        <img src={'assets/down1.jpg'} alt="" />
                        <img src={'assets/down2.jpg'} alt="" />
                    </div>
                );
                staticTestsBlock.push(<div className="html2pdf__page-break" />);
                staticTestsBlock.push(
                    <div className={'pdf-header'} style={{marginLeft: '-6%', width: '110%', marginTop: '15px'}}>
                        <img src={'assets/page_header.jpg'} style={{width: '110%', height: 'auto'}} alt=""/>
                    </div>
                );
            }
            staticTestsBlock.push(
                <table className={'customer-info-table'} style={{ marginTop: passportK-1 >= 1 && passportK-1 < 13 ? '15px' : '0px' }}>
                    <tr>
                        <td>Всего испытаний:</td>
                        <td>{source.stillagesStaticTests.testsCount}</td>
                    </tr>
                    <tr>
                        <td>Испытания проводятся с применением:</td>
                        <td>{source.stillagesStaticTests.testsType}</td>
                    </tr>
                    <tr>
                        <td>Контрольные грузы/весы предоставляет:</td>
                        <td>{source.stillagesStaticTests.controlsProvision}</td>
                    </tr>
                    <tr>
                        <td>Тип контрольных грузов:</td>
                        <td>{source.stillagesStaticTests.controlCargoType}</td>
                    </tr>
                    <tr>
                        <td>Доставку контрольных грузов/весов осуществляет:</td>
                        <td>{source.stillagesStaticTests.controlCargoDelivery}</td>
                    </tr>
                    <tr>
                        <td>Технику для проведения статических испытаний предоставляет:</td>
                        <td>{source.stillagesStaticTests.staticTestsEquipmentProvision}</td>
                    </tr>
                </table>
            );

            if (source.equipmentCalculations.eqtCalculations1.type.length !== 0 && source.equipmentCalculations.eqtCalculations1.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Проверочные расчеты несущей способности</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.type}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.typesCount}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.needPassport1.type.length !== 0 && source.equipmentCalculations.needPassport1.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Разработка и изготовление технического паспорта</td>
                        <td>{source.equipmentCalculations.needPassport1.type}</td>
                        <td>{source.equipmentCalculations.needPassport1.typesCount}</td>
                        <td>{source.equipmentCalculations.needPassport1.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.needPassport1.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.eqtCalculations2.type.length !== 0 && source.equipmentCalculations.eqtCalculations2.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Проверочные расчеты несущей способности</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.type}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.typesCount}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.needPassport2.type.length !== 0 && source.equipmentCalculations.needPassport2.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Разработка и изготовление технического паспорта</td>
                        <td>{source.equipmentCalculations.needPassport2.type}</td>
                        <td>{source.equipmentCalculations.needPassport2.typesCount}</td>
                        <td>{source.equipmentCalculations.needPassport2.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.needPassport2.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (passportsCount-1 < 10 && isEqCals) {
                // staticTestsBlock.push(<div className="html2pdf__page-break"/>);
                // staticTestsBlock.push(
                //     <div className={'pdf-header'} style={{marginLeft: '-6%', width: '110%', marginTop: '15px'}}>
                //         <img src={'assets/page_header.jpg'} style={{width: '110%', height: 'auto'}} alt=""/>
                //     </div>
                // );
                staticTestsBlock.push(
                    <h4 style={{color: 'black', marginTop: '15px',}} className={'warehouse-info-title'}>Проведение
                        расчетов Оборудования на несущую способность</h4>
                );
                staticTestsBlock.push(
                    <table style={{marginTop: '-7px'}}>
                        <tr>
                            <th>Наименование</th>
                            <th>Тип</th>
                            <th>Количество типов</th>
                            <th>Стоимость за 1 тип, руб., в т.ч. НДС</th>
                            <th>Сумма, руб., в т.ч. НДС</th>
                        </tr>
                        {eqCalcTablesRows}
                    </table>
                );

                staticTestsBlock.push(
                    <table>
                        <tr>
                            <td>Стоимость, руб. с НДС 20%:</td>
                            <td>{this.getEqCalcPrice}</td>
                        </tr>
                        <tr>
                            <td>Продолжительность, раб.дни:</td>
                            <td>{source.equipmentCalculations.daysForWork}</td>
                        </tr>
                    </table>
                );
            } else if (passportsCount-1 > 10 && isEqCals) {
                staticTestsBlock.push(<div className="html2pdf__page-break" />);
                staticTestsBlock.push(
                    <div className={'pdf-header'} style={{marginLeft: '-6%', width: '110%', marginTop: '15px'}}>
                        <img src={'assets/page_header.jpg'} style={{width: '110%', height: 'auto'}} alt=""/>
                    </div>
                );
                staticTestsBlock.push(
                    <h4 style={{color: 'black', marginTop: '15px', }} className={'warehouse-info-title'}>Проведение расчетов Оборудования на несущую способность</h4>
                );
                staticTestsBlock.push(
                    <table style={{marginTop: '-7px'}}>
                        <tr>
                            <th>Наименование</th>
                            <th>Тип</th>
                            <th>Количество типов</th>
                            <th>Стоимость за 1 тип, руб., в т.ч. НДС</th>
                            <th>Сумма, руб., в т.ч. НДС</th>
                        </tr>
                        {eqCalcTablesRows}
                    </table>
                );

                staticTestsBlock.push(
                    <table>
                        <tr>
                            <td>Стоимость, руб. с НДС 20%:</td>
                            <td>{this.getEqCalcPrice}</td>
                        </tr>
                        <tr>
                            <td>Продолжительность, раб.дни:</td>
                            <td>{source.equipmentCalculations.daysForWork}</td>
                        </tr>
                    </table>
                );
                const TABLE_ROW_HEIGHT = 3;
                const FOOTER_DEFAULT_TOP = 54;
                let top = FOOTER_DEFAULT_TOP - (TABLE_ROW_HEIGHT * eqCalcTablesRows.length);
                lastFooter = (
                    <div className={'pdf-footer'} style={{marginTop: eqCalcTablesRows.length === 1 ? FOOTER_DEFAULT_TOP + '%' : top + '%'}}>
                        <img src={'assets/down1.jpg'} alt=""/>
                        <img src={'assets/down2.jpg'} alt=""/>
                    </div>
                );
            }

            staticTestsBlock.push(
                <table style={{ marginTop: passportK-1 >= 1 && passportK-1 < 13 ? '15px' : '0px' }}>
                    <tr>
                        <td><span className={'par-span-bold'}>Общая стоимость работ</span>, руб. с НДС 20%:</td>
                        <td style={{textAlign: 'right'}}>{this.getFullPrice}</td>
                    </tr>
                    <tr>
                        <td><span className={'par-span-bold'}>Условия оплаты:</span></td>
                        <td style={{textAlign: 'center'}}>{source.paymentType + (source.paymentType === 'Постоплата 100%' ? (', ' + source.paymentDays + 'д.') : '')}</td>
                    </tr>
                </table>
            );

            if (passportsCount-1 > 13) {
                lastFooter = (<div></div>);
            } else if (passportsCount-1 < 10 && isEqCals) {
                const TABLE_ROW_HEIGHT = 3;
                const FOOTER_DEFAULT_TOP = 35;
                let top = FOOTER_DEFAULT_TOP - (TABLE_ROW_HEIGHT * eqCalcTablesRows.length);
                lastFooter = (
                    <div className={'pdf-footer'} style={{marginTop: eqCalcTablesRows.length === 1 ? FOOTER_DEFAULT_TOP + '%' : top + '%'}}>
                        <img src={'assets/down1.jpg'} alt=""/>
                        <img src={'assets/down2.jpg'} alt=""/>
                    </div>
                );
            }
        }
         else {
            staticTestsBlock.push(
                <table>
                    <tr>
                        <td><span className={'par-span-bold'}>Стоимость</span>, руб. с НДС 20%:</td>
                        <td>{source.equipmentInfo.price}</td>
                    </tr>
                    <tr>
                        <td><span className={'par-span-bold'}>Продолжительность:</span></td>
                        <td>Работы на объекте – 1 раб.дней<br/>Отчет в печатном формате – 5 раб.дней</td>
                    </tr>
                </table>
            );


            if (source.equipmentCalculations.eqtCalculations1.type.length !== 0 && source.equipmentCalculations.eqtCalculations1.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Проверочные расчеты несущей способности</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.type}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.typesCount}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.eqtCalculations1.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.needPassport1.type.length !== 0 && source.equipmentCalculations.needPassport1.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Разработка и изготовление технического паспорта</td>
                        <td>{source.equipmentCalculations.needPassport1.type}</td>
                        <td>{source.equipmentCalculations.needPassport1.typesCount}</td>
                        <td>{source.equipmentCalculations.needPassport1.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.needPassport1.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.eqtCalculations2.type.length !== 0 && source.equipmentCalculations.eqtCalculations2.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Проверочные расчеты несущей способности</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.type}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.typesCount}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.eqtCalculations2.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (source.equipmentCalculations.needPassport2.type.length !== 0 && source.equipmentCalculations.needPassport2.type !== 'null') {
                eqCalcTablesRows.push(
                    <tr>
                        <td>Разработка и изготовление технического паспорта</td>
                        <td>{source.equipmentCalculations.needPassport2.type}</td>
                        <td>{source.equipmentCalculations.needPassport2.typesCount}</td>
                        <td>{source.equipmentCalculations.needPassport2.oneTypePrice}</td>
                        <td>{source.equipmentCalculations.needPassport2.fullPrice}</td>
                    </tr>
                );
                isEqCals = true;
            }

            if (isEqCals) {
                staticTestsBlock.push(<div className="html2pdf__page-break" />);
                staticTestsBlock.push(
                    <div className={'pdf-header'} style={{marginLeft: '-6%', width: '110%', marginTop: '15px'}}>
                        <img src={'assets/page_header.jpg'} style={{width: '110%', height: 'auto'}} alt=""/>
                    </div>
                );
                staticTestsBlock.push(
                    <h4 style={{color: 'black', marginTop: '15px', }} className={'warehouse-info-title'}>Проведение расчетов Оборудования на несущую способность</h4>
                );
                staticTestsBlock.push(
                    <table style={{marginTop: '-7px'}}>
                        <tr>
                            <th>Наименование</th>
                            <th>Тип</th>
                            <th>Количество типов</th>
                            <th>Стоимость за 1 тип, руб., в т.ч. НДС</th>
                            <th>Сумма, руб., в т.ч. НДС</th>
                        </tr>
                        {eqCalcTablesRows}
                    </table>
                );

                staticTestsBlock.push(
                    <table>
                        <tr>
                            <td>Стоимость, руб. с НДС 20%:</td>
                            <td>{this.getEqCalcPrice}</td>
                        </tr>
                        <tr>
                            <td>Продолжительность, раб.дни:</td>
                            <td>{source.equipmentCalculations.daysForWork}</td>
                        </tr>
                    </table>
                );
                const TABLE_ROW_HEIGHT = 3;
                let top = 52 - (TABLE_ROW_HEIGHT * eqCalcTablesRows.length);
                lastFooter = (
                    <div className={'pdf-footer'} style={{marginTop: eqCalcTablesRows.length === 1 ? '52%' : top + '%'}}>
                        <img src={'assets/down1.jpg'} alt=""/>
                        <img src={'assets/down2.jpg'} alt=""/>
                    </div>
                );
            }
            staticTestsBlock.push(
                <table style={{marginTop: '10px'}}>
                    <tr>
                        <td><span className={'par-span-bold'}>Общая стоимость работ</span>, руб. с НДС 20%:</td>
                        <td style={{textAlign: 'right'}}>{this.getFullPrice}</td>
                    </tr>
                    <tr>
                        <td><span className={'par-span-bold'}>Условия оплаты:</span></td>
                        <td style={{textAlign: 'center'}}>{source.paymentType + (source.paymentType === 'Постоплата 100%' ? (', ' + source.paymentDays + 'д.') : '')}</td>
                    </tr>
                </table>
            );
        }
        let paymentDays;
        if (source.paymentType === 'Постоплата 100%') {
            paymentDays = (
                <div>
                    <h4>Количество рабочих дней: </h4>
                    <input onChange={(e) => this.updateValue('paymentDays', e.target.value)} value={source.paymentDays} type={'text'} />
                </div>
            );
        }
        return [
            <div
                id={'wrapper'}
                className={'proposal'}
                // style={{display: this.state.proposalTemplateVisibility ? 'none' : 'flex'}}
            >
                <div className={'kp-header'}><h2>Коммерческое предложение</h2></div>
                <hr style={{width: '100%', borderStyle: 'dotted'}}/>
                <div className={'kp-date'}>
                    <h4>Дата: </h4>
                    <input value={this.getCurrentDate} style={{textAlign: 'center'}} type="text"/>
                </div>
                <div className={'titles'}><h3>Общая информация о заказчике</h3></div>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Компания: </h4>
                        <input
                            onChange={(e) => this.updateValue('companyName', e.target.value)}
                            value={source.general.companyName} type="text"
                        />
                    </div>
                    <div>
                        <h4>Ф.И.О.: </h4>
                        <input
                            onChange={(e)=> this.updateValue('customerFullName', e.target.value)}
                            value={source.general.customerFullName} type="text"
                        />
                    </div>
                    <div>
                        <h4>Должность: </h4>
                        <input
                            onChange={(e) => this.updateValue('customerPosition', e.target.value)}
                            value={source.general.customerPosition} type="text"
                        />
                    </div>
                    <div>
                        <h4>E-mail: </h4>
                        <input
                            onChange={(e) => this.updateValue('customerEmail', e.target.value)}
                            value={source.general.customerEmail} type="text"
                        />
                    </div>
                    <div>
                        <h4>Тел.: </h4>
                        <input
                            onChange={(e) => this.updateValue('customerPhone', e.target.value)}
                            value={source.general.customerPhoneNumber} type="text"
                        />
                    </div>
                </div>
                <div className={'titles'}><h3>Информация об оборудовании Заказчика (кол-во объектов: <span>{source.equipmentInfo.warehouseCount}</span>)</h3></div>
                <div className={'kp-warehouses'}>
                    {warehouses}
                    <div style={{marginTop: '1%'}}>
                        <button onClick={this.addWarehouseAction}>+</button>
                    </div>
                </div>
                <div className={'kp-warehouses-footer'}>
                    <div>
                        <h4>Полное техническое освидетельствование: </h4>
                        <select onChange={(e) => this.updateValue('pto', e.target.value)} value={source.equipmentInfo.pto}>
                            {ptoOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Стоимость, руб с НДС 20%: </h4>
                        <input onChange={(e) => this.updateValue('eqInfoPrice', e.target.value)} value={source.equipmentInfo.price} type="text"/>
                    </div>
                    <div>
                        <h4>Продолжительность работ, раб.дней: </h4>
                        <input onChange={(e) => this.updateValue('eqInfoDays', e.target.value)} value={source.equipmentInfo.days} type="text"/>
                    </div>
                </div>
                <div className={'titles'}>
                    <h3>Проведение статических испытаний стеллажей</h3>
                    <label className="switch">
                        <input onChange={() => this.updateValue('isStaticTests', '')} checked={source.stillagesStaticTests.isTesting} type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
                {staticTests}
                <div className={'titles'}><h3>Проведение расчетов Оборудования на несущую способность</h3></div>
                <div style={{border: '1px solid #c4c4c4'}} className={'kp-statictests'}>
                    <div className={'table-header'}>
                        <div style={{width: '80%'}}><p>Наименование</p></div>
                        <div style={{width: '80%'}}><p>Тип</p></div>
                        <div style={{width: '35%'}}><p>Количество типов</p></div>
                        <div style={{width: '35%'}}><p>Стоимость за 1 тип, руб., в т.ч. НДС</p></div>
                        <div style={{width: '35%'}}><p>Сумма, руб., в т.ч. НДС</p></div>
                    </div>
                    <div className={'table-rows calculations-rows'} style={{height: 'auto'}}>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Проверочные расчеты несущей способности'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select onChange={(e) => this.updateValue('eqtCalculations1Type', e.target.value)} value={source.equipmentCalculations.eqtCalculations1.type}>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations1TypesCount', e.target.value)} value={source.equipmentCalculations.eqtCalculations1.typesCount} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations1OneTypePrice', e.target.value)} value={source.equipmentCalculations.eqtCalculations1.oneTypePrice} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations1FullPrice', e.target.value)}
                                       value={
                                           parseInt(source.equipmentCalculations.eqtCalculations1.typesCount) * parseInt(source.equipmentCalculations.eqtCalculations1.oneTypePrice)
                                       } type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Разработка и изготовление технического паспорта'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select onChange={(e) => this.updateValue('needPassport1Type', e.target.value)} value={source.equipmentCalculations.needPassport1.type}>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport1TypesCount', e.target.value)} value={source.equipmentCalculations.needPassport1.typesCount} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport1OneTypePrice', e.target.value)} value={source.equipmentCalculations.needPassport1.oneTypePrice} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport1FullPrice', e.target.value)}
                                       value={
                                           parseInt(source.equipmentCalculations.needPassport1.oneTypePrice) * parseInt(source.equipmentCalculations.needPassport1.typesCount)
                                       } type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Проверочные расчеты несущей способности'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select onChange={(e) => this.updateValue('eqtCalculations2Type', e.target.value)} value={source.equipmentCalculations.eqtCalculations2.type}>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations2TypesCount', e.target.value)} value={source.equipmentCalculations.eqtCalculations2.typesCount} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations2OneTypePrice', e.target.value)} value={source.equipmentCalculations.eqtCalculations2.oneTypePrice} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('eqtCalculations2FullPrice', e.target.value)}
                                       value={
                                           parseInt(source.equipmentCalculations.eqtCalculations2.oneTypePrice) * parseInt(source.equipmentCalculations.eqtCalculations2.typesCount)
                                       } type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Разработка и изготовление технического паспорта'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select onChange={(e) => this.updateValue('needPassport2Type', e.target.value)} value={source.equipmentCalculations.needPassport2.type}>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport2TypesCount', e.target.value)} value={source.equipmentCalculations.needPassport2.typesCount} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport2OneTypePrice', e.target.value)} value={source.equipmentCalculations.needPassport2.oneTypePrice} type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input onChange={(e) => this.updateValue('needPassport2FullPrice', e.target.value)}
                                       value={
                                           parseInt(source.equipmentCalculations.needPassport2.typesCount) * parseInt(source.equipmentCalculations.needPassport2.oneTypePrice)
                                       } type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Учитывается ли при расчетах влияние ветровых и снеговых нагрузок: </h4>
                        <select onChange={(e) => this.updateValue('windOrSnowTests', e.target.value)} value={source.equipmentCalculations.windOrSnowTests}>
                            {yesOrNoOptions}
                        </select>
                    </div>
                    <div>
                        <h4>Стоимость, руб. с НДС 20%: </h4>
                        <input onChange={(e) => this.updateValue('testsPrice', e.target.value)} value={this.getEqCalcPrice} type="text"/>
                    </div>
                    <div>
                        <h4>Продолжительность, раб. Дни: </h4>
                        <input onChange={(e) => this.updateValue('daysForWork', e.target.value)} value={source.equipmentCalculations.daysForWork} type="text" />
                    </div>
                </div>
                <hr style={{width: '100%', borderStyle: 'dotted'}}/>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Общая стоимость работ, руб. с НДС 20%: </h4>
                        <input
                            // onChange={(e) => this.updateValue('proposalFullPrice', e.target.value)}
                            value={this.getFullPrice} type={'text'} />
                    </div>
                    <div>
                        <h4>Условия оплаты: </h4>
                        <select onChange={(e) => this.updateValue('proposalPaymentType', e.target.value)} value={source.paymentType}>
                            {paymentTypeOptions}
                        </select>
                    </div>
                    {paymentDays}
                </div>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Менеджер: </h4>
                        <input onChange={(e) => this.updateValue('managerFullName', e.target.value)} value={source.manager.fullName} placeholder={'Олег Киселев'} type={'text'} />
                    </div>
                    <div>
                        <h4>Должность: </h4>
                        <input onChange={(e) => this.updateValue('managerPosition', e.target.value)} value={source.manager.position} placeholder={'Менеджер проекта'} type={'text'} />
                    </div>
                    <div>
                        <h4>Моб. телефон: </h4>
                        <input onChange={(e) => this.updateValue('managerCellPhone', e.target.value)} value={source.manager.cellPhone} placeholder={'8 925 009 85 55'} type={'text'} />
                    </div>
                    <div>
                        <h4>Раб. телефон: </h4>
                        <input onChange={(e) => this.updateValue('managerWorkPhone', e.target.value)} value={source.manager.workPhone} placeholder={'8 800 222 26 25 (доб. 103)'} type={'text'} />
                    </div>
                    <div>
                        <h4>Почта: </h4>
                        <input onChange={(e) => this.updateValue('managerEmail', e.target.value)} value={source.manager.email} placeholder={'o.kiselev@technovik.ru'} type={'text'} />
                    </div>
                </div>
                <button onClick={() => this.generateAction()} className={'generate-button'}>сформировать</button>
            </div>,
            <div onClick={() => this.generateAction()} id={'pdf-wrapper'}
                 style={{
                     display: this.state.proposalTemplateVisibility ? 'flex' : 'none',
                     overflow: 'hidden'
                 }}
            >
                <div className={'pdf-header'}>
                    <img src={'assets/page_header.jpg'} alt=""/>
                </div>
                {/*<div className="html2pdf__page-break"></div>*/}
                <div className={'pdf-page-content'}>
                    <div className={'customer-info-block'}>
                        <div className={'customer-info-table-block'}>
                            <h4 style={{fontSize: '10pt'}}>Контактная информация о Заказчике:</h4>
                            <table className={'customer-info-table'}>
                                <tr>
                                    <td>Компания</td>
                                    <td>{source.general.companyName}</td>
                                </tr>
                                <tr>
                                    <td>Ф.И.О.</td>
                                    <td>{source.general.customerFullName}</td>
                                </tr>
                                <tr>
                                    <td>Должность</td>
                                    <td>{source.general.customerPosition}</td>
                                </tr>
                                <tr>
                                    <td>e-mail</td>
                                    <td>{source.general.customerEmail}</td>
                                </tr>
                                <tr>
                                    <td>Тел.</td>
                                    <td>{source.general.customerPhoneNumber}</td>
                                </tr>
                            </table>
                        </div>
                        <div className={'date-label'}>
                            <h4 style={{fontSize: '10pt'}}>Дата:</h4>
                            <span>{source.date}</span>
                        </div>
                    </div>
                    <div className={'technovik-information'} style={{marginTop: '5px'}}>
                        <h4>Коммерческое предложение</h4>
                        <div className={'technovik-information-text'}>
                            <p>
                                <span className={'blue-title par-tabul'}>Инженерно-технический центр «ТЕХНОВИК»</span> предлагает провести Полное техническое
                                освидетельствование Вашего оборудования в соответствии с требованиями ГОСТ Р 55525.<br/>
                                <span className={'par-tabul'}>По</span> результатам комплексной технической экспертизы Заказчик получает технический отчет и<br/>
                                заключение эксперта о техническом состоянии стеллажной системы. В качестве экспертных рекомендаций
                                разрабатывается перечень мер необходимых для приведения стеллажей в максимально работоспособное
                                состояние для их дальнейшей эксплуатации.<br/>
                                <span className={'par-tabul'}>Каждое</span> полное техническое освидетельствование включает в себя индивидуальную консультацию и
                                презентацию результатов аттестованным экспертом, на которой Заказчик сможет получить ответы на все
                                вопросы. И, что немаловажно, мы предоставляем только объективные и понятные рекомендации.<br/><br/>
                                <span className={'par-tabul'}>Вся</span> отчетная документация, выдаваемая ИТЦ «ТЕХНОВИК», <span className={'par-span-underline'}>имеет полную юридическую силу</span> и может быть
                                использована Заказчиком для предоставления <span className={'par-span-bold'}>в страховые компании, судебные инстанции, органы </span>
                                <span className={'par-span-bold'}>государственного контроля</span>, а также для прохождения прочих аудитов.<br/><br/>
                                <span className={'par-tabul'}>Испытательная</span> лаборатория «ТЕХНОВИК» <span className={'par-span-bold'}>аккредитована</span> Федеральной Службой по Аккредитации
                                (<a href={'http://fsa.gov.ru/'}>http://fsa.gov.ru/</a>). Аттестат аккредитации № RA.RU.21АМ83.<br/><br/>
                                <span className={'par-tabul'}>Эксперты</span>, проводящие освидетельствование стеллажных металлоконструкций, аттестованы на знание
                                требований ГОСТ и имеют право подписи технических заключений о состоянии металлоконструкций.<br/><br/><br/>
                                <span className={'par-tabul'}>Дополнительным</span> подтверждением нашей компетентности и профессионализма является <span className={'par-span-bold'}>статус действующего участника отраслевых ассоциаций</span> (в т.ч. европейских):<br/>
                                <span className={'par-span-bold'} style={{marginLeft: '10px'}}>FEM</span> - Европейская ассоциация подъемно-транспортного оборудования (<a href={'https://www.fem-eur.com'}>www.fem-eur.com</a>)<br/>
                                <span className={'par-span-bold'} style={{marginLeft: '10px'}}>NRSEA</span> - Российская ассоциации производителей стеллажей и складского оборудования (<a href={'https://www.nrsea.ru'}>www.nrsea.ru</a>)
                            </p>
                        </div>
                    </div>{/*220px*/}
                    <div className={'pdf-footer'} style={{marginTop: '25%'}}>
                        <img src={'assets/down1.jpg'} alt=""/>
                        <img src={'assets/down2.jpg'} alt=""/>
                    </div>
                    <div className="html2pdf__page-break"></div>

                    {pdfEquipmentInfoTable}

                </div>
                <div className={'pdf-header'} style={{marginTop: '15px'}}>
                    <img src={'assets/page_header.jpg'} alt=""/>
                </div>
                <div className={'pdf-page-content'}>
                    <div className={'description-and-price'}>
                        <hr style={{border: '1px solid #ffc000', width: '100%'}}/>
                        <h5 className={'warehouse-info-title'}><span style={{marginLeft: '30px'}}>Описание</span> и стоимость работ</h5>
                        <hr style={{border: '1px solid #002060', width: '100%', marginTop: '-15px'}}/>
                        <h5 style={{marginLeft: '10px', marginTop: '-3px'}}>Полное техническое освидетельствование (п. 10.3.2. ГОСТ Р 55525-2017)</h5>
                        <p>
                            <span style={{marginLeft: '15px'}}>- Поиск</span> и идентификация методом измерительного контроля деформированных элементов стеллажной системы и
                            классификация деформаций на соответствие ГОСТ Р 55525-2017.<br/>
                            <span style={{marginLeft: '15px'}}>- Контроль</span> моментов затяжки ответственных резьбовых соединений (2% общего объема).<br/>
                            <span style={{marginLeft: '15px'}}>- Контроль</span> сварных соединений с целью выявления повреждений, образовавшихся в процессе эксплуатации (в объеме,
                            соответствующем требованиям ГОСТ Р 55525-2017)<br/>
                            <span style={{marginLeft: '15px'}}>- Контроль</span> наличия фиксаторов коннекторов балок (в зонах, доступных для визуального контроля).<br/>
                            <span style={{marginLeft: '15px'}}>- Измерительный</span> контроль параметра Сх – отклонение стоек от плоскости YOZ в направлении Х.<br/>
                            <span style={{marginLeft: '15px'}}>- Измерительный</span> контроль параметра Сy – отклонение стойки от плоскости XOZ в направлении Y.<br/>
                            <span style={{marginLeft: '15px'}}>- Измерительный</span> контроль параметра Yh – расстояние от верхней плоскости балок последнего уровня до верхнего края
                            стойки (только для фронтальных стеллажей).
                        </p>
                        <hr style={{border: '1px solid #002060', width: '100%', marginTop: '-10px'}}/>
                        <h5 style={{color: 'black', marginTop: '-4px'}} className={'warehouse-info-title'}><span style={{}}>Подготовка</span> Технического отчета о проведенном ПТО</h5>
                        <p>
                            <span style={{marginLeft: '15px'}}>- Подробное</span> описание всех проведенных процедур и измерений, результаты, выводы, ссылки на нормативную
                            документацию.<br/>
                            <span style={{marginLeft: '15px'}}>- Заключение</span> эксперта о техническом состоянии оборудования.<br/>
                            <span style={{marginLeft: '15px'}}>- Рекомендации</span> эксперта по приведению Оборудования или его элементов в работоспособное состояние.<br/>
                            <span style={{marginLeft: '15px'}}>- Унифицированную</span> сводную таблицу поврежденных элементов с разбивкой по производителям, типам и сечениям.<br/>
                            <span style={{marginLeft: '15px'}}>- Дефектная</span> ведомость с указанием степени повреждения элемента и его точной адресацией на схеме склада (№ ряда,
                            места, уровня).<br/>
                            <span style={{marginLeft: '15px'}}>- Схема</span> склада с указанием мест расположения дефектов (какой элемент, какое повреждение, уровень риска: зеленый,
                            желтый, красный).<br/>
                            <span style={{marginLeft: '15px'}}>- Схема</span> склада с указанием направлений отклонений стоек от вертикали.<br/>
                        </p>
                        <p className={'final-tables'}>

                            {staticTestsBlock}
                            <h4 style={{color: 'black', marginTop: '15px', paddingBottom: '7px'}} className={'warehouse-info-title'}>Нормативная документация, регламентирующая проведение работ:</h4>
                            <p>
                                <span>&#9660; </span>ГОСТ Р 55525-2017. «Стеллажи сборно-разборные. Общие технические условия». <br/>
                                <span>&#9660; </span>ГОСТ Р 56567-2015. «Стеллажи сборно-разборные. Нормы расчета». <br/>
                                <span>&#9660; </span>ГОСТ Р 57381-2017. «Складское оборудование. Стеллажи полочные. Общие технические условия». <br/>
                                <span>&#9660; </span>ГОСТ 26433.2-94. «Система обеспечения точности геометрических параметров в строительстве. Правила выполнения
                                измерений параметров зданий и сооружений». <br/>
                                <span>&#9660; </span>EN 15620. Adjustable Beam Pallet Racking – Tolerances, Deformations and Clearances – «Допустимые отклонения, допуски
                                и деформации». <br/>
                                <span>&#9660; </span>EN 15635. Steel static storage systems - Application and maintenance of storage equipment – «Эксплуатация и техническое
                                обслуживание стеллажного оборудования». <br/>
                                <span>&#9660; </span>РД 03-606-03. Инструкция по визуальному и измерительному контролю
                            </p>
                        </p>
                        <div className={'manager-info'}>
                            <span>С уважением, {source.manager.fullName}</span>
                            <span>{source.manager.position}</span>
                            <span>Моб.тел.: {source.manager.cellPhone}</span>
                            <span>{source.manager.workPhone}</span>
                            <span>E-mail: {source.manager.email}</span>
                        </div>
                    </div>
                </div>
                {lastFooter}
            </div>,
            <div id={'loading'} style={{
                position: 'absolute',
                background: 'black',
                width: '100%',
                height: '100%',
                opacity: 0.6,
                display: this.state.loader ? 'flex' : 'none',
                zIndex: 999999
            }}>
                <img id="loading-image" src={"assets/ajax-loader.gif"} alt="Loading..." />
                <h3 id="langLoad" style={{marginLeft: '10px'}}>Загрузка...</h3>
            </div>
        ]
    }

}