import React, { Component } from 'react';
import IProposalViewProps from "../../../models/components/ProposalView/IProposalViewProps";
import IProposalViewState from "../../../models/components/ProposalView/IProposalViewState";
import './ProposalView.css';
import './ToggleButton.css';
import IsPassportEnum from "../../../models/enums/IsPassportEnum";
import Decimal from 'decimal.js';

export default class ProposalView extends Component<IProposalViewProps, IProposalViewState> {

    constructor(props: IProposalViewProps) {
        super(props);
        this.state = {
            source: {
                date: new Date(),
                general: {
                    companyName: '',
                    customerFullName: '',
                    customerPosition: '',
                    customerEmail: '',
                    customerPhoneNumber: ''
                },
                equipmentInfo: {
                    warehouseCount: 0,
                    warehousesInfo: [],
                    pto: '',
                    price: new Decimal(0),
                    days: ''
                },
                stillagesStaticTests: {
                    isTesting: false,
                    testsCount: 0,
                    testsType: '',
                    controlsProvision: '',
                    controlCargoType: '',
                    controlCargoDelivery: '',
                    staticTestsEquipmentProvision: '',
                    price: new Decimal(0)
                },
                equipmentCalculations: {
                    eqtCalculations1: {
                        type: '',
                        typesCount: '',
                        oneTypePrice: new Decimal(0),
                        fullPrice: new Decimal(0)
                    },
                    needPassport1: {
                        type: '',
                        typesCount: '',
                        oneTypePrice: new Decimal(0),
                        fullPrice: new Decimal(0)
                    },
                    eqtCalculations2: {
                        type: '',
                        typesCount: '',
                        oneTypePrice: new Decimal(0),
                        fullPrice: new Decimal(0)
                    },
                    needPassport2: {
                        type: '',
                        typesCount: '',
                        oneTypePrice: new Decimal(0),
                        fullPrice: new Decimal(0)
                    },
                    windOrSnowTests: false,
                    price: new Decimal(0),
                    daysForWork: ''
                },
                fullPrice: new Decimal(0),
                paymentType: '',
                manager: {
                    fullName: '',
                    position: '',
                    cellPhone: '',
                    workPhone: '',
                    email: ''
                }
            }
        }
    }

    public get getCurrentDate(): string {
        let date = new Date();
        return date.getDate() + '.' + date.getMonth()+1 + '.' + date.getFullYear();
    }

    updateValue = (fieldName: string, value: string) => {
        const { source } = this.state;
        console.log(fieldName);
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
        source.equipmentInfo.warehousesInfo.splice(index, 1);
        this.forceUpdate(() => this.setState({source}));
    };

    render() {
        const { source } = this.state;
        let warehouses: Array<JSX.Element> = [];
        let staticTests;


        for (let i = 1; i <= source.equipmentInfo.warehouseCount; i++) {
            warehouses.push(
                <div key={'object_fields_' + i} className={'kp-warehouse'}>
                    <div className={'object-title'}>
                        <h4>Объект <span>{i} </span><span onClick={() => this.deleteWarehouse(i - 1)} style={{color: 'red', textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'}}>(удалить)</span></h4>
                    </div>
                    <div>
                        <h4>Адрес места проведения работ: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Наименование объекта: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Суммарный объем хранения: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Температруный режим: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Время проведения работ: </h4>
                        <div style={{width: '100%'}}>
                            <select />
                            <select />
                        </div>
                    </div>
                    <div>
                        <h4>Предоставление техники: </h4>
                        <select />
                    </div>
                </div>,
                <div key={'object_table_' + i} style={{border: '1px solid #c4c4c4'}} className={'kp-statictests'}>
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
                    <div className={'table-rows'}>

                    </div>
                </div>
            );
        }

        if (source.stillagesStaticTests.isTesting) {
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
                    <div className={'table-rows'}>

                    </div>
                </div>,
                <div key={'staticTests_additional_fields'} className={'kp-generalinfo'}>
                    <div>
                        <h4>Всего испытаний: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Испытания проводятся с применением: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Контрольные грузы/весы предоставляет: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Тип контрольных грузов: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Доставку контрольных грузов/весов осуществляет: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Технику для проведения статических испытаний предоставляет: </h4>
                        <select />
                    </div>
                    <div>
                        <h4>Стоимость, руб. с НДС: </h4>
                        <input type="text"/>
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
                        <select />
                    </div>
                    <div>
                        <h4>Стоимость, руб с НДС 20%: </h4>
                        <input type="text"/>
                    </div>
                    <div>
                        <h4>Продолжительность работ, раб.дней: </h4>
                        <input type="text"/>
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
                    <div className={'table-rows'}>

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