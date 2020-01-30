import Proposal from "../../Proposal";

export default interface IProposalViewState {
    loader: boolean,
    proposalTemplateVisibility: boolean,
    selectedWarehouse: number,
    source: Proposal
}