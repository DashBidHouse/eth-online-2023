export const NETWORKS = {
  scrollSepolia: {
    name: "scrollSepolia",
    network: "scrollSepolia",
    color: "#e9d0b8",
    id: 534351,
    rpcUrls: {
      public: { http: ["https://sepolia-rpc.scroll.io/"] },
      default: { http: ["https://sepolia-rpc.scroll.io/"] },
    },
    blockExplorer: "https://sepolia-blockscout.scroll.io",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
  },
  mantleTestnet: {
    name: "MantleTestnet",
    network: "mantleTestnet",
    color: "#e9d0b8",
    id: 5001,
    rpcUrls: {
      public: { http: ["https://rpc.testnet.mantle.xyz/"] },
      default: { http: ["https://rpc.testnet.mantle.xyz/"] },
    },
    blockExplorer: "https://explorer.testnet.mantle.xyz/",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
  },
};
