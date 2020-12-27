/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 
import MicroModal from 'micromodal'; 
import MicroModalCSS from "./assets/styles/main.css";

 class WalletProvider {

    /**
     * default config 
     */
    private config = {
        providers: ["ethereum_provider"],
        modalClass: "",
        modalTitle: "Select Provider"
    }

    //modal
    private modalId: string = "" 

    //is modal visible
    private isModalVisible: boolean = false;

    //  events
    eventNames = ["modalOpen","modalClose","connect","disconnect"];
    registeredEvents: any = {};

    constructor(options = {}){

        if(typeof options != 'object'){
            throw new Error("options_must_be_object")
        }

        this.config = Object.assign(this.config,options);

        if(!this.config.providers.includes("ethereum_provider")){
            this.config.providers.push("ethereum_provider")
        }

        this.modalId = `wallet__provider`

        //lets insert the markup
        this._injectModalMarkup(this.modalId);

        MicroModal.init({
            onShow:  (modal) => this._onModalShow(modal),
            onClose: (modal) => this._onModalClose(modal),
            //openTrigger: 'data-wallet-provider-open', 
            //closeTrigger: 'data-wallet-provider-close', 
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: false, 
            awaitCloseAnimation: false,
            //debugMode: true
        });
       
    }

    /**
     * show, shows the 
     * @param modal 
     */

    /**
     * on Modal show event
     */
    private _onModalShow(modal: any){
        this.isModalVisible = true;
        let eventCallback: any = this.registeredEvents.onModalOpen || null;
        if(typeof eventCallback == 'function'){
            eventCallback(modal)
        }
    }

    /**
     * on modal close  event
     * @param any 
     */
    private _onModalClose(modal: any){
        
        this.isModalVisible = false;
        let eventCallback: any = this.registeredEvents.onModalClose || null;
        if(typeof eventCallback == 'function'){
            eventCallback(modal)
        }

    }

    /**
     * showModal
     */
    showModal(){
        MicroModal.show(this.modalId)
    }

    hideModal(){
        MicroModal.close(this.modalId)
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
            style.innerHTML = MicroModalCSS;
            document.head.appendChild(style);
        }
        

        let modalMarkup = `
            <div class="wallet_provider__wrapper">
                <div id="${modalId}" aria-hidden="true">
                    <div tabindex="-1" data-micromodal-close>
                        <div role="dialog" aria-modal="true" aria-labelledby="${modalId}-title" >
                            <header>
                                <h2 id="${modalId}-title">
                                    ${this.config.modalTitle}
                                </h2>
                                <button aria-label="Close modal" data-micromodal-close></button>
                            </header>
                            
                            <div id="${modalId}-content">
                                Modal Content
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
        `;

      
        let modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;

        document.body.appendChild(modalNode)
    }

    connect(){

    }

 }

 export default WalletProvider;
