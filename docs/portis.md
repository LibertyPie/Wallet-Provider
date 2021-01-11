## Portis 
Portis is a non-custodial wallet platform which does so well in providing a web3Provider via its api, this enable developers to integrate the wallet using ethersjs or web3js without any problems.

To integrate Portis using LibertyPie's Wallet Provider you will need to add their package via npm or yarn:

#### npm
```bash 
    npm install @portis/web3
```

### yarn 
```bash 
    yarn add @portis/web3
```

### Integration
```js 

    import Portis from "@portis/web3"

 
   let _walletProvider = new WalletProvider({
        debug: true, // debug mode????
        showLoader: true, //show loading window which blocks the screen until completed
        providers: {
            portis: {
                package: Portis, // imported portis library
                connect_text: "Connect to Portis",
                options: {
                    dappId: "portisId", //portis id from your account dashboard
                    network: "mainnet" // eg. mainnet, kovan, ropsten ...
                }
            },
        }
    })

   let connectStatus = await _walletProvider.connect();
```



