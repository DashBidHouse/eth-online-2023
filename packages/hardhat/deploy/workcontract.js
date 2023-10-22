const { ethers, network, run } = require('hardhat');

// npx hardhat run deploy/workcontract.js --network scrollSepolia
// npx hardhat run deploy/workcontract.js --network mantleTestnet
// npx hardhat run deploy/workcontract.js --network optimismGoerli

async function main() {
  try {
    // Deploy WorkContract
    const WorkContract = await ethers.getContractFactory('WorkContract');
    const workContract = await WorkContract.deploy();
    console.log('workContract.address', workContract.address);

    // await sleep(20);
    // await verify(workContract.address, []);
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
