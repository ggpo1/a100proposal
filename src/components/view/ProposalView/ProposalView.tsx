import React, { Component } from 'react';
import IProposalViewProps from "../../../models/components/ProposalView/IProposalViewProps";
import IProposalViewState from "../../../models/components/ProposalView/IProposalViewState";
import './ProposalView.css';
import IsPassportEnum from "../../../models/enums/IsPassportEnum";

export default class ProposalView extends Component<IProposalViewProps, IProposalViewState> {

    constructor(props: IProposalViewProps) {
        super(props);

    }

    render() {
        
        return (
            <div
                className={'proposal'}
            >

            </div>
        );
    }

}