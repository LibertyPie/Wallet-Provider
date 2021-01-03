/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Provider from "../interface/Provider";
import Status from "../classes/Status";
import ProviderEventRegistry from "../classes/ProviderEventRegistry";
declare class Web3Standard extends ProviderEventRegistry implements Provider {
    protected _provider: any;
    protected _web3: any;
    protected chainId: string;
    /**
     * isOnconnectEventTriggered
     * This will track if onconnect event was called or not, because on page
     * reopen, we will need to retrigger the event
     * this will prevent multiple events
     */
    isOnconnectEventTriggered: boolean;
    protected _accounts: Array<string>;
    protected _providerPackage: any;
    constructor();
    /**
     * _initialize
     */
    _initialize(providerInfo: any): Promise<void>;
    /**
     * set up provider
     * @param any provider
     * @param any package Instance
     */
    setProvider(provider: any, pkgInstance?: any): Promise<void>;
    /**
     * handleEventListeners
     */
    handlerEventLiteners(): void;
    /**
     * wether the provider is supported in the browser
     */
    isSupported(): boolean;
    /**
     * connect
     */
    connect(): Promise<Status>;
    /**
     * getChainId
     */
    getChainId(): Promise<string>;
    /**
     * getAccounts
     */
    getAccounts(): Promise<Array<string>>;
    /**
     * isConnected
     */
    isConnected(): boolean;
    /**
     * disconnect
     * @param callback
     */
    disconnect(): Promise<Status>;
    /**
     * onConnect
     */
    onConnect(callback?: Function): void;
    /**
     * getProvider
     */
    getProvider(): any;
}
export default Web3Standard;
