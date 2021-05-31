# Binance Chain Wallet

Binance chain wallet is a modified fork of Metamask wallet specifically for the Binance Smart Chain platform thus shares a significant similarities with MetaMask wallet.

Binance chain wallet automatically injects BinanceChain object into the browser's global window's object.

```javascript
   let _walletProvider = new WalletProvider({
        debug: true, // debug mode????
        showLoader: true, //show loading window which blocks the screen until completed
        connect_text: "Connect to Binance Chain Wallet",
        providers: {
            "binance_chain_wallet": {}
        }
    })

   let connectStatus = await _walletProvider.connect();
```

