import Web3 from "web3";
import { IPendingTx } from "./types";
export declare const waitForExpectedNetworkOrThrow: (web3: Web3, config: {
    chainId: number;
    chainName: string;
    rpcUrl: string;
}) => Promise<void>;
export declare const tryAddMetaMaskNetwork: (web3: Web3, config: {
    chainId: number;
    chainName: string;
    rpcUrl: string;
}) => Promise<boolean>;
export declare const sendTransactionAsync: (web3: Web3, sendOptions: {
    from: string;
    to: string;
    data?: string;
    gasLimit?: string;
    value?: string;
    nonce?: number;
}) => Promise<IPendingTx>;
