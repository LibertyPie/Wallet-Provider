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
var micromodal_1 = __importDefault(require("micromodal"));
var main_css_1 = __importDefault(require("./assets/styles/main.css"));
var WalletProvider = /** @class */ (function () {
    function WalletProvider(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        /**
         * default config
         */
        this.config = {
            providers: ["ethereum_provider"],
            modalClass: "",
            modalTitle: "Select Provider"
        };
        //modal
        this.modalId = "";
        //is modal visible
        this.isModalVisible = false;
        //  events
        this.eventNames = ["modalOpen", "modalClose", "connect", "disconnect"];
        this.registeredEvents = {};
        if (typeof options != 'object') {
            throw new Error("options_must_be_object");
        }
        this.config = Object.assign(this.config, options);
        if (!this.config.providers.includes("ethereum_provider")) {
            this.config.providers.push("ethereum_provider");
        }
        this.modalId = "wallet__provider";
        //lets insert the markup
        this._injectModalMarkup(this.modalId);
        micromodal_1.default.init({
            onShow: function (modal) { return _this._onModalShow(modal); },
            onClose: function (modal) { return _this._onModalClose(modal); },
            //openTrigger: 'data-wallet-provider-open', 
            //closeTrigger: 'data-wallet-provider-close', 
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: false,
            awaitCloseAnimation: false,
        });
    }
    /**
     * show, shows the
     * @param modal
     */
    /**
     * on Modal show event
     */
    WalletProvider.prototype._onModalShow = function (modal) {
        this.isModalVisible = true;
        var eventCallback = this.registeredEvents.onModalOpen || null;
        if (typeof eventCallback == 'function') {
            eventCallback(modal);
        }
    };
    /**
     * on modal close  event
     * @param any
     */
    WalletProvider.prototype._onModalClose = function (modal) {
        this.isModalVisible = false;
        var eventCallback = this.registeredEvents.onModalClose || null;
        if (typeof eventCallback == 'function') {
            eventCallback(modal);
        }
    };
    /**
     * showModal
     */
    WalletProvider.prototype.showModal = function () {
        micromodal_1.default.show(this.modalId);
    };
    WalletProvider.prototype.hideModal = function () {
        micromodal_1.default.close(this.modalId);
    };
    /**
     * events
     * @param eventName
     */
    WalletProvider.prototype.on = function (eventName, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (!this.eventNames.includes(eventName)) {
            throw new Error("Unknown Event " + eventName);
        }
        this.registeredEvents.eventName = callback;
    };
    /**
     * modalMarkup
     */
    WalletProvider.prototype._injectModalMarkup = function (modalId) {
        //lets check if the class is created already
        var styleId = document.getElementById("wallet_provider__style");
        if (styleId == null) {
            var style = document.createElement('style');
            style.setAttribute("id", "wallet_provider__style");
            style.innerHTML = main_css_1.default;
            document.head.appendChild(style);
        }
        var modalMarkup = "\n            <div class=\"wallet_provider__wrapper\">\n                <div id=\"" + modalId + "\" aria-hidden=\"true\">\n                    <div tabindex=\"-1\" data-micromodal-close>\n                        <div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"" + modalId + "-title\" >\n                            <header>\n                                <h2 id=\"" + modalId + "-title\">\n                                    " + this.config.modalTitle + "\n                                </h2>\n                                <button aria-label=\"Close modal\" data-micromodal-close></button>\n                            </header>\n                            \n                            <div id=\"" + modalId + "-content\">\n                                Modal Content\n                            </div>\n                \n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        var modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;
        document.body.appendChild(modalNode);
    };
    WalletProvider.prototype.connect = function () {
    };
    return WalletProvider;
}());
exports.default = WalletProvider;
