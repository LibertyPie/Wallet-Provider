"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = __importDefault(require("../classes/ErrorCodes"));
const Status_1 = __importDefault(require("../classes/Status"));
const ProviderEventRegistry_1 = __importDefault(require("../classes/ProviderEventRegistry"));
const Exception_1 = __importDefault(require("../classes/Exception"));
const Utils_1 = __importDefault(require("../classes/Utils"));
class Web3Standard extends ProviderEventRegistry_1.default {
    constructor() {
        super();
        this._provider = null;
        this.chainId = null;
        /**
         * isOnconnectEventTriggered
         * This will track if onconnect event was called or not, because on page
         * reopen, we will need to retrigger the event
         * this will prevent multiple events
         */
        this.isOnconnectEventTriggered = false;
        this._accounts = [];
        this._providerPackage = null;
    } //end fun
    /**
     * _initialize
     */
    async _initialize(providerInfo) {
        throw new Error("Kindly set the provider from the provider's class");
    }
    /**
     * set up provider
     * @param any provider
     * @param any package Instance
     */
    async setProvider(provider, pkgInstance = null) {
        this._provider = provider;
        this._providerPackage = pkgInstance;
        if (typeof this._provider == 'undefined') {
            throw new Exception_1.default("undefined_provider", "Provider is required");
        }
        this._provider.autoRefreshOnNetworkChange = false;
        if (pkgInstance != null) {
            this._provider.__proto__.providerPackage = pkgInstance;
        }
        this.handlerEventLiteners();
    } //end fun
    /**
     * handleEventListeners
     */
    handlerEventLiteners() {
        //on connect
        this._provider.on('connect', async (chainIdObj) => {
            if (!this.isOnconnectEventTriggered) {
                let accounts = await this.getAccounts();
                this._onConnectCallback({
                    chainId: chainIdObj.chainId,
                    account: accounts[0],
                    provider: this._provider
                });
            }
            this.isOnconnectEventTriggered = true;
        });
        /**
         * disconnect
         */
        this._provider.on('disconnect', (err) => {
            this._onDisconnectCallback(err);
        });
        this._provider.on('error', (error) => {
            this._onErrorCallback(error);
        });
        this._provider.on('chainChanged', async (chainId) => {
            this._accounts = await this.getAccounts();
            this._onChainChangedCallback(chainId);
        });
        this._provider.on('accountsChanged', async (accounts) => {
            this._accounts = accounts;
            this._onAccountsChangedCallback(accounts);
        });
        this._provider.on('message', (message) => {
            this._onMessageCallback(message);
        });
    }
    /**
     * wether the provider is supported in the browser
     */
    isSupported() {
        return (typeof this._provider !== 'undefined');
    }
    /**
     * connect
     */
    async connect() {
        if (!this.isSupported()) {
            return Status_1.default.error("wallet_not_found")
                .setCode(ErrorCodes_1.default.wallet_not_found);
        }
        //lets request access 
        try {
            let accounts;
            if (typeof this._provider["enable"] == "function") {
                this._accounts = await this._provider.enable();
            }
            else {
                this._accounts = await this.getAccounts();
            }
            let account = this._accounts[0];
            let resultObj = {
                account,
                chainId: await this.getChainId(),
                provider: this._provider
            };
            console.log(resultObj);
            if (!this.isOnconnectEventTriggered) {
                this._onConnectCallback(resultObj);
                this.isOnconnectEventTriggered = true;
            }
            return Status_1.default.successPromise("", resultObj);
        }
        catch (e) {
            this._onConnectErrorCallback(e);
            return Promise.resolve(Status_1.default.error(e.message).setCode(e.code));
        }
    }
    /**
     * getChainId
     */
    async getChainId() {
        this.chainId = await Utils_1.default.getChainIdByRequest(this);
        return this.chainId;
    }
    /**
     * getAccounts
     */
    async getAccounts() {
        return new Promise((resolve, reject) => {
            this._provider.sendAsync({
                method: 'eth_requestAccounts'
            }, (error, data) => {
                console.log(data);
                if (error != null) {
                    this._onErrorCallback(error);
                    Utils_1.default.logError(error);
                    return reject(error);
                }
                resolve(data.result);
            });
        });
    } //end fun 
    /**
     * isConnected
     */
    isConnected() {
        return this._provider.connected || this._provider.isConnected();
    }
    /**
     * disconnect
     * @param callback
     */
    async disconnect() {
        this._provider.disconnect();
        this._onDisconnectCallback();
        return Status_1.default.successPromise("");
    }
    /**
     * onConnect
     */
    onConnect(callback = () => { }) {
        this._onConnectCallback = callback;
    }
    /**
     * getProvider
     */
    getProvider() {
        return this._provider;
    }
}
exports.default = Web3Standard;
