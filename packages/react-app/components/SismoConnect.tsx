import { CLAIMS } from "@/utils/claims";
import {
  SismoConnectButton,
  SismoConnectConfig,
  AuthType,
  SismoConnectResponse,
  ClaimType,
} from "@sismo-core/sismo-connect-react";
import { useEffect, useState } from "react";
import { waitForTransaction } from "@wagmi/core";
import { decodeEventLog, formatEther } from "viem";
import {
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
} from "wagmi";
import {
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  arbitrum,
  arbitrumGoerli,
  scrollTestnet,
  gnosis,
  polygon,
  polygonMumbai,
  baseGoerli,
} from "wagmi/chains";
import Airdrop from "../abis/Airdrop.json";
import { Button } from "@material-tailwind/react";
import { ethers } from "ethers";
import { useEthersProvider, useEthersSigner } from "@/utils/ethers";

export const AUTHS = [{ authType: AuthType.VAULT }];
export const CHAIN = polygonMumbai;
export const sismoConnectConfig: SismoConnectConfig = {
  appId: "0x4dbe11a1bdf9d498a84e94b120f4bccb", // replaced
  // vault: {
  //   // For development purposes insert the Data Sources that you want to impersonate here
  //   // Never use this in production
  //   impersonate: [
  //     // EVM
  //     "gigahierz.eth",
  //     "0x78344979959C9d25Beb73748269A2B5533F87a51",
  //     // Github
  //     "github:GigaHierz",
  //     // Twitter
  //     "twitter:GigaHierz",
  //     // Telegram
  //     "telegram:GigaHierz",
  //   ],
  // },
  // displayRawResponse: true,
};

export default function SismoConnect() {
  /* ********************  Defines the chain to use *************************** */
  const CHAIN = polygonMumbai;

  /* ********************  Contract Address *************************** */
  // const contractAddress = "0x692a38F2578ac99D17215B1D5305542eDc721742"; // Mumbai - impersonating
  // const contractAddress = "0xae5c8A495486fC0E14c6833f5772018976c5cD9a"; // Mumbai - not-impersonating
  const contractAddress = "0x205f24a9C61d5487d230a2791D1303D294fD2cB1"; // Mumbai - not-impersonating/ no claims

  /* ********************  Get Signer & Provider *************************** */
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  /* ***********************  Application states *************************** */
  const [userAddress, setUserAddress] = useState("");
  const [responseBytes, setResponseBytes] = useState<string>("");
  const [response, setResponse] = useState<SismoConnectResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [amountClaimed, setAmountClaimed] = useState<string>("");

  /* ***************  Wagmi hooks for wallet connection ******************** */
  const { chain } = useNetwork();
  const { isConnected, address } = useAccount({
    onConnect: async ({ address }) => address,
  });
  const { switchNetworkAsync, switchNetwork } = useSwitchNetwork();

  /* *************  Wagmi hooks for contract interaction ******************* */

  const airdrop = new ethers.Contract(
    contractAddress,
    Airdrop.abi,
    signer || provider
  );

  /* *************  Wagmi hooks for contract interaction ******************* */
  async function claimAirdrop() {
    if (!address) return;
    setError("");
    setLoading(true);
    console.log("claim");
    console.log(airdrop);

    try {
      // Switch to the selected network if not already on it
      if (chain?.id !== CHAIN.id) await switchNetworkAsync?.(CHAIN.id);
      console.log("call function");
      console.log(address);
      // console.log(responseBytes);

      const tx = await airdrop.claimWithSismo(address, responseBytes);
      console.log(tx);

      const txReceipt = tx && (await waitForTransaction({ hash: tx.hash }));
      if (txReceipt?.status === "success") {
        const mintEvent = decodeEventLog({
          abi: Airdrop.abi,
          data: txReceipt.logs[0]?.data,
          topics: txReceipt.logs[0]?.topics,
        });
        const args = mintEvent?.args as {
          value: string;
        };
        const ethAmount = formatEther(BigInt(args.value));
        setAmountClaimed(ethAmount);
      }
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }

    console.log(responseBytes);
  }, [address, isConnected, responseBytes]);

  return (
    <div>
      {!responseBytes && (
        <SismoConnectButton
          config={sismoConnectConfig}
          // request proof of Data Sources ownership (e.g EVM, GitHub, twitter or telegram)
          auths={AUTHS}
          // IN PRODUCTION
          // auths={[
          //   { authType: AuthType.VAULT },
          //   { authType: AuthType.TWITTER },
          //   { authType: AuthType.GITHUB },
          // ]}
          // request zk proof that Data Source are part of a group
          // (e.g NFT ownership, Dao Participation, GitHub commits)
          claims={CLAIMS}
          // request message signature from users.
          signature={{ message: "I vote Yes to Privacy" }}
          // retrieve the Sismo Connect Reponse from the user's Sismo data vault
          onResponseBytes={(responseBytes: string) =>
            setResponseBytes(responseBytes)
          }
          onResponse={(response: SismoConnectResponse) => setResponse(response)}
          text={"SignIn with Sismo"}
          // reponse in bytes to call a contract
          // onResponseBytes={async (response: string) => {
          //   console.log(response);
          // }}
        />
      )}

      {responseBytes && !amountClaimed && (
        <>
          <p>Chain: {chain?.name}</p>
          <p>Your airdrop destination address is: {address}</p>
          <Button
            color="deep-purple"
            disabled={loading || Boolean(error)}
            onClick={() => claimAirdrop()}
          >
            {!loading ? "Claim" : "Claiming..."}
          </Button>
        </>
      )}

      {responseBytes && amountClaimed && (
        <>
          <p>Congratulations!</p>
          <p>
            You have claimed {amountClaimed} tokens on {address}.
          </p>
        </>
      )}
    </div>
  );
}
