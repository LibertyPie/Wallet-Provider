/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 import Provider from "../interface/Provider";
 import NetworkCodes from "../classes/ErrorCodes"
 import Status from "../classes/Status"
 import ProviderEventRegistry from "../classes/ProviderEventRegistry"
import Exception from '../classes/Exception';
import Utils from '../classes/Utils';

 class Web3Standard  extends ProviderEventRegistry implements Provider {

    protected _provider: any = null

    protected _web3: any;

    protected  chainId: string = null;


    /**
     * isOnconnectEventTriggered
     * This will track if onconnect event was called or not, because on page
     * reopen, we will need to retrigger the event
     * this will prevent multiple events
     */
    isOnconnectEventTriggered = false;

    protected _accounts: Array<string> = [];

    protected _providerPackage: any = null;

    constructor(){
      super()
    } //end fun

    /**
     * _initialize
     */
    async _initialize(providerInfo: any){
        throw new Error("Kindly set the provider from the provider's class")
    }

    /**
     * set up provider 
     * @param any provider 
     * @param any package Instance
     */
     async  setProvider(
        provider: any, 
        pkgInstance: any = null
    ){

        this._provider = provider;
        this._providerPackage = pkgInstance;

        if(typeof this._provider == 'undefined'){
            throw new Exception("undefined_provider","Provider is required")
        }

        this._provider.autoRefreshOnNetworkChange = false;

        if(pkgInstance != null){
            this._provider.__proto__.providerPackage = pkgInstance;
        }

        this.handlerEventLiteners();
    } //end fun
    
    /**
     * handleEventListeners
     */
    handlerEventLiteners(){

        //on connect
        this._provider.on('connect', async (chainIdObj: any)=>{
            if(!this.isOnconnectEventTriggered){
                let accounts = await this.getAccounts()
                this._onConnectCallback({
                    chainId: chainIdObj.chainId,
                    account: accounts[0],
                    provider: this._provider
                })
            }

            this.isOnconnectEventTriggered = true;
        });

        /**
         * disconnect
         */
        this._provider.on('disconnect', (err: any)=>{
            this._onDisconnectCallback(err)
        });

        this._provider.on('error', (error) => {
            this._onErrorCallback(error)
        });

        this._provider.on('chainChanged', async (chainId) => {
            this._accounts = await this.getAccounts();
            this._onChainChangedCallback(chainId)
        });

        this._provider.on('accountsChanged', async (accounts: Array<string>) => {
            this._accounts = accounts;
            this._onAccountsChangedCallback(accounts);
        });

        this._provider.on('message', (message: string) => {
            this._onMessageCallback(message);
        });
    }

    /**
     * wether the provider is supported in the browser
     */
    isSupported(): boolean {
        return (typeof this._provider !== 'undefined');
    }

    /**
     * connect
     */
    async  connect(): Promise<Status> { 

        if(!this.isSupported()){
            return Status.error("wallet_not_found")
                         .setCode(NetworkCodes.wallet_not_found)
        }
 
     
        //lets request access 
        try {

            if(typeof this._provider["enable"] == "function"){
                this._accounts = await this._provider.enable();  
            } else {
                this._accounts = await this.getAccounts();
            }
             
            let account = this._accounts[0]

            let resultObj = {
                account,
                chainId: await this.getChainId(),
                provider: this._provider
            }

            if(!this.isOnconnectEventTriggered ) {
                 this._onConnectCallback(resultObj)
                 this.isOnconnectEventTriggered = true;
            }
            
            return Status.successPromise("",resultObj)
            
        } catch (e) {
            console.log(e)
            this._onConnectErrorCallback(e)
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
    }

    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
        this.chainId = await Utils.getChainIdByRequest(this)
        return this.chainId;
    }

    /**
     * getAccounts
     */
     async getAccounts(): Promise<Array<string>> {
       
        return new Promise((resolve,reject)=>{
            this._provider.sendAsync({
                method: 'eth_requestAccounts' 
            },(error,data)=>{

                console.log(data)
                if(error != null){
                    this._onErrorCallback(error)
                    Utils.logError(error)
                    return reject(error)
                }

                resolve(data.result)
            });
        });
    } //end fun 


    /**
     * isConnected
     */
    isConnected(): boolean {
        return this._provider.connected || this._provider.isConnected()
    }

    /**
     * disconnect
     * @param callback 
     */
    async disconnect(): Promise<Status> {
        this._provider.disconnect();
        this._onDisconnectCallback()
        return Status.successPromise("")
    }

    /**
     * onConnect
     */
    onConnect(callback: Function = () => {}){
        this._onConnectCallback = callback;
    }


    /** 
     * getProvider
     */
    getProvider(): any {
        return this._provider;
    }

 }

 export default Web3Standard;