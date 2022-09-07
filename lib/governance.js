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
exports.Governance = exports.ProposalBuilder = void 0;
var types_1 = require("./types");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var web3_utils_1 = require("web3-utils");
var utils_1 = require("./utils");
var web3_1 = __importDefault(require("web3"));
var ProposalBuilder = /** @class */ (function () {
    function ProposalBuilder(keyProvider) {
        this.keyProvider = keyProvider;
        this.actions = [];
    }
    ProposalBuilder.prototype.setDescription = function (description) {
        this.description = description;
        return this;
    };
    ProposalBuilder.prototype.setVotingPeriod = function (votingPeriod) {
        this.votingPeriod = votingPeriod;
        return this;
    };
    ProposalBuilder.prototype.addDeployer = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeployer, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.deployerProxyContract.methods.isDeployer(account).call()];
                    case 1:
                        isDeployer = _a.sent();
                        if (isDeployer) {
                            throw new Error("Account ".concat(account, " is already a deployer"));
                        }
                        inputData = this.keyProvider.deployerProxyContract.methods.addDeployer(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.deployerProxyAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.removeDeployer = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isDeployer, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.deployerProxyContract.methods.isDeployer(account).call()];
                    case 1:
                        isDeployer = _a.sent();
                        if (!isDeployer) {
                            throw new Error("Account ".concat(account, " is not a deployer"));
                        }
                        inputData = this.keyProvider.deployerProxyContract.methods.removeDeployer(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.deployerProxyAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.addValidator = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidator, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.methods.isValidator(account).call()];
                    case 1:
                        isValidator = _a.sent();
                        if (isValidator) {
                            throw new Error("Account ".concat(account, " is already a validator"));
                        }
                        inputData = this.keyProvider.stakingContract.methods.addValidator(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.stakingAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.removeValidator = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidator, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.methods.isValidator(account).call()];
                    case 1:
                        isValidator = _a.sent();
                        if (!isValidator) {
                            throw new Error("Account ".concat(account, " is not a validator"));
                        }
                        inputData = this.keyProvider.stakingContract.methods.removeValidator(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.stakingAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.activateValidator = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidator, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.methods.isValidator(account).call()];
                    case 1:
                        isValidator = _a.sent();
                        if (!isValidator) {
                            throw new Error("Account ".concat(account, " is not a validator"));
                        }
                        inputData = this.keyProvider.stakingContract.methods.activateValidator(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.stakingAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.disableValidator = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var isValidator, inputData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.stakingContract.methods.isValidator(account).call()];
                    case 1:
                        isValidator = _a.sent();
                        if (!isValidator) {
                            throw new Error("Account ".concat(account, " is not a validator"));
                        }
                        inputData = this.keyProvider.stakingContract.methods.disableValidator(account).encodeABI();
                        this.actions.push({
                            target: this.keyProvider.stakingAddress,
                            inputData: inputData,
                            value: '0x00'
                        });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    ProposalBuilder.prototype.updateEmissionRate = function (ratePerSecond) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.kdiMasterChefContract.methods.updateEmissionRate(web3_1["default"].utils.toWei(ratePerSecond.toString())).encodeABI();
                this.actions.push({
                    target: this.keyProvider.kdiMasterChefAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    ProposalBuilder.prototype.updateMasterChefOwner = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.kdiMasterChefContract.methods.transferOwnership(account).encodeABI();
                this.actions.push({
                    target: this.keyProvider.kdiMasterChefAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    ProposalBuilder.prototype.setMinStaking = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.chainConfigContract.methods.setMinStakingAmount(web3_1["default"].utils.toWei(amount.toString())).encodeABI();
                this.actions.push({
                    target: this.keyProvider.chainConfigAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    ProposalBuilder.prototype.setMinRegisterValidator = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.chainConfigContract.methods.setMinValidatorStakeAmount(web3_1["default"].utils.toWei(amount.toString())).encodeABI();
                this.actions.push({
                    target: this.keyProvider.chainConfigAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    ProposalBuilder.prototype.setActiveValidatorLength = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.chainConfigContract.methods.setActiveValidatorsLength(web3_1["default"].utils.toWei(amount.toString())).encodeABI();
                this.actions.push({
                    target: this.keyProvider.chainConfigAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    ProposalBuilder.prototype.upgradeRuntime = function (systemContract, byteCode) {
        return __awaiter(this, void 0, void 0, function () {
            var inputData;
            return __generator(this, function (_a) {
                inputData = this.keyProvider.runtimeUpgradeContract.methods.upgradeSystemSmartContract(systemContract, byteCode).encodeABI();
                this.actions.push({
                    target: this.keyProvider.runtimeUpgradeAddress,
                    inputData: inputData,
                    value: '0x00'
                });
                return [2 /*return*/, this];
            });
        });
    };
    return ProposalBuilder;
}());
exports.ProposalBuilder = ProposalBuilder;
var Governance = /** @class */ (function () {
    function Governance(keyProvider) {
        this.keyProvider = keyProvider;
    }
    Governance.prototype.getVotingPowers = function (validators) {
        return __awaiter(this, void 0, void 0, function () {
            var result, votingSupply, _i, validators_1, validator, votingPower;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4 /*yield*/, this.keyProvider.governanceContract.methods.getVotingSupply().call()];
                    case 1:
                        votingSupply = _a.sent();
                        _i = 0, validators_1 = validators;
                        _a.label = 2;
                    case 2:
                        if (!(_i < validators_1.length)) return [3 /*break*/, 5];
                        validator = validators_1[_i];
                        return [4 /*yield*/, this.keyProvider.governanceContract.methods.getVotingPower(validator).call()];
                    case 3:
                        votingPower = _a.sent();
                        result[validator] = {
                            votingSupply: new bignumber_js_1["default"](votingSupply).dividedBy(Math.pow(10, 18)).toNumber(),
                            votingPower: new bignumber_js_1["default"](votingPower).dividedBy(Math.pow(10, 18)).toNumber()
                        };
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Governance.prototype.getProposals = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var events, result, castVotes, _a, _b, proposalVotes, _i, castVotes_1, vote, _c, proposalId, reason, support, voter, weight, voteType, _d, events_1, _e, blockNumber, returnValues, state, quorumRequired, bigQuorum, bigPower, voteDistribution, _f, _g, vote;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.keyProvider.governanceContract.getPastEvents('ProposalCreated', options)];
                    case 1:
                        events = _h.sent(), result = [];
                        _a = utils_1.sortEventData;
                        return [4 /*yield*/, this.keyProvider.governanceContract.getPastEvents('VoteCast', options)];
                    case 2:
                        _b = [_h.sent()];
                        return [4 /*yield*/, this.keyProvider.governanceContract.getPastEvents('VoteCastWithParams', options)];
                    case 3:
                        castVotes = _a.apply(void 0, _b.concat([_h.sent()]));
                        proposalVotes = {};
                        for (_i = 0, castVotes_1 = castVotes; _i < castVotes_1.length; _i++) {
                            vote = castVotes_1[_i];
                            _c = vote.returnValues, proposalId = _c.proposalId, reason = _c.reason, support = _c.support, voter = _c.voter, weight = _c.weight;
                            if (!proposalVotes[proposalId])
                                proposalVotes[proposalId] = [];
                            voteType = 'ABSTAIN';
                            if (support === '0') {
                                voteType = 'AGAINST';
                            }
                            else if (support === '1') {
                                voteType = 'FOR';
                            }
                            proposalVotes[proposalId].push({
                                type: voteType,
                                blockNumber: vote.blockNumber,
                                reason: reason,
                                voterAddress: voter,
                                weight: new bignumber_js_1["default"](weight).dividedBy(Math.pow(10, 18)),
                                transactionHash: vote.transactionHash
                            });
                        }
                        _d = 0, events_1 = events;
                        _h.label = 4;
                    case 4:
                        if (!(_d < events_1.length)) return [3 /*break*/, 8];
                        _e = events_1[_d], blockNumber = _e.blockNumber, returnValues = _e.returnValues;
                        return [4 /*yield*/, this.keyProvider.governanceContract.methods.state(returnValues.proposalId).call()];
                    case 5:
                        state = _h.sent();
                        return [4 /*yield*/, this.keyProvider.governanceContract.methods
                                .quorum(blockNumber)
                                .call()];
                    case 6:
                        quorumRequired = _h.sent();
                        bigQuorum = new bignumber_js_1["default"](quorumRequired).dividedBy(Math.pow(10, 18));
                        bigPower = bigQuorum.multipliedBy(3).dividedBy(2);
                        voteDistribution = {
                            'AGAINST': new bignumber_js_1["default"]('0'),
                            'FOR': new bignumber_js_1["default"]('0'),
                            'ABSTAIN': new bignumber_js_1["default"]('0')
                        };
                        for (_f = 0, _g = proposalVotes[returnValues.proposalId] || []; _f < _g.length; _f++) {
                            vote = _g[_f];
                            if (!voteDistribution[vote.type]) {
                                continue;
                            }
                            voteDistribution[vote.type] = voteDistribution[vote.type].plus(vote.weight);
                        }
                        result.push({
                            id: returnValues.proposalId,
                            // @ts-ignore
                            status: types_1.TGovernanceProposalStatus[Number(state)],
                            proposer: returnValues.proposer,
                            targets: returnValues.targets,
                            values: returnValues.values,
                            signatures: returnValues.signatures,
                            inputs: returnValues.calldatas,
                            startBlock: returnValues.startBlock,
                            endBlock: returnValues.endBlock,
                            desc: returnValues.description,
                            votes: proposalVotes[returnValues.proposalId] || [],
                            quorumRequired: bigQuorum,
                            totalPower: bigPower,
                            voteDistribution: voteDistribution
                        });
                        _h.label = 7;
                    case 7:
                        _d++;
                        return [3 /*break*/, 4];
                    case 8:
                        console.log(JSON.stringify(result, null, 2));
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Governance.prototype.createProposal = function (description, votingPeriod) {
        var builder = new ProposalBuilder(this.keyProvider);
        if (description) {
            builder.setDescription(description);
        }
        if (votingPeriod) {
            builder.setVotingPeriod(votingPeriod);
        }
        return builder;
    };
    Governance.prototype.sendProposal = function (builder) {
        return __awaiter(this, void 0, void 0, function () {
            var targets, inputs, values, data;
            return __generator(this, function (_a) {
                targets = builder.actions.map(function (a) { return a.target; }), inputs = builder.actions.map(function (a) { return a.inputData; }), values = builder.actions.map(function (a) { return a.value; });
                if (builder.votingPeriod) {
                    data = this.keyProvider.governanceContract.methods.proposeWithCustomVotingPeriod(targets, values, inputs, builder.description, builder.votingPeriod).encodeABI();
                }
                else {
                    data = this.keyProvider.governanceContract.methods.propose(targets, values, inputs, builder.description).encodeABI();
                }
                return [2 /*return*/, this.keyProvider.sendTx({ to: this.keyProvider.governanceAddress, data: data })];
            });
        });
    };
    Governance.prototype.voteForProposal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.keyProvider.governanceContract.methods
                            .castVote(id, '1')
                            .encodeABI();
                        return [4 /*yield*/, this.keyProvider.sendTx({
                                to: this.keyProvider.governanceAddress,
                                data: data
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Governance.prototype.voteAgainstProposal = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.keyProvider.governanceContract.methods
                            .castVote(id, '0')
                            .encodeABI();
                        return [4 /*yield*/, this.keyProvider.sendTx({
                                to: this.keyProvider.governanceAddress,
                                data: data
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Governance.prototype.executeProposal = function (proposal) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.keyProvider.governanceContract.methods
                            .execute(proposal.targets, proposal.values, proposal.inputs, (0, web3_utils_1.keccak256)(proposal.desc))
                            .encodeABI();
                        return [4 /*yield*/, this.keyProvider.sendTx({
                                to: this.keyProvider.governanceAddress,
                                data: data
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Governance;
}());
exports.Governance = Governance;
