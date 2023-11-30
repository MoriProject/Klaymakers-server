# TTM
We created A service proposal that allows you to buy and sell RWA object rights and check and verify rights owned by users.

## Introduction
This project is a TTM project by the To The Moon team, which participated in [KLAYMAKERS 23](https://developer.klaytn.foundation/klaymakers23/) as The Real-World Assets (RWAs) track.

You can check out our [BUIDL](https://dorahacks.io/buidl/7621) that we have written on DoraHack.
## Technologies
### Web Client
Click [here](https://github.com/Project-morimori/TTM) for the web page repository.

[![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![IPFS](https://img.shields.io/badge/IPFS-6DB33F?style=for-the-badge&logo=ipfs)](https://ipfs.io/)
[![Infura](https://img.shields.io/badge/Infura-F6851B?style=for-the-badge&logo=infura)](https://infura.io/)
[![Fleek](https://img.shields.io/badge/Fleek-424242?style=for-the-badge&logo=fleek)](https://fleek.co/)
### Mobile Client
Click [here](https://github.com/Project-morimori/Team_Mori_Application) for the mobile application repository.

[![cupertino_icons](https://img.shields.io/badge/cupertino_icons-0175C2?style=for-the-badge)](https://pub.dev/packages/cupertino_icons)
[![flutter_native_splash](https://img.shields.io/badge/flutter_native_splash-0175C2?style=for-the-badge)](https://pub.dev/packages/flutter_native_splash)
[![url_launcher](https://img.shields.io/badge/url_launcher-0175C2?style=for-the-badge)](https://pub.dev/packages/url_launcher)
[![walletconnect_flutter_v2](https://img.shields.io/badge/walletconnect_flutter_v2-0175C2?style=for-the-badge)](https://pub.dev/packages/walletconnect_flutter_v2)
[![equatable](https://img.shields.io/badge/equatable-0175C2?style=for-the-badge)](https://pub.dev/packages/equatable)
[![flutter_bloc](https://img.shields.io/badge/flutter_bloc-0175C2?style=for-the-badge)](https://pub.dev/packages/flutter_bloc)
[![get_it](https://img.shields.io/badge/get_it-0175C2?style=for-the-badge)](https://pub.dev/packages/get_it)
[![image_picker](https://img.shields.io/badge/image_picker-0175C2?style=for-the-badge)](https://pub.dev/packages/image_picker)
[![intl](https://img.shields.io/badge/intl-0175C2?style=for-the-badge)](https://pub.dev/packages/intl)
[![provider](https://img.shields.io/badge/provider-0175C2?style=for-the-badge)](https://pub.dev/packages/provider)
[![flutter_secure_storage](https://img.shields.io/badge/flutter_secure_storage-0175C2?style=for-the-badge)](https://pub.dev/packages/flutter_secure_storage)
[![Flutter](https://img.shields.io/badge/Flutter-0175C2?style=for-the-badge&logo=flutter)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart)](https://dart.dev/)
### Server
Click [here](https://github.com/Supia7/Klaymakers23) for server repository.
(however, it is private for server security reasons).

[![Node.js](https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![web3 Library](https://img.shields.io/badge/web3_Library-3E74DA?style=for-the-badge)](https://github.com/ethereum/web3.js/)
[![GCP SQL mysql](https://img.shields.io/badge/GCP_SQL_mysql-64A7F6?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/sql/)
[![GCP Compute Engine](https://img.shields.io/badge/GCP_Compute_Engine-64A7F6?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/compute/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx)](https://nginx.org/)
### Blockchain
Our smart contract was deployed on Klaytn Baobab, and the address of the smart contract is `0xdbEE6A39ac4084EE45DD8a2e4771D74523670e12`.
Click [here](https://baobab.klaytnscope.com/account/0xdbEE6A39ac4084EE45DD8a2e4771D74523670e12?tabId=txList) to see the smart contract deployed.

[![Klaytn Baobab](https://img.shields.io/badge/Klaytn_Baobab-00A2E8?style=for-the-badge&logo=klaytn)](https://www.klaytn.com/)
[![MetaMask](https://img.shields.io/badge/MetaMask-E2761B?style=for-the-badge&logo=metamask)](https://metamask.io/)
[![Remix IDE](https://img.shields.io/badge/Remix_IDE-00A6F0?style=for-the-badge&logo=ethereum)](https://remix.ethereum.org/)

## Setup and Installation
### Prerequisites
 - We recommend running it in a desktop environment if possible.
 - [MetaMask](https://metamask.io/download/) must be installed in your browser environment.

### How to run in an environment deployed on Fleek
 - You can run your project in an environment deployed on Fleek by clicking [here](https://ttm.on.fleek.co/).

### How to run in local environment
 - You need to go inside the app directory. You need to navigate to where the package.json file exists.
 - Where the package.json file exists, you can run:
 - ### `yarn` or `yarn install`
 - After installation is complete, you can run:
 - ### `yarn start`
 - Then you can see the project running.

## Usage
In order for you to use most services, you must click `Sign in with Metamask` in the upper right corner after running the project.

Did you sign in successfully? And do you have some KLAY (test network)?

congratulations! You can now use most of the features of our project.

## Features
### Create Object
This function uploads information about objects and object files, and generates rights tokens. You can generate rights tokens by paying a small fee.

### Market
If you have a sufficient amount of KLAY, you can view rights tokens created by others and purchase the rights tokens you want.

### My Object
You can see a list of rights tokens you own here.

### My Page
You can update your nickname and email information.

### Verify Ownership
You can check if someone owns a specific rights token.

### Withdraw
Only the contract owner can withdraw fees.

## Authors and Acknowledgment
We would like to thank the To The Moon team members who participated in this project.
- [kimchan122](https://github.com/kimchan122)
- [Supia7](https://github.com/Supia7)
- [ESblueRin](https://github.com/ESblueRin)
- [Saccharine1211](https://github.com/Saccharine1211)

## Pitch Deck
[Link](https://docs.google.com/presentation/d/19MYsPnsBmzkGFyNUTa4zDzi1xr6bn3gNZ3Zdr_A8wf4/edit?usp=sharing)

## Demo Video
[![YouTube 동영상](https://img.youtube.com/vi/8zTOrLBJe2U/0.jpg)](https://www.youtube.com/watch?v=8zTOrLBJe2U)

## Screenshots
![KakaoTalk_20231201_051048046](https://github.com/Project-morimori/TTM/assets/66289619/2ce065b0-d82b-460e-9edc-b77514da5e27)

## References
- [metamask login implementation citation](https://github.com/kirannonstop/metamask_login_flutter/tree/master)
