"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import ErrorCodes from './ErrorCodes'; 
const Exception_1 = __importDefault(require("./Exception"));
const Status_1 = __importDefault(require("./Status"));
const _window = window;
class WalletProvider {
    constructor(options = {}) {
        /**
         * default config
         */
        this.config = {
            providers: {
                "web3_wallets": {}
            },
            modalClass: "",
            modalTitle: "Select Wallet",
            cacheProvider: true,
            showLoader: true,
            debug: false
        };
        /**
         * providers
         */
        this.providerModules = {
            "web3_wallets": "EthereumProvider",
            "binance_chain_wallet": "BinanceChainProvider",
            "walletconnect": "WalletConnectProvider",
            "portis": "PortisProvider",
            "frame": "FrameProvider",
            "authereum": "AuthereumProvider",
            "walletlink": "WalletLinkProvider",
            "torus": "TorusProvider",
            "fortmatic": "FortmaticProvider"
        };
        //modal
        this.modalId = "__wallet__provider";
        //is modal visible
        this.isModalVisible = false;
        //provider cache name 
        this.providerCacheName = "__wallet_provider_cache";
        //selected provider 
        this.selectedProviderName = null;
        //  events
        this.eventNames = [
            "message",
            "modalOpen",
            "modalClose",
            "connect",
            "disconnect",
            "accountsChanged",
            "chainChanged",
            "error",
            "connectError"
        ];
        this.registeredEvents = {};
        if (typeof options != 'object') {
            throw new Exception_1.default("opts_must_be_object", "Options must be an object");
            return;
        }
        this.config = Object.assign(this.config, options);
        let hasWeb3 = _window.ethereum || _window.web3;
        if (!this.config.providers.hasOwnProperty("web_wallets") && hasWeb3) {
            this.config.providers = { ...{ web3_wallets: {} }, ...this.config.providers };
        }
        //lets make 
        _window._debug_wallet_provider = this.config.debug;
        //process and validate enabled providers 
        this.validateEnabledProviders();
        //inject modal
        this._injectModalMarkup();
        //check for provider cache
        if (this.config.cacheProvider && this.isProviderCached()) {
            let cachedProviderName = this.getProviderCache();
            this.selectedProviderName = cachedProviderName;
        }
    } //end fun 
    /**
     * hasProviderCache
     */
    isProviderCached() {
        let providerNameCache = this.getProviderCache();
        if (providerNameCache == null)
            return false;
        if (!this.providerModules.hasOwnProperty(providerNameCache))
            return false;
        return true;
    } //end fun 
    /**
     * getProviderCache
     * @return string
     */
    getProviderCache() {
        return _window.localStorage.getItem(this.providerCacheName) || null;
    } //end 
    /**
     * save provider name in cache
     * @param string the provider name
     */
    cacheProviderName(providerName) {
        _window.localStorage.setItem(this.providerCacheName, providerName);
    } //end fun 
    /**
     * removeProviderCache
     */
    removeProviderCache() {
        _window.localStorage.removeItem(this.providerCacheName);
        return true;
    }
    /**
     * process provider configs
     */
    validateEnabledProviders() {
        //let check enabled providers 
        let enabledProviders = this.config.providers;
        for (let provider of Object.keys(enabledProviders)) {
            if (!this.providerModules.hasOwnProperty(provider)) {
                let exception = new Exception_1.default("unknown_provider", `Unknown provider name ${provider}`);
                this.dispatchEvent("error", exception);
                throw exception;
            }
        }
    } //end fun
    /**
     * trigger  onError Event
     * @param string
     */
    dispatchEvent(eventName, data) {
        let eventCallback = this.registeredEvents[eventName] || null;
        if (typeof eventCallback == 'function') {
            eventCallback(data);
        }
    }
    /**
     * show the modal
     */
    async showModal() {
        if (!this.isModalVisible) {
            document.getElementById(this.modalId).classList.add("is_open");
            this.isModalVisible = true;
            this.dispatchEvent("modalOpen", this.modalId);
        }
        this.selectedProviderName = await this.handleProviderItemClick();
        this.handleDisableProviderItemClickEvent();
        return this.selectedProviderName;
    }
    /**
     * hide the modal
     */
    closeModal() {
        let el = document.getElementById(this.modalId);
        let c = el.classList;
        setTimeout(() => {
            c.remove("is_open");
            c.remove("m__closing");
        }, 4000);
        //add Zoomin anim
        c.add("m__closing");
        this.isModalVisible = false;
        this.dispatchEvent("modalClose", this.modalId);
    }
    /**
     * events
     * @param eventName
     */
    on(eventName, callback = () => { }) {
        if (!this.eventNames.includes(eventName)) {
            throw new Error(`Unknown Event ${eventName}`);
        }
        this.registeredEvents[eventName] = callback;
    } //end fun
    /**
     * modalMarkup
     */
    _injectModalMarkup() {
        let modalId = this.modalId;
        let providersMarkup = "";
        let loadedImgStyles = "";
        Object.keys(this.config.providers).forEach(async (provider) => {
            let enabledProviderInfo = this.config.providers[provider];
            let providerDescText = enabledProviderInfo.connect_text || "";
            let providerName = enabledProviderInfo.name || null;
            /*
            if(providerName == null){
                switch(provider){
                    case "walletconnect": providerName = "WalletConnect"; break;
                    case "walletlink": providerName = "WalletLink"; break;
                    default: providerName = provider.replace(/(\_)+/g," ");
                }
            }
            
            let supportedWallets =
            {
                "web3_wallets": ["MetaMask","Brave","Status"],
                "walletconnect":["Rainbow","Trust","Argent"],
                "walletlink": ["Coinbase Wallet"]
            }

            let walletsArray = supportedWallets[provider] || [];

            if(walletsArray.length > 0){
                
                providerDescText = '<div class="flex flex_row supported_wallets flex_wrap">';

                for(let wallet of walletsArray){
                    let walletImg = wallet.toLowerCase().replace(/\s+/g,"_")+"_16";
                    try{
                        
                        let subImgStyle = require("../assets/img/modules/"+walletImg).default;
                        
                        loadedImgStyles += subImgStyle;
                       
                        providerDescText += `<div class="flex flex_row">
                                                <div class="sub_icon ${walletImg}_icon"></div>
                                                <div>${wallet}</div>
                                            </div>`;
                    } catch(e){console.log(e)}
                }
                
                providerDescText += "</div>";
            } //end sub icons
            
           //let imgStyle = require("../assets/img/modules/"+provider).default;
        
           //loadedImgStyles += imgStyle;*/
            providersMarkup += `
                <a href="#" data-provider="${provider}" class="m__col provider_item_btn">
                    <div class="provider_item">
                        <div class="icon ${provider}_icon"></div>
                        <h1 class="title">${providerName}</h1>
                        <div class="provider_info">
                            ${providerDescText}
                        </div>
                    </div>
                </a>
            `;
        }); //end for loop
        let modalMarkup = `
            <div class="wallet_provider__wrapper">
                <div class="modal" id="${modalId}">
                    <div class="m__container">
                        <div class="m__body">
                            <header class="m__header">
                                <h2 class="m__title">
                                    ${this.config.modalTitle}
                                </h2>
                                <a type="button" class="m__close">
                                    &times
                                </a>
                            </header>
                            <main class="m__content">
                                <div class="m__row">
                                    ${providersMarkup}
                                </div>
                                <div class="spinner_overlay hide">
                                    <div class="spinner_w">
                                        <div class="spinner"></div>
                                    </div>
                               </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        `;
        //lets check if the class is created already
        let walletProviderLoaded = document.body.dataset.__wps_loaded || "0";
        if (walletProviderLoaded != "1") {
            // let mainStyle = require("../assets/styles/modules/main").default
            // let  modalStyle = require("../assets/styles/modules/modal").default
            //let styleData = `${mainStyle}${modalStyle}`;
            //var style = document.createElement('style');
            //style.innerHTML = `${styleData}${loadedImgStyles}`;
            //document.head.appendChild(style)
            document.body.dataset.__wps_loaded = "1";
        }
        let modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;
        document.body.appendChild(modalNode);
        //handle click to close
        modalNode.querySelector(".m__close").addEventListener("click", (e) => {
            e.preventDefault();
            this.closeModal();
        });
        /**
         * when clicked on the layer close it
         */
        if (!this.config.showLoader) {
            modalNode.querySelector(".modal").addEventListener("click", (e) => {
                if (e.target !== e.currentTarget)
                    return;
                this.closeModal();
            });
        }
    }
    /**
     * showLoader
     */
    showLoader() {
        if (!this.config.showLoader)
            return;
        let spo = document.querySelector(".spinner_overlay");
        spo.classList.remove('hide');
    }
    /**
     * hide the loader
     */
    hideLoader() {
        if (!this.config.showLoader)
            return;
        let spo = document.querySelector(".spinner_overlay");
        spo.classList.add('hide');
    }
    /**
     * handleProviderItemClick
     */
    async handleProviderItemClick() {
        let _this = this;
        return new Promise((resolve, reject) => {
            Array.from(document.querySelectorAll(".provider_item_btn")).forEach((el) => {
                //provider 
                let provider = el.dataset.provider || null;
                if (provider == null)
                    return false;
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    //return selected provider
                    resolve(provider);
                });
            });
        });
    }
    //disable click event
    handleDisableProviderItemClickEvent() {
        Array.from(document.querySelectorAll(".provider_item_btn")).forEach((el) => {
            el.removeEventListener("click", () => { });
        });
    }
    /**
     * connect
     */
    async connect() {
        if (this.selectedProviderName == null) {
            this.selectedProviderName = await this.showModal();
        }
        let resultStatus = await this._proccessConnect(this.selectedProviderName);
        this.selectedProviderName = null;
        this.closeModal();
        return resultStatus;
    } //end fun
    /**
     * _proccessConnect
     */
    async _proccessConnect(providerName) {
        let providerModule = await this.getProviderModule(providerName);
        //lets  add options
        let providerInfo = this.config.providers[providerName] || {};
        let providerInst = new providerModule();
        let defaultFun = () => { };
        //lets now register  some events 
        providerInst.onConnect(this.registeredEvents.connect || defaultFun);
        providerInst.onDisconnect(this.registeredEvents.disconnect || defaultFun);
        //providerInst.onPermissionRequest(this.registeredEvents.permissionRequest || defaultFun)
        providerInst.onError(this.registeredEvents.error || defaultFun);
        providerInst.onAccountsChanged(this.registeredEvents.accountChange || defaultFun);
        providerInst.onChainChanged(this.registeredEvents.chainChange || defaultFun);
        providerInst.onConnectError(this.registeredEvents.connectError || defaultFun);
        providerInst.onMessage(this.registeredEvents.message || defaultFun);
        try {
            //show the loader 
            this.showLoader();
            //initialize 
            await providerInst._initialize(providerInfo);
            let connectStatus = await providerInst.connect();
            this.hideLoader();
            //if success, and provider cache is enabled, lets cache the provider
            if (connectStatus.isError()) {
                return Promise.resolve(connectStatus);
            }
            let cacheProvider = this.config.cacheProvider || true;
            if (cacheProvider) {
                this.cacheProviderName(providerName);
            }
            return Promise.resolve(connectStatus);
        }
        catch (e) {
            if (this.config.debug) {
                console.log("Connect Error", e, e.stack);
            }
            return Status_1.default.error(e.message || "connect_failed");
        }
        finally {
            this.closeModal();
            this.hideLoader();
        }
    } //end fun
    /**
     * getProviderModule
     */
    async getProviderModule(providerName) {
        let providerModule = this.providerModules[providerName] || null;
        if (providerModule == null) {
            let err = new Exception_1.default("unknown_provider", `Unknown provider name ${providerName}`);
            throw err;
        }
        let module = await Promise.resolve().then(() => __importStar(require(`../providers/${providerModule}`)));
        return module.default;
    } //end
} //end class
exports.default = WalletProvider;
