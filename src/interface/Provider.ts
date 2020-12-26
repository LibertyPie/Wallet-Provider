/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 import Status from "../classes/Status"

interface Provider {
    initialize(): Status;
    connect(): any;
    disconnect(): any;
    getProvider(): any;
    isSupported(): boolean;
    
    onConnect(callback: Function): void;
    onDisconnect(callback: Function): void;
    onPermissionRequest(callback: Function): void;
    onError(callback: Function): void;

 }

 export default Provider;