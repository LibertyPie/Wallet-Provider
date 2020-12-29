/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

export default class Utils {

    static async getChainIdByRequest(provider: any,requestMethod: string = "request"): Promise<string>{
        try{

            let queryChainId = await provider[requestMethod]({
                method: 'eth_chainId',
                params: [],
            })
             return Promise.resolve(queryChainId);
         } catch(e){
             console.log(e,e.stack)
            return Promise.resolve(null);
        }  
    }

}