/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 import Provider from "../interface/Provider";
 import NetworkCodes from "../classes/ErrorCodes"
 import Status from "../classes/Status"
 import { providers as ethersProviders } from "ethers";

 class Web3Standard implements Provider {

    protected _provider: any = null
    //private windowObj = (window as any);

    protected _web3: any;

    protected  chainId: null;

    //events
    protected _onConnectCallback: Function = () => {};
    protected _onDisconnectCallback: Function = () => {};
    protected _onPermissionRequestCallback: Function = () => {}
    protected _onErrorCallback: Function = () => {}
    protected _onAccountsChangedCallback: Function = () => {}
    protected _onChainChangedCallback: Function = () => {}
    protected _onConnectErrorCallback: Function = () => {}
    protected _onMessageCallback: Function = () => {}

    /**
     * isOnconnectEventTriggered
     * This will track if onconnect event was called or not, because on page
     * reopen, we will need to retrigger the event
     * this will prevent multiple events
     */
    isOnconnectEventTriggered = false;

    protected _accounts: Array<string> = [];


    constructor(provider: Object){
        
        this._provider = provider;

        this.initialize();
    } //end fun

    /**
     * set up provider events
     */
    private initialize(){

        if(typeof this._provider == 'undefined') return

        this._provider.autoRefreshOnNetworkChange = false;

        //on connect
        this._provider.on('connect', (chainId: string)=>{
            if(!this.isOnconnectEventTriggered) this._onConnectCallback(chainId)
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
            await this.getAccounts();
            this._onChainChangedCallback(chainId)
        });

        this._provider.on('accountsChanged', async (accounts: Array<string>) => {
            this._accounts = accounts;
            this._onAccountsChangedCallback(accounts);
        });

        this._provider.on('message', (message: string) => {
            this._onMessageCallback(message);
        });

    } //end fun
    


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

             this._accounts = await  this._provider.request({ method: 'eth_requestAccounts' });

            let account = this._accounts[0]

            this._web3 = new  ethersProviders.Web3Provider(this._provider)

            let resultObj = {
                account,
                chainId: this.getChainId(),
                provider: this._provider,
                web3: this._web3
            }

            if(!this.isOnconnectEventTriggered && this.isConnected()) {
                 this._onConnectCallback(resultObj)
            }
            
            return Status.successPromise("",resultObj)
            
        } catch (e) {
            this._onConnectErrorCallback(e)
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
    }

    /**
     * getChainId
     */
    getChainId(): string {
      if(this.chainId ==  null) { this.chainId = this._provider.chainId; }
      return this.chainId;
    }

    /**
     * getAccounts
     */
    async getAccounts(): Promise<Status> {
        try{
          
            this._accounts = await this._web3.listAccounts()

            console.log("this._accounts ", this._accounts )

            return Status.successPromise("",this._accounts);
    
        } catch (e){
            this._onErrorCallback(e)
            return Status.error(e.message).setCode(e.code);
        }
    } //end fun 

    /**
     * getWeb3
     */
    getWeb3(): any {
        return this._web3;
    }

    /**
     * isConnected
     */
    isConnected(): boolean {
        return this._provider.isConnected()
    }

    /**
     * disconnect
     * @param callback 
     */
    disconnect(): Status {
        this._provider.disconnect();
        this._onDisconnectCallback()
        return Status.success("")
    }

    /**
     * onConnect
     */
    onConnect(callback: Function = () => {}){
        this._onConnectCallback = callback;
    }

    /**
     * onPermission
     * @param callback 
     */
    onPermissionRequest(callback: Function = () => {}){
        this._onPermissionRequestCallback = callback;
    }

    /**
     * on error
     */
    onError(callback: Function = () => {}): void {
        this._onErrorCallback = callback
    }

    /**
     * onDisconnect
     */
    onDisconnect(callback: Function = () => {}){
        this._onDisconnectCallback = callback;
    }

    /**
     * on account change
     * @param callback 
     */
    onAccountsChanged(callback: Function = () => {}){
        this._onAccountsChangedCallback = callback;
    }

    /**
     * onConnectError
     * @param callback 
     */
    onConnectError(callback: Function = () => {}){
        this._onConnectErrorCallback = callback;
    }

     /**
     * onChainChange
     * @param callback 
     */
    onChainChanged(callback: Function = () => {}){
        this._onChainChangedCallback = callback;
    }

    /**
     * onMessage
     * @param callback 
     */
    onMessage(callback: Function = () => {}){
        this._onMessageCallback = callback;
    }

    /** 
     * getProvider
     */
    getProvider(): any {
        return this._provider;
    }

 }

 export default Web3Standard;