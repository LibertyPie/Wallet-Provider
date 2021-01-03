/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */


export default class Utils {

    static async getChainIdByRequest(providerClass: any): Promise<string>{
        return new Promise((resolve,reject)=>{
            providerClass._provider.sendAsync({
                method: 'eth_chainId'
            },(error,data)=>{
                if(error){
                    this.logError(error)
                    providerClass._onErrorCallback(error)
                   return reject(error)
                }

                let r = data.result;

                if(!/^(0x)/g.test(r)) r = "0x"+r.toString(16)
                
                resolve(r)
            })
        });
    }

    static logError(error: Error){
        if(!(window as any)._debug_wallet_provider) return;
        console.log(error,error.stack);
    }
}