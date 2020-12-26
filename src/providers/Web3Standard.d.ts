/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Provider from "../interface/Provider";
import Status from "../classes/Status";
declare class Web3Standard implements Provider {
    _provider: any;
    windowObj: any;
    _onConnectCallback: Function;
    _onDisconnectCallback: Function;
    _onPermissionRequestCallback: Function;
    _onErrorCallback: Function;
    _accounts: Array<any>;
    constructor(provider: Object);
    /**
     * initialize the plugin
     */
    initialize(): Status;
    /**
     * wether the provider is supported in the browser
     */
    isSupported(): boolean;
    /**
     * connect
     */
    connect(): Promise<any>;
    /**
     * disconnect
     * @param callback
     */
    disconnect(): Status;
    /**
     * onConnect
     */
    onConnect(callback?: Function): void;
    /**
     * onPermission
     * @param callback
     */
    onPermissionRequest(callback?: Function): void;
    /**
     * on error
     */
    onError(callback?: Function): void;
    /**
     * onConnect
     */
    onDisconnect(callback?: Function): void;
    /**
     * getProvider
     */
    getProvider(): any;
}
export default Web3Standard;
