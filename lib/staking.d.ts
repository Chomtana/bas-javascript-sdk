import { KeyProvider } from "./provider";
import { IDelegatorDelegation, IDelegatorOneOfEvent, IPendingTx, IStakingRewards, IValidator, Web3Address, Web3Uint256 } from "./types";
import BigNumber from "bignumber.js";
export declare class Staking {
    private readonly keyProvider;
    constructor(keyProvider: KeyProvider);
    getAllValidatorsAddresses(): Promise<Web3Address[]>;
    getAllValidators(epoch?: number): Promise<IValidator[]>;
    getTotalDelegatedAmount(): Promise<BigNumber>;
    getActiveDelegatedAmount(): Promise<BigNumber>;
    getDelegatorDelegatedAmount(delegator: Web3Address): Promise<BigNumber>;
    getActiveValidatorsAddresses(): Promise<Web3Address[]>;
    getActiveValidators(epoch?: number): Promise<IValidator[]>;
    countValidators(): Promise<{
        active: number;
        total: number;
    }>;
    getValidatorHistory(validator: Web3Address, beforeEpoch?: number, limit?: number): Promise<IValidator[]>;
    private loadValidatorsInfo;
    private loadValidatorInfo;
    delegateTo(validator: Web3Address, amount: Web3Uint256): Promise<IPendingTx>;
    getDelegationHistory(filter?: {
        validator?: Web3Address;
        staker?: Web3Address;
    }): Promise<IDelegatorDelegation[]>;
    getUnDelegationHistory(filter?: {
        validator?: Web3Address;
        staker?: Web3Address;
    }): Promise<IDelegatorDelegation[]>;
    getClaimHistory(filter?: {
        validator?: Web3Address;
        staker?: Web3Address;
    }): Promise<IDelegatorDelegation[]>;
    getAllEventsHistory(filter?: {
        validator?: Web3Address;
        staker?: Web3Address;
    }): Promise<IDelegatorOneOfEvent[]>;
    undelegateFrom(validator: Web3Address, amount: Web3Uint256): Promise<IPendingTx>;
    getStakingRewards(validator: Web3Address, delegator: Web3Address): Promise<Web3Uint256>;
    getMyClaimableStakingRewards(): Promise<IStakingRewards[]>;
    claimDelegatorFee(validator: Web3Address): Promise<IPendingTx>;
    getClaimableStakingRewards(delegator: Web3Address): Promise<IStakingRewards[]>;
    getMyStakingRewards(validator: Web3Address): Promise<Web3Uint256>;
    getMyActiveDelegations(): Promise<IDelegatorDelegation[]>;
    getActiveDelegations(address: Web3Address): Promise<IDelegatorDelegation[]>;
    getMyAvailableReDelegateAmount(): Promise<BigNumber>;
    getAvailableReDelegateAmount(address: Web3Address): Promise<BigNumber>;
    getValidatorRewards(validator: Web3Address): Promise<Web3Uint256>;
    getMyDelegatedAmount(validator: Web3Address): Promise<Web3Uint256>;
    releaseValidatorFromJail(validator: Web3Address): Promise<IPendingTx>;
    registerValidator(validator: Web3Address, commissionRate: number, initialStake: BigNumber | BigNumber.Value): Promise<IPendingTx>;
}
