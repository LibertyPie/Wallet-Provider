/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 import Provider from "../interface/Provider";
 import NetworkCodes from "../classes/ErrorCodes"
 import Status from "../classes/Status"

 class Web3Standard implements Provider {

    private _provider: any = null
    private windowObj = (window as any);

    private  chainId: null;

    //events
    private _onConnectCallback: Function = () => {};
    private _onDisconnectCallback: Function = () => {};
    private _onPermissionRequestCallback: Function = () => {}
    private _onErrorCallback: Function = () => {}
    private _onAccountsChangedCallback: Function = () => {}
    private _onChainChangedCallback: Function = () => {}
    private _onConnectErrorCallback: Function = () => {}
    private _onMessageCallback: Function = () => {}

    /**
     * isOnconnectEventTriggered
     * This will track if onconnect event was called or not, because on page
     * reopen, we will need to retrigger the event
     * this will prevent multiple events
     */
    isOnconnectEventTriggered = false;

    private _accounts: Array<any> = [];

    constructor(provider: Object ){
        this._provider = provider;

        this.initialize();
    } //end fun

    /**
     * set up provider events
     */
    private initialize(){

        if(typeof this._provider == 'undefined') return

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

        this._provider.on('chainChanged', (chainId) => {
            this._onChainChangedCallback(chainId)
        });

        this._provider.on('accountsChanged', (accounts: Array<string>) => {
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
    async  connect(): Promise<any> { 

        if(!this.isSupported()){
            return Status.error("wallet_not_found")
                         .setCode(NetworkCodes.wallet_not_found)
        }

     
        //lets request access 
        try {

            this._accounts = await  this._provider.request({ method: 'eth_requestAccounts' });

            let account = this._accounts[0]

            let resultObj = {
                account,
                chainId: this.getChainId(),
                provider: this._provider
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