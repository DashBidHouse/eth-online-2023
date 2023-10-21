import { ClaimRequest, ClaimType } from "@sismo-core/sismo-connect-react";

export const CLAIMS: ClaimRequest[] = [
  {
    // Proof Of Humanity
    groupId: "0x682544d549b8a461d7fe3e589846bb7b",
    isOptional: true,
  },
  {
    // Unstoppable Domains
    groupId: "0xeee615a5efb9c0dc3e0dc266953f31aa",
    isOptional: true,
  },
  {
    // Gitcoin Passport
    groupId: "0x1cde61966decb8600dfd0749bd371f12",
    claimType: ClaimType.GTE,
    value: 15,
    isOptional: true,
  },
  {
    // ENS Domain Holders
    groupId: "0x8b64c959a715c6b10aa8372100071ca7",
    isOptional: true,
  },
];
