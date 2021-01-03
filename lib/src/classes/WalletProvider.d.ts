/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Status from "./Status";
export default class WalletProvider {
    /**
     * default config
     */
    private config;
    /**
     * providers
     */
    providerModules: any;
    private modalId;
    private isModalVisible;
    private providerCacheName;
    selectedProviderName: any;
    eventNames: string[];
    registeredEvents: any;
    constructor(options?: {});
    /**
     * hasProviderCache
     */
    isProviderCached(): boolean;
    /**
     * getProviderCache
     * @return string
     */
    private getProviderCache;
    /**
     * save provider name in cache
     * @param string the provider name
     */
    private cacheProviderName;
    /**
     * removeProviderCache
     */
    removeProviderCache(): boolean;
    /**
     * process provider configs
     */
    private validateEnabledProviders;
    /**
     * trigger  onError Event
     * @param string
     */
    private dispatchEvent;
    /**
     * show the modal
     */
    showModal(): Promise<string>;
    /**
     * hide the modal
     */
    closeModal(): void;
    /**
     * events
     * @param eventName
     */
    on(eventName: string, callback?: Function): void;
    /**
     * modalMarkup
     */
    private _injectModalMarkup;
    /**
     * showLoader
     */
    showLoader(): void;
    /**
     * hide the loader
     */
    hideLoader(): void;
    /**
     * handleProviderItemClick
     */
    handleProviderItemClick(): Promise<string>;
    handleDisableProviderItemClickEvent(): void;
    /**
     * connect
     */
    connect(): Promise<Status>;
    /**
     * _proccessConnect
     */
    private _proccessConnect;
    /**
     * getProviderModule
     */
    getProviderModule(providerName: string): Promise<any>;
}
