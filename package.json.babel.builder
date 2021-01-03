{
  "name": "@libertypie/wallet-provider",
  "main": "./dist/src/index.js",
  "version": "1.0.3",
  "description": "A unified api for web3 wallet  connections",
  "scripts": {
    "copy-assets": "npx copy-and-watch src/**/*.{css,json,svg,png,scss} lib/",
    "copy-assets-dev": "npx copy-and-watch --watch src/**/*.{css,json,svg,png} lib/",
    "dev-compile-style": "npx node-sass --include-path scss ./src/assets/styles/main.scss  ./src/assets/styles/main.css --watch --output-style compressed",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "build:dev": "babel src --out-dir lib --extensions '.ts,.tsx' --watch",
    "build": "npm run build:types && npm run build:js",
    "dev": "npx concurrently \"npm:copy-assets-dev\" \"npm:dev-compile-style\" \"npm:build:dev\"",
    "build:types": "tsc --emitDeclarationOnly"
  },
  "publishConfig": {
    "access": "public"
  },
  "keywords": [
    "Wallet provider",
    "Web3",
    "ethersjs",
    "ethereum",
    "binance",
    "smart",
    "chain",
    "Trust Wallet",
    "metamask",
    "binance chain",
    "coinbase wallet",
    "sync wallet",
    "Dapp",
    "Wallet"
  ],
  "private": false,
  "repository": {
    "type": "git",
    "url": "git+https://github.com/libertypie/wallet-Provider.git"
  },
  "homepage": "https://wallet-provider.libertypie.com",
  "author": {
    "name": "LibertyPie",
    "email": "hello@libertypie.com"
  },
  "license": "MIT",
  "devDependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/plugin-proposal-class-properties": "^7.12.1",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-modules-commonjs": "^7.12.1",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-typescript": "^7.12.7",
    "@types/node": "^14.14.16",
    "babel-plugin-inline-svg": "^1.2.0",
    "concurrently": "^5.3.0",
    "copy-and-watch": "^0.1.5",
    "node-sass": "^5.0.0",
    "typescript": "^4.1.3"
  },
  "dependencies": {
    "micromodal": "^0.4.6"
  }
}
