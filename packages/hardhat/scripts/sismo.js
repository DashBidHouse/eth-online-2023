const { ethers, network, run } = require('hardhat');

// npx hardhat run deploy/sismo.js --network scrollSepolia
// npx hardhat run deploy/sismo.js --network mantleTestnet
// npx hardhat run deploy/sismo.js --network optimismGoerli

async function main() {
  try {
    // Deploy Simsmo Connect
    const SismoConnect = await ethers.getContractFactory('SismoConnect');
    const sismoConnect = await SismoConnect.deploy();
    console.log('sismoConnect.address', sismoConnect.address);

    // await sleep(20);
    // await verify(sismoConnect.address, []);
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
