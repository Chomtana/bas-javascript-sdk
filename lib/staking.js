"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Staking = void 0;
var types_1 = require("./types");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var utils_1 = require("./utils");
var Staking = /** @class */ (function () {
    function Staking(keyProvider) {
        this.keyProvider = keyProvider;
    }
    Staking.prototype.getAllValidatorsAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validatorAddedEvents, validatorRemovedEvents, validators, _i, _a, log, validator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.getPastEvents('ValidatorAdded', {
                            fromBlock: 'earliest',
                            toBlock: 'latest'
                        })];
                    case 1:
                        validatorAddedEvents = _b.sent();
                        return [4 /*yield*/, this.keyProvider.stakingContract.getPastEvents('ValidatorRemoved', {
                                fromBlock: 'earliest',
                                toBlock: 'latest'
                            })];
                    case 2:
                        validatorRemovedEvents = _b.sent();
                        validators = new Set();
                        for (_i = 0, _a = (0, utils_1.sortEventData)(validatorAddedEvents, validatorRemovedEvents); _i < _a.length; _i++) {
                            log = _a[_i];
                            validator = log.returnValues.validator;
                            if (log.event === 'ValidatorAdded') {
                                validators.add(validator);
                            }
                            else if (log.event === 'ValidatorRemoved') {
                                validators["delete"](validator);
                            }
                        }
                        return [2 /*return*/, Array.from(validators)];
                }
            });
        });
    };
    Staking.prototype.getAllValidators = function (epoch) {
        return __awaiter(this, void 0, void 0, function () {
            var validators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllValidatorsAddresses()];
                    case 1:
                        validators = _a.sent();
                        return [4 /*yield*/, this.loadValidatorsInfo(validators, epoch)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Staking.prototype.getTotalDelegatedAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, validator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = new bignumber_js_1["default"]('0');
                        _i = 0;
                        return [4 /*yield*/, this.getAllValidators()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        validator = _a[_i];
                        result = result.plus(new bignumber_js_1["default"](validator.totalDelegated));
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, result.dividedBy(Math.pow(10, 18))];
                }
            });
        });
    };
    Staking.prototype.getActiveDelegatedAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, _a, validator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = new bignumber_js_1["default"]('0');
                        _i = 0;
                        return [4 /*yield*/, this.getActiveValidators()];
                    case 1:
                        _a = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        validator = _a[_i];
                        result = result.plus(new bignumber_js_1["default"](validator.totalDelegated));
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, result.dividedBy(Math.pow(10, 18))];
                }
            });
        });
    };
    Staking.prototype.getDelegatorDelegatedAmount = function (delegator) {
        return __awaiter(this, void 0, void 0, function () {
            var delegations, unDelegations, result, _i, _a, e;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getDelegationHistory({ staker: delegator })];
                    case 1:
                        delegations = _b.sent();
                        return [4 /*yield*/, this.getUnDelegationHistory({ staker: delegator })];
                    case 2:
                        unDelegations = _b.sent();
                        result = new bignumber_js_1["default"]('0');
                        for (_i = 0, _a = (0, utils_1.sortHasEventData)(delegations, unDelegations); _i < _a.length; _i++) {
                            e = _a[_i];
                            if (e.event.event === 'Delegated') {
                                result = result.plus(e.amount);
                            }
                            else if (e.event.event === 'Undelegated') {
                                result = result.minus(e.amount);
                            }
                        }
                        return [2 /*return*/, result.dividedBy(Math.pow(10, 18))];
                }
            });
        });
    };
    Staking.prototype.getActiveValidatorsAddresses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.methods.getValidators().call()];
                    case 1:
                        result = _a.sent();
                        console.log("Active Validator Set: ".concat(result));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Staking.prototype.getActiveValidators = function (epoch) {
        return __awaiter(this, void 0, void 0, function () {
            var activeValidators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getActiveValidatorsAddresses()];
                    case 1:
                        activeValidators = _a.sent();
                        return [2 /*return*/, this.loadValidatorsInfo(activeValidators, epoch)];
                }
            });
        });
    };
    Staking.prototype.countValidators = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allValidators, activeValidators;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllValidatorsAddresses()];
                    case 1:
                        allValidators = _a.sent();
                        return [4 /*yield*/, this.getActiveValidatorsAddresses()];
                    case 2:
                        activeValidators = _a.sent();
                        return [2 /*return*/, { active: activeValidators.length, total: allValidators.length }];
                }
            });
        });
    };
    Staking.prototype.getValidatorHistory = function (validator, beforeEpoch, limit) {
        if (limit === void 0) { limit = 30; }
        return __awaiter(this, void 0, void 0, function () {
            var promises, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!beforeEpoch) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.keyProvider.getCurrentEpoch()];
                    case 1:
                        beforeEpoch = _a.sent();
                        _a.label = 2;
                    case 2:
                        promises = [];
                        for (i = beforeEpoch - limit; i <= beforeEpoch; i++) {
                            promises.push(this.loadValidatorInfo(validator, i));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Staking.prototype.loadValidatorsInfo = function (validators, epoch) {
        return __awaiter(this, void 0, void 0, function () {
            var result, totalDelegatedAmount;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!epoch) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.keyProvider.getCurrentEpoch()];
                    case 1:
                        epoch = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, Promise.all(validators.map(function (v) { return _this.loadValidatorInfo(v, epoch); }))];
                    case 3:
                        result = _a.sent();
                        totalDelegatedAmount = result.reduce(function (result, validator) { return result.plus(validator.totalDelegated); }, new bignumber_js_1["default"]('0'));
                        result = result.map(function (validator) {
                            return __assign(__assign({}, validator), { votingPower: new bignumber_js_1["default"](validator.totalDelegated).dividedBy(totalDelegatedAmount).multipliedBy(100).toNumber() });
                        });
                        return [2 /*return*/, result.sort(function (a, b) {
                                return new bignumber_js_1["default"](b.totalDelegated).comparedTo(new bignumber_js_1["default"](a.totalDelegated));
                            })];
                }
            });
        });
    };
    Staking.prototype.loadValidatorInfo = function (validator, epoch) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!epoch) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.keyProvider.stakingContract.methods.getValidatorStatusAtEpoch(validator, epoch).call()];
                    case 1:
                        status = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.keyProvider.stakingContract.methods.getValidatorStatus(validator).call()];
                    case 3:
                        status = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            validator: validator,
                            changedAt: status.changedAt,
                            claimedAt: status.claimedAt,
                            totalDelegated: status.totalDelegated,
                            votingPower: 0,
                            jailedBefore: status.jailedBefore,
                            owner: status.ownerAddress,
                            slashesCount: status.slashesCount,
                            status: status.status,
                            prettyStatus: types_1.VALIDATOR_STATUS_MAPPING[status.status] || 'UNKNOWN',
                            commissionRate: status.commissionRate,
                            totalRewards: status.totalRewards
                        }];
                }
            });
        });
    };
    Staking.prototype.delegateTo = function (validator, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.keyProvider.stakingContract.methods
                    .delegate(validator)
                    .encodeABI();
                return [2 /*return*/, this.keyProvider.sendTx({
                        to: this.keyProvider.stakingAddress,
                        value: amount,
                        data: data
                    })];
            });
        });
    };
    Staking.prototype.getDelegationHistory = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.getPastEvents('Delegated', {
                            fromBlock: 'earliest',
                            toBlock: 'latest',
                            filter: filter
                        })];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (event) {
                                var _a = event.returnValues, validator = _a.validator, staker = _a.staker, amount = _a.amount, epoch = _a.epoch;
                                return { event: event, validator: validator, staker: staker, amount: amount, epoch: epoch };
                            })];
                }
            });
        });
    };
    Staking.prototype.getUnDelegationHistory = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.getPastEvents('Undelegated', {
                            fromBlock: 'earliest',
                            toBlock: 'latest',
                            filter: filter
                        })];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (event) {
                                var _a = event.returnValues, validator = _a.validator, staker = _a.staker, amount = _a.amount, epoch = _a.epoch;
                                return { event: event, validator: validator, staker: staker, amount: amount, epoch: epoch };
                            })];
                }
            });
        });
    };
    Staking.prototype.getClaimHistory = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.getPastEvents('Claimed', {
                            fromBlock: 'earliest',
                            toBlock: 'latest',
                            filter: filter
                        })];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, events.map(function (event) {
                                var _a = event.returnValues, validator = _a.validator, staker = _a.staker, amount = _a.amount, epoch = _a.epoch;
                                return { event: event, validator: validator, staker: staker, amount: amount, epoch: epoch };
                            })];
                }
            });
        });
    };
    Staking.prototype.getAllEventsHistory = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, delegation, unDelegation, claim;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.getDelegationHistory(filter),
                            this.getUnDelegationHistory(filter),
                            this.getClaimHistory(filter),
                        ])];
                    case 1:
                        _a = _b.sent(), delegation = _a[0], unDelegation = _a[1], claim = _a[2];
                        return [2 /*return*/, (0, utils_1.sortHasEventData)(delegation, unDelegation, claim).map(function (item) {
                                var result = {};
                                if (item.event.event === 'Delegated') {
                                    result.delegation = item;
                                }
                                else if (item.event.event === 'Undelegated') {
                                    result.undelegation = item;
                                }
                                else if (item.event.event === 'Claimed') {
                                    result.claim = item;
                                }
                                return result;
                            })];
                }
            });
        });
    };
    Staking.prototype.undelegateFrom = function (validator, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.keyProvider.stakingContract.methods
                    .undelegate(validator, amount)
                    .encodeABI();
                return [2 /*return*/, this.keyProvider.sendTx({
                        to: this.keyProvider.stakingAddress,
                        data: data
                    })];
            });
        });
    };
    Staking.prototype.getStakingRewards = function (validator, delegator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keyProvider.stakingContract.methods.getDelegatorFee(validator, delegator).call()];
            });
        });
    };
    Staking.prototype.getMyClaimableStakingRewards = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getClaimableStakingRewards(this.keyProvider.getMyAddress())];
            });
        });
    };
    Staking.prototype.claimDelegatorFee = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.keyProvider.stakingContract.methods
                    .claimDelegatorFee(validator)
                    .encodeABI();
                return [2 /*return*/, this.keyProvider.sendTx({
                        to: this.keyProvider.stakingAddress,
                        data: data
                    })];
            });
        });
    };
    Staking.prototype.getClaimableStakingRewards = function (delegator) {
        return __awaiter(this, void 0, void 0, function () {
            var delegationHistory, result, totalDelegatedAmount, _i, delegationHistory_1, delegation, stakingRewards, _a, validator;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getDelegationHistory({ staker: delegator })];
                    case 1:
                        delegationHistory = _b.sent();
                        result = {};
                        return [4 /*yield*/, this.getActiveDelegatedAmount()];
                    case 2:
                        totalDelegatedAmount = _b.sent();
                        _i = 0, delegationHistory_1 = delegationHistory;
                        _b.label = 3;
                    case 3:
                        if (!(_i < delegationHistory_1.length)) return [3 /*break*/, 7];
                        delegation = delegationHistory_1[_i];
                        _a = bignumber_js_1["default"].bind;
                        return [4 /*yield*/, this.getStakingRewards(delegation.validator, delegator)];
                    case 4:
                        stakingRewards = new (_a.apply(bignumber_js_1["default"], [void 0, _b.sent()]))().dividedBy(1e18);
                        if (stakingRewards.isZero()) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, this.loadValidatorInfo(delegation.validator)];
                    case 5:
                        validator = _b.sent();
                        result[validator.validator] = { validator: validator, amount: stakingRewards };
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, Object.values(result)];
                }
            });
        });
    };
    Staking.prototype.getMyStakingRewards = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            var delegator;
            return __generator(this, function (_a) {
                delegator = this.keyProvider.accounts[0];
                return [2 /*return*/, this.keyProvider.stakingContract.methods.getDelegatorFee(validator, delegator).call()];
            });
        });
    };
    Staking.prototype.getMyActiveDelegations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getActiveDelegations(this.keyProvider.getMyAddress())];
            });
        });
    };
    Staking.prototype.getActiveDelegations = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var delegationHistory, unDelegationHistory, lastDelegations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDelegationHistory({
                            staker: address
                        })];
                    case 1:
                        delegationHistory = _a.sent();
                        return [4 /*yield*/, this.getUnDelegationHistory({
                                staker: address
                            })];
                    case 2:
                        unDelegationHistory = _a.sent();
                        lastDelegations = (0, utils_1.sortHasEventData)(delegationHistory, unDelegationHistory).reduce(function (result, item) {
                            var key = "".concat(item.validator);
                            if (!result[key]) {
                                result[key] = item;
                                return result;
                            }
                            if (item.event.event === 'Delegated') {
                                result[key].amount = new bignumber_js_1["default"](result[key].amount).plus(item.amount).toString(10);
                            }
                            else if (item.event.event === 'Undelegated') {
                                result[key].amount = new bignumber_js_1["default"](result[key].amount).minus(item.amount).toString(10);
                            }
                            return result;
                        }, {});
                        return [2 /*return*/, Object.values(lastDelegations)];
                }
            });
        });
    };
    Staking.prototype.getMyAvailableReDelegateAmount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getAvailableReDelegateAmount(this.keyProvider.getMyAddress())];
            });
        });
    };
    Staking.prototype.getAvailableReDelegateAmount = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new bignumber_js_1["default"]('0')];
            });
        });
    };
    Staking.prototype.getValidatorRewards = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keyProvider.stakingContract.methods.getValidatorFee(validator).call()];
            });
        });
    };
    Staking.prototype.getMyDelegatedAmount = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            var currentAccount, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentAccount = this.keyProvider.accounts[0];
                        return [4 /*yield*/, this.keyProvider.stakingContract.methods
                                .getValidatorDelegation(validator, currentAccount)
                                .call()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.delegatedAmount];
                }
            });
        });
    };
    Staking.prototype.releaseValidatorFromJail = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.keyProvider.stakingContract.methods
                    .releaseValidatorFromJail(validator)
                    .encodeABI();
                return [2 /*return*/, this.keyProvider.sendTx({
                        to: this.keyProvider.stakingAddress,
                        data: data
                    })];
            });
        });
    };
    Staking.prototype.registerValidator = function (validator, commissionRate, initialStake) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = this.keyProvider.stakingContract.methods
                    .registerValidator(validator, commissionRate * 100)
                    .encodeABI();
                return [2 /*return*/, this.keyProvider.sendTx({
                        to: this.keyProvider.stakingAddress,
                        value: new bignumber_js_1["default"](initialStake).multipliedBy(Math.pow(10, 18)).toString(10),
                        data: data
                    })];
            });
        });
    };
    return Staking;
}());
exports.Staking = Staking;
