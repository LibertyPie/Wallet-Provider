## Binance Chain Wallet
Binance chain wallet is a modified fork of the Metamask wallet specifically for the Binance Smart Chain platform thus shares significant similarities with MetaMask wallet.

Binance chain wallet automatically injects BinanceChain object into the browser's global window's object.

```js 
   let _walletProvider = new WalletProvider({
        debug: true, // debug mode????
        showLoader: true, //show loading window which blocks the screen until completed
        providers: {
            "binance_chain_wallet": {
                name: "Binance Chain Wallet"  //custom name, can be anything
            }
        }
    })

   let connectStatus = await _walletProvider.connect();
```