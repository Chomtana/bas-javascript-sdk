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
exports.__esModule = true;
exports.sendTransactionAsync = exports.tryAddMetaMaskNetwork = exports.waitForExpectedNetworkOrThrow = void 0;
var web3_utils_1 = require("web3-utils");
var waitForExpectedNetworkOrThrow = function (web3, config) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!web3.givenProvider.request) {
                    throw new Error("Wallet doesn't support switching to the ".concat(config.chainName, " network, please switch it manually"));
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 6]);
                return [4 /*yield*/, web3.givenProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: (0, web3_utils_1.numberToHex)(config.chainId) }]
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 6];
            case 3:
                error_1 = _a.sent();
                console.error('FAILED TO ADD');
                console.error(error_1);
                if (!(error_1.code === 4902)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, exports.tryAddMetaMaskNetwork)(web3, config)];
            case 4:
                if (_a.sent()) {
                    return [2 /*return*/];
                }
                throw new Error("Network for ".concat(config.chainName, " is not configured in your MetaMask"));
            case 5: throw new Error("Unable to switch network to ".concat(config.chainName));
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.waitForExpectedNetworkOrThrow = waitForExpectedNetworkOrThrow;
var tryAddMetaMaskNetwork = function (web3, config) { return __awaiter(void 0, void 0, void 0, function () {
    var switchError_1, addError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Trying to switch MetaMask network to: ".concat(config.chainId));
                return [4 /*yield*/, web3.givenProvider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: (0, web3_utils_1.numberToHex)(config.chainId) }]
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                switchError_1 = _a.sent();
                if (switchError_1.code !== 4902) {
                    console.error(switchError_1);
                    return [2 /*return*/, false];
                }
                return [3 /*break*/, 3];
            case 3:
                _a.trys.push([3, 5, , 6]);
                console.log("Trying to add MetaMask network to: ".concat(config.chainId));
                return [4 /*yield*/, web3.givenProvider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: (0, web3_utils_1.numberToHex)(config.chainId),
                                chainName: config.chainName,
                                rpcUrls: [config.rpcUrl]
                            },
                        ]
                    })];
            case 4:
                _a.sent();
                return [2 /*return*/, true];
            case 5:
                addError_1 = _a.sent();
                console.error(addError_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, false];
        }
    });
}); };
exports.tryAddMetaMaskNetwork = tryAddMetaMaskNetwork;
var sendTransactionAsync = function (web3, sendOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var gasPrice, nonce, chainId, tx, gasEstimation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3.eth.getGasPrice()];
            case 1:
                gasPrice = _a.sent();
                console.log('Gas Price: ' + gasPrice);
                nonce = sendOptions.nonce;
                if (!!nonce) return [3 /*break*/, 3];
                return [4 /*yield*/, web3.eth.getTransactionCount(sendOptions.from)];
            case 2:
                nonce = _a.sent();
                _a.label = 3;
            case 3:
                console.log('Nonce: ' + nonce);
                return [4 /*yield*/, web3.eth.getChainId()];
            case 4:
                chainId = _a.sent();
                tx = {
                    from: sendOptions.from,
                    to: sendOptions.to,
                    value: (0, web3_utils_1.numberToHex)(sendOptions.value || '0'),
                    gas: (0, web3_utils_1.numberToHex)(sendOptions.gasLimit || '1000000'),
                    gasPrice: gasPrice,
                    data: sendOptions.data,
                    nonce: nonce,
                    chainId: chainId
                };
                return [4 /*yield*/, web3.eth.estimateGas(tx)];
            case 5:
                gasEstimation = _a.sent();
                console.log("Gas estimation is: ".concat(gasEstimation));
                if (sendOptions.gasLimit && Number(gasEstimation) > Number(sendOptions.gasLimit)) {
                    throw new Error("Gas estimation exceeds possible limit (".concat(Number(gasEstimation), " > ").concat(Number(sendOptions.gasLimit), ")"));
                }
                console.log('Sending transaction via Web3: ', tx);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var promise = web3.eth.sendTransaction(tx);
                        promise.once('transactionHash', function (transactionHash) { return __awaiter(void 0, void 0, void 0, function () {
                            var rawTx;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log("Just signed transaction has is: ".concat(transactionHash));
                                        return [4 /*yield*/, web3.eth.getTransaction(transactionHash)];
                                    case 1:
                                        rawTx = _a.sent();
                                        console.log("Found transaction in node: ", JSON.stringify(rawTx, null, 2));
                                        resolve({ transactionHash: transactionHash, receipt: promise });
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](reject);
                    })];
        }
    });
}); };
exports.sendTransactionAsync = sendTransactionAsync;
