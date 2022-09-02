import { EventData } from "web3-eth-contract";
export declare const sortEventData: <T extends EventData>(a: T[], b?: T[], c?: T[]) => T[];
interface IHasEventData {
    event?: EventData;
}
export declare const sortHasEventData: <T extends IHasEventData>(a: T[], b?: T[], c?: T[]) => T[];
export {};
