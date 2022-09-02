"use strict";
exports.__esModule = true;
exports.TGovernanceProposalStatus = exports.VALIDATOR_STATUS_MAPPING = void 0;
exports.VALIDATOR_STATUS_MAPPING = {
    '0': 'NOT_FOUND',
    '1': 'ACTIVE',
    '2': 'PENDING',
    '3': 'JAILED'
};
var TGovernanceProposalStatus;
(function (TGovernanceProposalStatus) {
    TGovernanceProposalStatus[TGovernanceProposalStatus["Pending"] = 0] = "Pending";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Active"] = 1] = "Active";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Cancelled"] = 2] = "Cancelled";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Defeated"] = 3] = "Defeated";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Succeeded"] = 4] = "Succeeded";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Queued"] = 5] = "Queued";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Expired"] = 6] = "Expired";
    TGovernanceProposalStatus[TGovernanceProposalStatus["Executed"] = 7] = "Executed";
})(TGovernanceProposalStatus = exports.TGovernanceProposalStatus || (exports.TGovernanceProposalStatus = {}));
