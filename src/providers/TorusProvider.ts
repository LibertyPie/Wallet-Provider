/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import Status from "../classes/Status";
import _PlatformWallets from './_PlatformWallets';
import Provider from '../interface/Provider';
import Web3Standard from './Web3Standard';
import Utils from '../classes/Utils';

export default class TorusProvider  extends Web3Standard implements Provider  {

    /**
     * torusInit
     */
    async _initialize(providerInfo:any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(providerPackage == null){
            throw new Exception("package_required","Torus package is required")
        }
        
        try{

            let packageInst = new providerPackage()
            await packageInst.init(providerInfo.options || {});

            await packageInst.login();

            this.setProvider(packageInst.provider,packageInst)

        } catch (e){
            this._onConnectErrorCallback(e)
            Utils.logError(e)
            throw e;
        }
    }

    
    /**
     * disconnect
     */
    async disconnect(): Promise<Status>{
        try{
            await this._providerPackage.logout();
            
            return Status.successPromise("");
        } catch(e){
            this._onErrorCallback(e)
            Utils.logError(e)
            return Status.errorPromise("disconnection_failed")
        }
    }

}  //end class

