import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "@material-tailwind/react";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { optimismGoerli, polygonMumbai } from "viem/chains";
import { NETWORKS } from "../utils/networks";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [
    Celo,
    Alfajores,
    optimismGoerli,
    polygonMumbai,
    NETWORKS.mantleTestnet,
    NETWORKS.scrollSepolia,
  ],
  [publicProvider()]
);

const connectors = celoGroups({
  chains,
  projectId,
  appName: (typeof document === "object" && document.title) || "Your App Name",
});

const appInfo = {
  appName: "Celo Composer",
};

const wagmiConfig = createConfig({
  connectors,
  publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ThemeProvider>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#66CB9F",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          chains={chains}
          appInfo={appInfo}
          coolMode={true}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default App;
