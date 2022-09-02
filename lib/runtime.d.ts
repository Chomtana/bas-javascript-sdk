import { KeyProvider } from "./provider";
import { IPendingTx, Web3Address } from "./types";
export declare class RuntimeUpgrade {
    private readonly keyProvider;
    constructor(keyProvider: KeyProvider);
    upgradeRuntime(contract: Web3Address, byteCode: string, applyFunction?: string): Promise<IPendingTx>;
}
