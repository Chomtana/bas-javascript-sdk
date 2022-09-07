import { Web3Address } from "./types";
export interface IExplorerConfig {
    homePage: string;
    txUrl: string;
    addressUrl: string;
    blockUrl: string;
}
export interface IConfig {
    chainId: number;
    chainName: string;
    rpcUrl: string;
    explorerConfig?: IExplorerConfig;
    stakingAddress: Web3Address;
    slashingIndicatorAddress: Web3Address;
    systemRewardAddress: Web3Address;
    stakingPoolAddress: Web3Address;
    governanceAddress: Web3Address;
    chainConfigAddress: Web3Address;
    runtimeUpgradeAddress: Web3Address;
    deployerProxyAddress: Web3Address;
    relayHubAddress?: Web3Address;
    crossChainBridgeAddress?: Web3Address;
    kdiTokenAddress?: Web3Address;
    kdiMasterChefAddress?: Web3Address;
}
