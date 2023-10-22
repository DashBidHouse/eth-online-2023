const hre = require('hardhat');

import { FullPolicyEscalationManagerEthers__factory } from '@uma/contracts-node';

const { getContractFactory } = hre.ethers;

const { getAddress } = require('@uma/contracts-node');

async function main() {
  console.log('Running FullPolicyEscalationManager Deployments🔥');

  const networkId = Number(await hre.getChainId());

  const optimisticOracleV3 = getAddress('OptimisticOracleV3', networkId);

  const fullPolicyEscalationManagerFactory: FullPolicyEscalationManagerEthers__factory = await getContractFactory('FullPolicyEscalationManager');

  const fullPolicyEscalationManager = await fullPolicyEscalationManagerFactory.deploy(optimisticOracleV3);

  console.log('Deployed FullPolicyEscalationManager: ', fullPolicyEscalationManager.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
