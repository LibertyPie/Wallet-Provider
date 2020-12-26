/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

 class WalletProviderCore {

    /**
     * default config
     */
    config = {
        providers: ["ethereum_provider","binance_chain_provider"],
        modalClass: "",
        modalTitle: "Select Provider"
    }

    constructor(options = {}){

        if(typeof options != 'object'){
            throw new Error("options_must_be_object")
        }

        this.config = {...this.config,options}
    }

    /**
     * modalMarkup
     */
    _getModalMarkup(modalId){

        let modalMarkup = `
            <div id="${modalId}" aria-hidden="true">
                <div tabindex="-1" data-micromodal-close>
                    <div role="dialog" aria-modal="true" aria-labelledby="${modalId}-title" >
                        <header>
                            <h2 id="${modalId}-title">
                                ${modalTitle}
                            </h2>
                            <button aria-label="Close modal" data-micromodal-close></button>
                        </header>
                        
                        <div id="${modalId}-content">
                            Modal Content
                        </div>
            
                    </div>
                </div>
            </div>`;
    }

 }

 export default WalletProviderCore;
 module.exports = WalletProviderCore;