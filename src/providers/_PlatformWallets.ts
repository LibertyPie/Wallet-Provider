/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Status from '../classes/Status';


export default class _PlatformWallets  extends Web3Standard  {

    /**
     * fix providers without event listeners
     */
    /**
     * handleEvents
     */
    handlerEventLiteners(){

        if(typeof this._provider["on"] == 'function'){
            super.handlerEventLiteners();
            return;
        }

        //lets inject .on to web3 provider
        this._provider.__proto__.on = (_event: string,_callback: Function) => {
            switch(_event){
                case "connected":
                    this._onAccountsChangedCallback = _callback;
                break;
                case "disconnect":
                    this._onDisconnectCallback = _callback;
                break;
                case "chainChanged":
                    this._onChainChangedCallback = _callback;
                break;
                case "accountsChanged":
                    this._onAccountsChangedCallback = _callback;
                break;
                case "error":
                    this._onErrorCallback = _callback;
                break;
            }
        }

        super.handlerEventLiteners();
       
    } //end 

}//end fun 