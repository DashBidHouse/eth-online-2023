const { ethers, network, run } = require('hardhat');

// npx hardhat run scripts/deploy_1Bomb.ts --network base-goerli
// npx hardhat run scripts/deploy_1Bomb.ts --network base-mainnet

async function main() {
  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));

  const [deployer] = await ethers.getSigners();
  if (deployer === undefined) throw new Error('Deployer is undefined.');
  console.log('Account balance:', (await deployer.getBalance()).toString());

  try {
    // Deploy Auction Factory
    const AuctionFactory = await ethers.getContractFactory('AuctionFactory');
    const AuctionFactory_Deployed = await AuctionFactory.deploy();
    console.log('AuctionFactory_Deployed.address', AuctionFactory_Deployed.address);

    // Create Auction

    let title = 'auction1';
    let description = 'description';
    let maxOffer = 500;
    let submissionDeadline = 3600 * 24 * 15;

    let title1 = 'auction2';
    let description1 = 'description';
    let maxOffer1 = 400;
    let submissionDeadline1 = 3600 * 24 * 16;

    let title2 = 'auction3';
    let description2 = 'description';
    let maxOffer2 = 1000;
    let submissionDeadline2 = 3600 * 24 * 15;

    await AuctionFactory_Deployed.createAuction(title, maxOffer, description, submissionDeadline);
    await AuctionFactory_Deployed.createAuction(title1, maxOffer1, description1, submissionDeadline1);
    await AuctionFactory_Deployed.createAuction(title2, maxOffer2, description2, submissionDeadline2);

    await sleep(20);
    await verify(AuctionFactory_Deployed.address, []);

    const deployedAuctions = await AuctionFactory_Deployed.getDeployedAuctions();
    console.log('deployedAuctions', deployedAuctions);

    const autionContract = await ethers.getContractAt('Auction', deployedAuctions[0]);
    console.log('autionContract.address', autionContract.address);

    await sleep(20);
    await verify(autionContract.address, [deployer.address, title, description, maxOffer, submissionDeadline, startDate, endDate]);
  } catch (err) {
    console.log('err', err);
  }
}

const verify = async (contractAddress, args) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Auction Factory  0x1d4368881855Ef7851a7caA20829b031B0202937
// Auction 0x8aec125546A5b4fAA7c9F9F4789Beb92C47fA697
