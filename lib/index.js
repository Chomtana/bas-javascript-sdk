"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
exports.__esModule = true;
exports.BasSdk = void 0;
var governance_1 = require("./governance");
var provider_1 = require("./provider");
var staking_1 = require("./staking");
var runtime_1 = require("./runtime");
__exportStar(require("./config"), exports);
__exportStar(require("./governance"), exports);
__exportStar(require("./metamask"), exports);
__exportStar(require("./provider"), exports);
__exportStar(require("./staking"), exports);
__exportStar(require("./types"), exports);
var BasSdk = /** @class */ (function () {
    function BasSdk(config) {
        this.config = config;
    }
    BasSdk.prototype.isConnected = function () {
        if (!this.keyProvider)
            return false;
        return this.keyProvider.isConnected();
    };
    BasSdk.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyProvider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyProvider = new provider_1.KeyProvider(this.config);
                        // connect web3
                        return [4 /*yield*/, keyProvider.connectFromInjected()
                            // init providers
                        ];
                    case 1:
                        // connect web3
                        _a.sent();
                        // init providers
                        this.keyProvider = keyProvider;
                        this.staking = new staking_1.Staking(keyProvider);
                        this.runtimeUpgrade = new runtime_1.RuntimeUpgrade(keyProvider);
                        this.governance = new governance_1.Governance(keyProvider);
                        return [2 /*return*/];
                }
            });
        });
    };
    BasSdk.prototype.getKeyProvider = function () {
        return this.keyProvider;
    };
    BasSdk.prototype.getStaking = function () {
        return this.staking;
    };
    BasSdk.prototype.getRuntimeUpgrade = function () {
        return this.runtimeUpgrade;
    };
    BasSdk.prototype.getGovernance = function () {
        return this.governance;
    };
    BasSdk.prototype.getChainConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keyProvider.getChainConfig()];
            });
        });
    };
    BasSdk.prototype.getChainParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.keyProvider.getChainParams()];
            });
        });
    };
    BasSdk.prototype.transferToChapel = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return BasSdk;
}());
exports.BasSdk = BasSdk;
