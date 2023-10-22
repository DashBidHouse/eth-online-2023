# DashBid

ETH Online 2023 Project

DashBid is a web3-based data dashboard marketplace, utilizing a reverse auction mechanism.  Here is how it works: A data client creates an order and sets a maximum budget. Once the project is created, a 48-hour auction starts, during which data freelancers offer their prices that are below the client's max budget. After all offers are in, the client selects a freelancer based on their offer, reputation, or a combination of both. The amount equivalent to the accepted offer is locked into a smart contract, and the auction is finished. The chosen freelancer needs to submit the project by the client-defined deadline. Upon successful completion, the funds are released to the freelancer. And if there is any issue, either party can initiate a dispute resolution process.

DashBid's reverse auction mechanism offers Data Clients cost-efficient solutions, a choice from a pool of skilled analysts, and transparent pricing. For Data Freelancers, it ensures secure payment, allows them to set competitive price points based on their expertise, and aids in building a positive reputation in the marketplace. This model provides a balanced platform optimizing value for both clients and freelancers.


## Builder

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

## Tech used

## Description

```

```
## Demo
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

### Video
