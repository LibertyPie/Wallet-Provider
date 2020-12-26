/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */


interface Provider {
    initialize(): any;
    connect(): any;
    disconnect(): any;
    onConnect(callback: Function): any;
    onDisconnect(callback: Function): any;
    onRequestPending(callback: Function): any;
    onError(callback: Function): any;
    getProvider(): any;
    isSupported(): boolean;
 }

 export default Provider;