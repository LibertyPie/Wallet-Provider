/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 const  path = require("path")
import MicroModal from 'micromodal'; 
import MainCssStyles from "../assets/styles/main.css";
import ErrorCodes from './ErrorCodes';
import Exception from "./Exception"
import Status from "./Status"

 class _WalletProvider {

    /**
     * default config 
     */
    private config = {
        providers: {
            "web3_wallets": {}
        },
        modalClass: "",
        modalTitle: "Select Wallet"
    }

    /**
     * providers 
     */
    providerModules: any = {
        "web3_wallets": "EthereumProvider",
        "binance_chain_wallet": "BinanceChainProvider"
    }

    //modal
    private modalId: string = "__wallet__provider" 

    //is modal visible
    private isModalVisible: boolean = false;

    //  events
    eventNames = ["modalOpen","modalClose","connect","disconnect","error"];
    registeredEvents: any = {};

    constructor(options = {}){

        if(typeof options != 'object'){
            throw new Error("options_must_be_object")
        }

        this.config = Object.assign(this.config,options);


        //lets insert the markup
        this._injectModalMarkup(this.modalId);

        let _this = this;

        MicroModal.init({       
            onShow: modal => this._onModalShow(modal), 
            onClose: modal => this._onModalClose(modal),   
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: false, 
            awaitCloseAnimation: false,
            //debugMode: true
        });
       
    }

    /**
     * trigger  onError Event 
     * @param string
     */
    private dispatchEvent(eventName: string, data: any){
        let eventCallback: any = this.registeredEvents[eventName] || null;
        if(typeof eventCallback == 'function'){
            eventCallback(data)
        }
    }

    /**
     * on Modal show event
     */
    private _onModalShow(modal: any){
        this.isModalVisible = true;
        this.dispatchEvent("modalOpen",modal);
    }

    /**
     * on modal close  event
     * @param any 
     */
    private _onModalClose(modal: any){
        this.isModalVisible = false;
        this.dispatchEvent("modalClose",modal);
    }

    /**
     * show the modal
     */
    showModal(){
        MicroModal.show(this.modalId,{
            onShow: modal => this._onModalShow(modal), 
            onClose: modal => this._onModalClose(modal),    
        })
    }

    /**
     * hide the modal
     */
    hideModal(){
        MicroModal.close(this.modalId,{
            onClose: modal => this._onModalClose(modal),   
        })
    }

    /**
     * toggle modal
     */
    toggleModal(){
        if(this.isModalVisible){
            this.hideModal()
        } else {
            this.showModal()
        }
    }

    /**
     * events
     * @param eventName 
     */
    on(eventName: string, callback: Function = ()=>{}){
        
        if(!this.eventNames.includes(eventName)){
            throw new Error(`Unknown Event ${eventName}`)
        }

        (this.registeredEvents as any).eventName = callback;
    }


    /**
     * modalMarkup
     */
    private _injectModalMarkup(modalId: string): void {

        //lets check if the class is created already
        let styleId = document.getElementById("wallet_provider__style")

        if(styleId == null){
            var style = document.createElement('style');
            style.setAttribute("id","wallet_provider__style")
            style.innerHTML = MainCssStyles;
            document.head.appendChild(style);
        }
        

        let modalMarkup = `
            <div class="wallet_provider__wrapper">
                <div class="modal micromodal-slide" id="${modalId}" class="modal" aria-hidden="true">
                    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
                        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="${modalId}-title">
                            <header class="modal__header">
                                <h2 class="modal__title" id="${modalId}-title">
                                    ${this.config.modalTitle}
                                </h2>
                                <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
                            </header>
                            <main class="modal__content" id="${modalId}-content">
                              <div class="row">
                                <a class="col" style="border: 1px solid black;">
                                    LOL
                                </a>
                                <a class="col" style="border: 1px solid green;">
                                    Bee
                                </a>
                                <a class="col" style="border: 1px solid red;">
                                    Cee
                                </a>
                              </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        `;

        let modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;

        document.body.appendChild(modalNode)
    }

    /**
     * connect
     */
    async connect(): Promise<Status> {

        //let check enabled providers 
        let enabledProviders = this.config.providers;

        for(let provider of Object.keys(enabledProviders)){
            if(provider !in this.providerModules){
                this.dispatchEvent("error",new Exception("unknown_provider",`Unknown provider name ${provider}`));
                return Promise.resolve(Status.error("unknown_provider").setCode(ErrorCodes.unknown_provider));
            }   

            
        }
    } //end fun

 }

 export default _WalletProvider;
