# DashBid

ETH Online 2023 Project

[WalkTrough Video](https://www.loom.com/share/3642b5ef26954a569d00ba791b3ff223?sid=cd51734a-a613-4e2c-adab-88c95be7a4f1)

DashBid is a web3-based data dashboard marketplace, utilizing a reverse auction mechanism. Here is how it works: A data client creates an order and sets a maximum budget. Once the project is created, a 48-hour auction starts, during which data freelancers offer their prices that are below the client's max budget. After all offers are in, the client selects a freelancer based on their offer, reputation, or a combination of both. The amount equivalent to the accepted offer is locked into a smart contract, and the auction is finished. The chosen freelancer needs to submit the project by the client-defined deadline. Upon successful completion, the funds are released to the freelancer. And if there is any issue, either party can initiate a dispute resolution process.

DashBid's reverse auction mechanism offers Data Clients cost-efficient solutions, a choice from a pool of skilled analysts, and transparent pricing. For Data Freelancers, it ensures secure payment, allows them to set competitive price points based on their expertise, and aids in building a positive reputation in the marketplace. This model provides a balanced platform optimizing value for both clients and freelancers.

## Builder

- Nardos: Backend Developer
- Yuliia: PM and Data Analyst
- Lena: Smart Contract and FE

## Quick Start

To run the application locally, first clone it

```
git clone git@github.com:DashBidHouse/eth-online-2023.git
//if doesn't work try this: git clone https://github.com/DashBidHouse/eth-online-2023.git

```

next you want to install all packages with

```
// using npm
npm i

// using yarn
yarn

```

To start the application first navigate into the `package/react-app` folder

```
cd package/react-app
```

and then run the following command

```
// using npm
npm run dev

// using yarn
yarn run dev

```

make sure you have added a Wallet Connect Project ID. Otherwise the project wont start.
you can use the one in the `.envexample`

## Tech used

### FE:

- wagmi
- ethers.js
- next.js
- react

### Smart Contracts:

- OpenZepplein
- UMA Protocol
- Sismo

- UMA Protocol

## How is it build?

The application is deployed on multiple blockchain networks, including ScrollSepolia, MantleTestnet, and OptimismGoerli. Our primary objective is to facilitate seamless cross-chain payments and data transfers in the future.

Auctions (referred to as "Projects") are initiated using our Auction Factory smart contract, with each auction having a fixed duration of 48 hours. During this time frame, users can place bids in a reverse auction format, where bids should progressively decrease in value. It's essential to note that auctions can only be canceled within this initial 48-hour period.

Following the conclusion of an auction, the client is presented with offers to choose from, based on either the offered price or the reputation of the analyst. To enhance security and prevent sybil attacks, both clients and analysts must undergo verification through our Sismo system.

An analyst's reputation score is derived from their Sismo rating, which takes into account various web3 and web2 data sources. Notably, the Gitcoin passport is a key component, covering a significant portion of the verification process. Furthermore, individuals receive tokens upon successfully completing a contract, which contributes to a data group used for our platform's overall scoring system.

Once a client selects an offer, a work contract is created, utilizing UMA's Optimistic Oracle V3 for dispute resolution. This workflow is based on the Sherlock protocol template.

All data related to the auctions and work contracts are indexed and can be accessed via our subgraph.

Smart contracts have been deployed on various testnets, including optimismGoerli, MantleTestnet, and ScrollSepolia. The Auction Factory contract is now operational.

Lena H, [22. Oct 2023 at 18:07:53 (22. Oct 2023 at 18:11:04)]:
AuctionFactory:

ScrollSepolia
AuctionFactory: 0x061aDbB70d398876AeFE66ee73E8915F24404E82

Mantle: 0x487eD08169b76dB16f64E27A9512e776A2B5ecFd

Airdrop.sol: on Mumbai
0x205f24a9C61d5487d230a2791D1303D294fD2cB1

Mantle:
AuctionFactory: 0x6f8a731EFbEfE09b1875f8fAD7Ba476923DD7031

Auctions:

- '0x3bc8d17ae9aB8093f8832127FD0881ef87615eC8',
- '0x278e4eb965Db57817dca8EfB77adeAD6184b66E1',
- '0xDEb808BcfC2133CbBdBCea48d599Ac0eFF71055e'1.

## Demo

### [WalkTrough Video](https://www.loom.com/share/3642b5ef26954a569d00ba791b3ff223?sid=cd51734a-a613-4e2c-adab-88c95be7a4f1)

You can find a walk through of the application here: [WalkTrough Video](https://www.loom.com/share/3642b5ef26954a569d00ba791b3ff223?sid=cd51734a-a613-4e2c-adab-88c95be7a4f1)

### Presentation, 3 slides (~1 min)

https://docs.google.com/presentation/d/1IF76KDHXxb1DjRPNQzdVANzn3MySp-MyX0Kw3Qz7DPU/edit?usp=sharing

#### Slide1:

Title: DashBid: Revolutionizing Data Analytics
Image: Screenshot of Auction Listing Page
Text:
DashBid is a data dashboard marketplace built on a reverse auction mechanism. Anyone can place an order to develop an onchain data dashboard. When a data client creates an order, data freelancers offer their services.

#### Slide2:

Title: Reverse Auction Mechanism
Image: Picture illustrating reverse auction
Text:
The essence of DashBid is its reverse auction model. A data client sets a maximum budget for their project, and analysts propose prices below this budget. The benefits for the data client include cost efficiency, a wide choice of analysts, transparent pricing. On the other hand, data freelancers are assured of payments, have the autonomy in pricing, and can build their reputation.

#### Slide3:

Title: User Flow
Image: Schema with User Flow + Smart Contracts
Text:
Delving deeper into the process: A data client creates an order and set a maximum budget. Once the project is created, a 24-hour auction starts, during which data freelancers offer their prices that are below the client's max budget. After all offers are in, the client selects a freelancer based on their offer, reputation, or a combination of both. The amount equivalent to the accepted offer is locked into a smart contract,and the auction is finished. The chosen freelancer needs to submit the project by the client-defined deadline. Upon successful completion, the funds are released to the freelancer. And if there is any issue, either party can initiate a dispute resolution process.

### Roadmap

Our team lead Yuliia will continue working on this project. If you are interested in it, please reach out.
For updates on the progress of the project, make sure to follow [DashBid](https://x.com/dashbid_house?s=21) on Twitter.

- add DataGroup for DashBid on Sismo
- Add crosschain interaction
- Add gassless transactions
- Add staking process to the auction process
