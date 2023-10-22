import { cacheExchange, createClient, fetchExchange } from "@urql/core";

export const graphClient = createClient({
  url: "https://api.thegraph.com/subgraphs/name/nardoshood/dashbid",
  requestPolicy: "network-only",
  fetch: fetch,
  exchanges: [cacheExchange, fetchExchange],
});
