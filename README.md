# App-Basic

A basic frontend app that use the [Vote-API](https://github.com/Vote-On-Ethereum/Vote-API) and the [Signer on AWS Lambda](https://github.com/Vote-On-Ethereum/Signer-Aws-Lambda)

## Dependencies

- [Webpack](https://webpack.github.io) to bundle the JS files
- [http-server](https://github.com/indexzero/http-server) to create a local http server
- [Testrpc](https://github.com/ethereumjs/testrpc) for local development blockchain

## Install

```console
npm install
```

## Config

The config is done in `app.js` file.
You may need to change those variables to match your environment:

```node
let contractAddress = "0xd89208fd82e9ae16789891654fa092cbf55eba2d"
let backupNodeURL = "https://128.199.140.92"
let signerURL = 'https://p07ckk3cb7.execute-api.us-east-1.amazonaws.com/dev/sign'
let wallet = {
  "public": "0xBA26Dcdfd63447baA042e3968a376cE70D530F83"
}

```

## Build

```console
npm run build
```

This will create the `bundle.js` file.

## Watch and rebuild auto

Same as build but will rebuild when modification occure to the JS files.

```console
npm run build-and-watch
```

## Serve

To serve the website over a local server, you can use [http-server](https://github.com/indexzero/http-server)

```console
npm install -g http-server
```

Then navigate the root folder of the repo and execute:

```console
http-server
```

This will create a local http server on [http://127.0.0.1:8080](http://127.0.0.1:8080)