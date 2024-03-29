require('dotenv').config({ path: '.env' });
require('hardhat-deploy');
const { task } = require('hardhat/config');
require('hardhat-celo');

// This is the mnemonic used by celo-devchain
const DEVCHAIN_MNEMONIC = 'concert load couple harbor equip island argue ramp clarify fence smart topic';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: 'https://forno.celo.org',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
    mumbai: {
      url: 'https://rpc.ankr.com/polygon_mumbai',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
    },
    optimismGoerli: {
      url: 'https://optimism-goerli.publicnode.com',
      accounts: [process.env.PRIVATE_KEY],
      chainId: 420,
    },
    scrollSepolia: {
      url: 'https://sepolia-rpc.scroll.io/' || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 534351,
    },
    mantleTestnet: {
      url: 'https://rpc.testnet.mantle.xyz/' || '',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 5001,
    },
    goerli: {
      url: 'https:///eth-goerli.alchemyapi.io/v2/y6JWvczJyMCtx6wgho1QMqOrRFUoVadE',
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {
      forking: {
        url: 'https://sepolia-rpc.scroll.io/',
      },
    },
  },
  etherscan: {
    apiKey: {
      // Get it from here: https://celoscan.io/myapikey
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
      goerli: 'XFAGSFB6UXE9MFTA9AHJMGHMXI8IXRVCHW',
      optimismGoerli: 'FP31T2R7TBTXUR7SWXV8QHRCMHMGZTSKGA',
      scrollSepolia: '6I9MZN5I5QYMPQP9HS699GC6AVTF1AIXQ6',
      mumbai: 'B591PTIWMCIK4AJHVHZ8PYYA9E72EAA7UG',
      mantleTestnet: '',
    },
    customChains: [
      {
        network: 'optimismGoerli',
        chainId: 420,
        urls: {
          apiURL: 'https://api-optimistic.etherscan.io/api',
          browserURL: 'https://optimistic.etherscan.io/',
        },
      },
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia.scrollscan.com/api',
          browserURL: 'https://sepolia.scrollscan.com/',
        },
      },
      {
        network: 'mantleTestnet',
        chainId: 5001,
        urls: {
          apiURL: 'https://explorer.mantle.xyz/api',
          browserURL: 'https://explorer.mantle.xyz/',
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.8.0',
      },
      {
        version: '0.8.16',
      },
      {
        version: '0.8.20',
      },
    ],
  },
  /**
   * Named Accounts become available as variable names in scripts
   * Learn more: https://github.com/wighawag/hardhat-deploy#1-namedaccounts-ability-to-name-addresses
   */
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
  },
  typechain: {
    outDir: 'types',
    target: 'web3-v1',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('devchain-keys', 'Prints the private keys associated with the devchain', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const hdNode = hre.ethers.utils.HDNode.fromMnemonic(DEVCHAIN_MNEMONIC);
  for (let i = 0; i < accounts.length; i++) {
    const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
    console.log(`Account ${i}\nAddress: ${account.address}\nKey: ${account.privateKey}`);
  }
});

task('create-account', 'Prints a new private key', async () => {
  const wallet = new hre.ethers.Wallet.createRandom();
  console.log(`PRIVATE_KEY="` + wallet.privateKey + `"`);
  console.log(`Your account address: `, wallet.address);
});

task('print-account', 'Prints the address of the account associated with the private key in .env file', () => {
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY);
  console.log(`Account: `, wallet.address);
});
