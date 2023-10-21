const { ethers, network, run } = require('hardhat');
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { addresses } from '../utils/addresses';

// npx hardhat run scripts/deploy_1Bomb.ts --network base-goerli
// npx hardhat run scripts/deploy_1Bomb.ts --network base-mainnet

async function main(hre: HardhatRuntimeEnvironment) {
  const [deployer] = await ethers.getSigners();
  if (deployer === undefined) throw new Error('Deployer is undefined.');
  const _defaultCurrency = addresses[network].uscd;
  const _optimisticOracleV3 = addresses[network]._optimisticOracleV3;

  console.log('Account balance:', (await deployer.getBalance()).toString());

  try {
    // Deploy WorkContract
    const WorkContract = await ethers.getContractFactory('WorkContract');
    const workContract = await WorkContract.deploy();
    console.log('workContract.address', workContract.address);

    // Create Auction

    await verify(workContract.address, [_defaultCurrency, _optimisticOracleV3]);
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
