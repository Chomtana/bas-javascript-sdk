import { IKeyProvider, IGovernanceProposal, IPendingTx, Web3Address, IVotingPower } from "./types";
import { KeyProvider } from "./provider";
import { PastEventOptions } from "web3-eth-contract";
export declare class ProposalBuilder {
    private readonly keyProvider;
    actions: {
        target: string;
        inputData: string;
        value: string;
    }[];
    votingPeriod?: string;
    description?: string;
    constructor(keyProvider: IKeyProvider);
    setDescription(description: string): ProposalBuilder;
    setVotingPeriod(votingPeriod: string): ProposalBuilder;
    addDeployer(account: Web3Address): Promise<ProposalBuilder>;
    removeDeployer(account: Web3Address): Promise<ProposalBuilder>;
    addValidator(account: Web3Address): Promise<ProposalBuilder>;
    removeValidator(account: Web3Address): Promise<ProposalBuilder>;
    activateValidator(account: Web3Address): Promise<ProposalBuilder>;
    disableValidator(account: Web3Address): Promise<ProposalBuilder>;
    updateEmissionRate(ratePerSecond: number): Promise<ProposalBuilder>;
    updateMasterChefOwner(account: Web3Address): Promise<ProposalBuilder>;
    setMinStaking(amount: number): Promise<ProposalBuilder>;
    setMinRegisterValidator(amount: number): Promise<ProposalBuilder>;
    setActiveValidatorLength(amount: number): Promise<ProposalBuilder>;
    upgradeRuntime(systemContract: Web3Address, byteCode: string): Promise<ProposalBuilder>;
}
export declare class Governance {
    private readonly keyProvider;
    constructor(keyProvider: KeyProvider);
    getVotingPowers(validators: Web3Address[]): Promise<Record<Web3Address, IVotingPower>>;
    getProposals(options?: PastEventOptions): Promise<IGovernanceProposal[]>;
    createProposal(description?: string, votingPeriod?: string): ProposalBuilder;
    sendProposal(builder: ProposalBuilder): Promise<IPendingTx>;
    voteForProposal(id: string): Promise<IPendingTx>;
    voteAgainstProposal(id: string): Promise<IPendingTx>;
    executeProposal(proposal: IGovernanceProposal): Promise<IPendingTx>;
}
