import React, {Component, isValidElement} from 'react';
import IProposalViewProps from "../../../models/components/ProposalView/IProposalViewProps";
import IProposalViewState from "../../../models/components/ProposalView/IProposalViewState";
import './ProposalView.css';
import './ToggleButton.css';
import IsPassportEnum from "../../../models/enums/IsPassportEnum";
import Decimal from 'decimal.js';
import DataLists from "../../../data/static/DataLists";
import ProposalViewSource from "../../../data/static/ProposalViewSource";

export default class ProposalView extends Component<IProposalViewProps, IProposalViewState> {

    constructor(props: IProposalViewProps) {
        super(props);
        this.state = {
            selectedWarehouse: 0,
            source: ProposalViewSource.source
        };

        this.state.source.date = this.getCurrentDate;
    }

    public get getCurrentDate(): string {
        let date = new Date();
        return date.getDate() + '.' + date.getMonth()+1 + '.' + date.getFullYear();
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
        DataLists.controlCargoTypeValuesList.forEach((el) => controlCargoTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>))
        DataLists.controlCargoDeliveryValuesList.forEach((el) => controlCargoDeliveryOptions.push(<option key={'value_' + el} value={el}>{el}</option>));
        DataLists.eqCalculationsTypeValuesList.forEach((el) => eqCalculationsTypeOptions.push(<option key={'value_' + el} value={el}>{el}</option>));


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

        return (
            <div
                className={'proposal'}
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
                                <select>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Разработка и изготовление технического паспорта'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Проверочные расчеты несущей способности'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <div style={{width: '80%'}}>
                                <input readOnly={true} value={'Разработка и изготовление технического паспорта'} />
                            </div>
                            <div style={{width: '80%'}}>
                                <select>
                                    {eqCalculationsTypeOptions}
                                </select>
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type={'text'} />
                            </div>
                            <div style={{width: '35%'}}>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Учитывается ли при расчетах влияние ветровых и снеговых нагрузок: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Стоимость, руб. с НДС 20%: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Продолжительность, раб. Дни: </h4>
                        <input type="text"/>
                    </div>
                </div>
                <hr style={{width: '100%', borderStyle: 'dotted'}}/>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Общая стоимость работ, руб. с НДС 20%: </h4>
                        <input type={'text'} />
                    </div>
                    <div>
                        <h4>Условия оплаты: </h4>
                        <select />
                    </div>
                </div>
                <div className={'kp-generalinfo'}>
                    <div>
                        <h4>Менеджер: </h4>
                        <select />
                    </div>
                </div>
                <button className={'generate-button'}>сформировать</button>
            </div>
        );
    }

}