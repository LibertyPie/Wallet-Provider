# WalletLink

WalletLink serves as a bridge between dApps and multiple wallet providers. To integrate WalletLink using LibertyPie's Wallet Provider, You will need their official library.

### npm

```bash
    npm install walletlink
```

## yarn

```bash
    yarn add walletlink
```

## Integration

```javascript
    import WalletLink from 'walletlink'

    let infuraId = "xxxxx";

    let _walletProvider = new WalletProvider({
        debug: true, // debug mode????
        showLoader: true, //show loading window which blocks the screen until completed
        providers: {
            walletlink: {
                package: WalletLink, // walletLink imported Package
                options: {
                    app: {
                        appName: "LibertyPie", //app name
                        appLogoUrl: "https://libertypie.com/assets/img/logo.svg", 
                        darkMode: false
                    },
                    network: {
                        rpc: `https://kovan.infura.io/v3/${infuraId}`,
                        chainId: 0x2a // chainId 42
                    }
                }
            },
        }
    })

   let connectStatus = await _walletProvider.connect();
```

