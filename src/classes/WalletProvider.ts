/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

//import ErrorCodes from './ErrorCodes'; 
import Exception from "./Exception"
import Status from "./Status"
require ("../assets/styles/main.css");
 
const _window = window as any;
 export default class WalletProvider {

    /**
     * default config 
     */
    private config = {
        providers: {
            "web3_wallets": {}
        },
        modalClass: "",
        modalTitle: "Select Wallet",
        templaeMode: 'standard',
        cacheProvider: true,
        showLoader: true,
        debug: false,
    }

    /**
     * providers 
     */
    providerModules: any = {
        "web3_wallets":         "EthereumProvider",
        "binance_chain_wallet": "BinanceChainProvider",
        "walletconnect":        "WalletConnectProvider",
        "portis":               "PortisProvider",
        "frame":                "FrameProvider",
        "authereum":            "AuthereumProvider",
        "walletlink":           "WalletLinkProvider",
        "torus":                "TorusProvider",
        "fortmatic":             "FortmaticProvider"
    }

    //modal
    private modalId: string = "__wallet__provider" 

    //is modal visible
    private isModalVisible: boolean = false;

    //provider cache name 
    private providerCacheName = "__wallet_provider_cache"

    //selected provider 
    selectedProviderName  = null;

    //  events
    eventNames = [
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

    registeredEvents: any = {};

    constructor(options = {}){

        if(typeof options != 'object'){
            throw new Exception("opts_must_be_object","Options must be an object")
            return
        }

        this.config = Object.assign(this.config,options);

        let hasWeb3 = _window.ethereum ||  _window.web3; 

        if(!this.config.providers.hasOwnProperty("web_wallets") && hasWeb3){
            this.config.providers = {...{web3_wallets: {}}, ...this.config.providers}
        }

        //lets make 
        _window._debug_wallet_provider = this.config.debug;

        //process and validate enabled providers 
        this.validateEnabledProviders();


        //inject modal
        this._injectModalMarkup();

     
        //check for provider cache
        if(this.config.cacheProvider && this.isProviderCached()){
            let cachedProviderName = this.getProviderCache()
            this.selectedProviderName = cachedProviderName;    
        }

    } //end fun 

    /**
     * hasProviderCache
     */
    isProviderCached(): boolean {

        let providerNameCache = this.getProviderCache()

        if(providerNameCache == null) return false;

        if(!this.providerModules.hasOwnProperty(providerNameCache)) return false;

        return true;
    } //end fun 

    /**
     * getProviderCache
     * @return string 
     */
    private getProviderCache(): any {
        return _window.localStorage.getItem(this.providerCacheName) || null 
    }//end 

    /**
     * save provider name in cache
     * @param string the provider name 
     */
    private cacheProviderName(providerName: string) {
        _window.localStorage.setItem(this.providerCacheName, providerName) 
    }//end fun 

    /**
     * removeProviderCache
     */
    removeProviderCache(): boolean {
        _window.localStorage.removeItem(this.providerCacheName)
        return true;
    }

    /**
     * process provider configs
     */
    private validateEnabledProviders(){
        
        //let check enabled providers 
        let enabledProviders = this.config.providers;

        for(let provider of Object.keys(enabledProviders)){
            if(!this.providerModules.hasOwnProperty(provider)){
                
                let exception = new Exception("unknown_provider",`Unknown provider name ${provider}`);

                this.dispatchEvent("error",exception);
                
                throw exception;
            }   
        }
        
    } //end fun

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
     * show the modal
     */
    async showModal(): Promise<string>{
        
        if(!this.isModalVisible){
          document.getElementById(this.modalId).classList.add("is_open");
          this.isModalVisible = true;
          this.dispatchEvent("modalOpen",this.modalId);
        }

        this.selectedProviderName = await this.handleProviderItemClick();

        this.handleDisableProviderItemClickEvent();

        return this.selectedProviderName;
    }

    /**
     * hide the modal
     */
    closeModal(){
      let el = document.getElementById(this.modalId)
      let c = el.classList
      setTimeout(()=>{
        c.remove("is_open")
        c.remove("m__closing")
       }, 810); 

       //add Zoomin anim
       c.add("m__closing")
      this.isModalVisible = false;
      this.dispatchEvent("modalClose",this.modalId);
    }

    /**
     * events
     * @param eventName 
     */
    on(eventName: string, callback: Function = ()=>{}) {
        
        if(!this.eventNames.includes(eventName)){
            throw new Error(`Unknown Event ${eventName}`)
        }

        (this.registeredEvents as any)[eventName] = callback;
    } //end fun


    /**
     * modalMarkup
     */
    private _injectModalMarkup(): void {

        let modalId = this.modalId;
        
        let providersMarkup = "";
        
        Object.keys(this.config.providers).forEach(async (provider) => {

            let enabledProviderInfo = this.config.providers[provider];
            let providerDescText = enabledProviderInfo.connect_text || "";
            let providerName = enabledProviderInfo.name || null;

            
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
                        providerDescText += `<div class="flex flex_row">
                                                <div class="sub_icon ${walletImg}_icon"></div>
                                                <div>${wallet}</div>
                                            </div>`;
                }  
                
                providerDescText += "</div>";
            } //end sub icons
            

            if(this.config.templaeMode == 'standard') {
                providersMarkup  += `
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
            } else {
                providersMarkup  += `
                    <a href="#" data-provider="${provider}" class="t_compact provider_item_btn">
                        <div class="m_row provider_item">
                            <div class="icon ${provider}_icon"></div>
                            <div><h1 class="title">${providerName}</h1></div>
                        </div>
                    </a>
                `;
            }
        }) //end for loop

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

        let modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;

        document.body.appendChild(modalNode)

        //handle click to close
        modalNode.querySelector(".m__close").addEventListener("click",(e)=>{
            e.preventDefault()
            this.closeModal()
        })

        /**
         * when clicked on the layer close it 
         */
        if(!this.config.showLoader){           
            modalNode.querySelector(".modal").addEventListener("click",(e)=>{
                if(e.target !== e.currentTarget) return;
                this.closeModal()
            })
        }  
    }

    /**
     * showLoader
     */
    showLoader(){
        if(!this.config.showLoader) return;
        document.querySelector(".spinner_overlay").classList.remove('hide')
    }

    /**
     * hide the loader
     */
    hideLoader(){
        if(!this.config.showLoader) return;
        document.querySelector(".spinner_overlay").classList.add('hide')
    }

    /**
     * handleProviderItemClick
     */
    async handleProviderItemClick(): Promise<string> {

        return new Promise((resolve,reject)=>{
            Array.from(document.querySelectorAll(".provider_item_btn")).forEach((el)=>{

                //provider 
                let provider = (el as any).dataset.provider || null;
    
                if(provider  == null) return false;
    
                el.addEventListener("click",(e)=>{
                    e.preventDefault()
                    
                    //return selected provider
                    resolve(provider)
                })
            })
        })
    }

    //disable click event
    handleDisableProviderItemClickEvent(){
        Array.from(document.querySelectorAll(".provider_item_btn")).forEach((el)=>{
            el.removeEventListener("click",()=>{})
        });
    }

    /**
     * connect
     */
    async connect(): Promise<Status>{

        if(this.selectedProviderName == null){
           this.selectedProviderName = await this.showModal();
        }
        
        let resultStatus = await this._proccessConnect(this.selectedProviderName);

        this.selectedProviderName = null;

        this.closeModal();

        return resultStatus;
    }//end fun

    /**
     * _proccessConnect
     */
    private async _proccessConnect(providerName: string): Promise<Status> {  
        
        let providerModule = await this.getProviderModule(providerName)

        //lets  add options
        let providerInfo = this.config.providers[providerName] || {}

        let providerInst = new providerModule()

        let defaultFun = () => {}

        //lets now register  some events 
        providerInst.onConnect(this.registeredEvents.connect || defaultFun)
        providerInst.onDisconnect(this.registeredEvents.disconnect || defaultFun)
        //providerInst.onPermissionRequest(this.registeredEvents.permissionRequest || defaultFun)
        providerInst.onError(this.registeredEvents.error || defaultFun)
        providerInst.onAccountsChanged(this.registeredEvents.accountChange || defaultFun)
        providerInst.onChainChanged(this.registeredEvents.chainChanged || defaultFun)
        providerInst.onConnectError(this.registeredEvents.connectError || defaultFun)
        providerInst.onMessage(this.registeredEvents.message || defaultFun)

       
        try{

             //show the loader 
            this.showLoader();

            //initialize 
            await providerInst._initialize(providerInfo);
            let connectStatus = await providerInst.connect() as Status;

            this.hideLoader();

            //if success, and provider cache is enabled, lets cache the provider
            if(connectStatus.isError()){
                return Promise.resolve(connectStatus);
            }

            let cacheProvider = this.config.cacheProvider || true;

            if(cacheProvider){
                this.cacheProviderName(providerName)
            }

            return  Promise.resolve(connectStatus);
        } catch(e){

            if(this.config.debug){
                console.log("Connect Error", e, e.stack)
            }

            return Status.error(e.message || "connect_failed")
        } finally {
            this.closeModal()
            this.hideLoader();
        }       
   
    } //end fun

    /**
     * getProviderModule
     */
    async getProviderModule(providerName: string): Promise<any> {
        let providerModule = this.providerModules[providerName] || null;
        
        if(providerModule == null){
            let err = new Exception("unknown_provider",`Unknown provider name ${providerName}`)
            throw err; 
        }

        let module =  await import(`../providers/${providerModule}`);
        
        return module.default;
    } //end

} //end class

