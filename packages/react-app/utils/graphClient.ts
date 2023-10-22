import { cacheExchange, createClient, fetchExchange } from "@urql/core";

export const graphClient = createClient({
  url: "https://thegraph.com/hosted-service/subgraph/letteldream/based-nft",
  requestPolicy: "network-only",
  fetch: fetch,
  exchanges: [cacheExchange, fetchExchange],
});
