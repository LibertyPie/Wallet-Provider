# Web3Wallets

Web3 based wallets are those that injects web3 instance into the browser window object, previously it was window.web3 but due to ethereum standards it has now been changed to window.ethereum

## Supported web3 wallets

* Metamask
* Dapper 
* Trust Wallet Dapp Browser
* Brave
* etc

Wallet Provider automatically includes Web3 provider to the modal if it detects it, but can be manually be enabled using:

```javascript
   let _walletProvider = new WalletProvider({
        debug: true, // debug mode????
        showLoader: true, //show loading window which blocks the screen until completed
        connect_text: "Connect to Web3 Wallets",
        providers: {
            "web3_wallets": {}
        }
    })

   let connectStatus = await _walletProvider.connect();
```

