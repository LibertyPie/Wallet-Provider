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

    //events
    private _onConnectCallback: Function = () => {};
    private _onDisconnectCallback: Function = () => {};
    private _onPermissionRequestCallback: Function = () => {}
    private _onErrorCallback: Function = () => {}
    private _onAccountChangeCallback: Function = () => {}
    private _onChainChangeCallback: Function = () => {}
    private _onConnectErrorCallback: Function = () => {}


    private _accounts: Array<any> = [];

    constructor(provider: Object ){
        this._provider = provider;

        this. setUpProviderEvents();
    } //end fun

    /**
     * set up provider events
     */
    private setUpProviderEvents(){

        if(typeof this._provider == 'undefined') return

        //on connect
        this._provider.on('connect', (chainId: string)=>{
            this._onConnectCallback(chainId)
        });

        /**
         * disconnect
         */
        this._provider.on('disconnect', (err: any)=>{
            this._onConnectCallback(err)
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
            
            return Status.successPromise("",{
                account,
                provider: this._provider
            })
            
        } catch (e) {
            this._onConnectErrorCallback(e)
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
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
    onAccountChange(callback: Function = () => {}){
        this._onAccountChangeCallback = callback;
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
    onChainChange(callback: Function = () => {}){
        this._onChainChangeCallback = callback;
    }



    /** 
     * getProvider
     */
    getProvider(): any {
        return this._provider;
    }

 }

 export default Web3Standard;