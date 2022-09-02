"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.KeyProvider = void 0;
var web3_1 = __importDefault(require("web3"));
var metamask_1 = require("./metamask");
var detect_provider_1 = __importDefault(require("@metamask/detect-provider"));
var pretty_time_1 = __importDefault(require("pretty-time"));
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var web3_utils_1 = require("web3-utils");
var STAKING_ABI = require('../src/abi/Staking.json');
var SLASHING_INDICATOR_ABI = require('../src/abi/SlashingIndicator.json');
var SYSTEM_REWARD_ABI = require('../src/abi/SystemReward.json');
var STAKING_POOL_ABI = require('../src/abi/StakingPool.json');
var GOVERNANCE_ABI = require('../src/abi/Governance.json');
var CHAIN_CONFIG_ABI = require('../src/abi/ChainConfig.json');
var RUNTIME_UPGRADE_ABI = require('../src/abi/RuntimeUpgrade.json');
var DEPLOYER_PROXY_ABI = require('../src/abi/DeployerProxy.json');
var RELAY_HUB_ABI = require('../src/abi/RelayHub.json');
var CROSS_CHAIN_BRIDGE_ABI = require('../src/abi/CrossChainBridge.json');
var KeyProvider = /** @class */ (function () {
    function KeyProvider(config) {
        this.config = config;
    }
    KeyProvider.prototype.isConnected = function () {
        return !!this.web3;
    };
    KeyProvider.prototype.connect = function (web3) {
        return __awaiter(this, void 0, void 0, function () {
            var remoteChainId, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, web3.eth.getChainId()];
                    case 1:
                        remoteChainId = _b.sent();
                        if (!(remoteChainId != this.config.chainId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, metamask_1.waitForExpectedNetworkOrThrow)(web3, this.config)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        // init web3 state
                        _a = this;
                        return [4 /*yield*/, this.unlockAccounts(web3)];
                    case 4:
                        // init web3 state
                        _a.accounts = _b.sent();
                        this.web3 = web3;
                        // init system smart contracts
                        // addresses
                        this.stakingAddress = this.config.stakingAddress;
                        this.slashingIndicatorAddress = this.config.slashingIndicatorAddress;
                        this.systemRewardAddress = this.config.systemRewardAddress;
                        this.stakingPoolAddress = this.config.stakingPoolAddress;
                        this.governanceAddress = this.config.governanceAddress;
                        this.chainConfigAddress = this.config.chainConfigAddress;
                        this.runtimeUpgradeAddress = this.config.runtimeUpgradeAddress;
                        this.deployerProxyAddress = this.config.deployerProxyAddress;
                        // contracts
                        this.stakingContract = new web3.eth.Contract(STAKING_ABI, this.config.stakingAddress);
                        this.slashingIndicatorContract = new web3.eth.Contract(SLASHING_INDICATOR_ABI, this.config.slashingIndicatorAddress);
                        this.systemRewardContract = new web3.eth.Contract(SYSTEM_REWARD_ABI, this.config.systemRewardAddress);
                        this.stakingPoolContract = new web3.eth.Contract(STAKING_POOL_ABI, this.config.stakingPoolAddress);
                        this.governanceContract = new web3.eth.Contract(GOVERNANCE_ABI, this.config.governanceAddress);
                        this.chainConfigContract = new web3.eth.Contract(CHAIN_CONFIG_ABI, this.config.chainConfigAddress);
                        this.runtimeUpgradeContract = new web3.eth.Contract(RUNTIME_UPGRADE_ABI, this.config.runtimeUpgradeAddress);
                        this.deployerProxyContract = new web3.eth.Contract(DEPLOYER_PROXY_ABI, this.config.deployerProxyAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    KeyProvider.prototype.switchNetworkTo = function (chainId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.web3.givenProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: (0, web3_utils_1.numberToHex)(chainId) }]
                    })];
            });
        });
    };
    KeyProvider.prototype.connectFromInjected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, web3, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, detect_provider_1["default"])()];
                    case 1:
                        provider = _a.sent();
                        if (!provider)
                            throw new Error("There is no injected provider");
                        web3 = new web3_1["default"](provider);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, web3.eth.requestAccounts()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        throw new Error("Can't request provider's account");
                    case 5: return [2 /*return*/, this.connect(web3)];
                }
            });
        });
    };
    KeyProvider.prototype.unlockAccounts = function (web3) {
        return __awaiter(this, void 0, void 0, function () {
            var unlockedAccounts, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        unlockedAccounts = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, web3.eth.requestAccounts()];
                    case 2:
                        unlockedAccounts = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        throw new Error('User denied access to account');
                    case 4:
                        console.log("Unlocked accounts: ".concat(unlockedAccounts));
                        if (!unlockedAccounts.length || !unlockedAccounts[0]) {
                            throw new Error('Unable to detect unlocked MetaMask account');
                        }
                        return [2 /*return*/, unlockedAccounts];
                }
            });
        });
    };
    KeyProvider.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.web3 = undefined;
                this.accounts = undefined;
                return [2 /*return*/];
            });
        });
    };
    KeyProvider.prototype.getAccounts = function () {
        return this.accounts || [];
    };
    KeyProvider.prototype.getMyAddress = function () {
        var account = (this.accounts || [])[0];
        return account;
    };
    KeyProvider.prototype.getMyBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var myAddress;
            return __generator(this, function (_a) {
                myAddress = this.getMyAddress();
                return [2 /*return*/, this.web3.eth.getBalance(myAddress)];
            });
        });
    };
    KeyProvider.prototype.getBlockNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.web3.eth.getBlockNumber()];
            });
        });
    };
    KeyProvider.prototype.getChainConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, activeValidatorsLength, epochBlockInterval, misdemeanorThreshold, felonyThreshold, validatorJailEpochLength, undelegatePeriod, minValidatorStakeAmount, minStakingAmount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.chainConfigContract.methods.getActiveValidatorsLength().call(),
                            this.chainConfigContract.methods.getEpochBlockInterval().call(),
                            this.chainConfigContract.methods.getMisdemeanorThreshold().call(),
                            this.chainConfigContract.methods.getFelonyThreshold().call(),
                            this.chainConfigContract.methods.getValidatorJailEpochLength().call(),
                            this.chainConfigContract.methods.getUndelegatePeriod().call(),
                            this.chainConfigContract.methods.getMinValidatorStakeAmount().call(),
                            this.chainConfigContract.methods.getMinStakingAmount().call(),
                        ])];
                    case 1:
                        _a = _b.sent(), activeValidatorsLength = _a[0], epochBlockInterval = _a[1], misdemeanorThreshold = _a[2], felonyThreshold = _a[3], validatorJailEpochLength = _a[4], undelegatePeriod = _a[5], minValidatorStakeAmount = _a[6], minStakingAmount = _a[7];
                        return [2 /*return*/, {
                                activeValidatorsLength: activeValidatorsLength,
                                epochBlockInterval: epochBlockInterval,
                                misdemeanorThreshold: misdemeanorThreshold,
                                felonyThreshold: felonyThreshold,
                                validatorJailEpochLength: validatorJailEpochLength,
                                undelegatePeriod: undelegatePeriod,
                                minValidatorStakeAmount: new bignumber_js_1["default"](minValidatorStakeAmount).dividedBy(Math.pow(10, 18)),
                                minStakingAmount: new bignumber_js_1["default"](minStakingAmount).dividedBy(Math.pow(10, 18))
                            }];
                }
            });
        });
    };
    KeyProvider.prototype.getChainParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber, epochBlockInterval, startBlock, endBlock, blockTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBlockNumber()];
                    case 1:
                        blockNumber = _a.sent();
                        return [4 /*yield*/, this.chainConfigContract.methods.getEpochBlockInterval().call()];
                    case 2:
                        epochBlockInterval = _a.sent();
                        startBlock = ((blockNumber / epochBlockInterval) | 0) * epochBlockInterval, endBlock = startBlock + Number(epochBlockInterval);
                        blockTime = 3;
                        return [2 /*return*/, {
                                blockNumber: blockNumber,
                                epoch: (blockNumber / epochBlockInterval) | 0,
                                nextEpochIn: (0, pretty_time_1["default"])((endBlock - blockNumber) * blockTime * 1000 * 1000 * 1000, 's'),
                                nextEpochBlock: endBlock,
                                blockTime: blockTime
                            }];
                }
            });
        });
    };
    KeyProvider.prototype.getCurrentEpoch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chainParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getChainParams()];
                    case 1:
                        chainParams = _a.sent();
                        return [2 /*return*/, chainParams.epoch];
                }
            });
        });
    };
    KeyProvider.prototype.sendTx = function (sendOptions) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, metamask_1.sendTransactionAsync)(this.web3, {
                            from: this.accounts[0],
                            to: sendOptions.to,
                            value: sendOptions.value,
                            data: sendOptions.data
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return KeyProvider;
}());
exports.KeyProvider = KeyProvider;
