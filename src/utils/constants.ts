import { baseToken } from "../globalTypes";
import { singerAuth } from "./authz";

export const AllTokens: Record<any, any> = {
    "A.e45c64ecfe31e465.stFlowToken": {
        symbol: "stFlow",
        name: "st Flow Token",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.d6f80565193ad727.stFlowToken/logo.svg",
        decimals: 8,
    },
    "A.a983fecbed621163.FiatToken": {
        symbol: "USDC",
        name: "Fiat Token",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.b19436aae4d94622.FiatToken/logo.svg",
        decimals: 8,
    },
    "A.e223d8a629e49c68.FUSD": {
        symbol: "FUSD",
        name: "Flow USD",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.3c5959b568896393.FUSD/logo.svg",
        decimals: 8,
    },
    "A.40212f3e288efd03.MyToken": {
        symbol: "MY",
        name: "My Token",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.348fe2042c8a70d8.MyToken/logo.svg",

    }
}

export const tempTokens: baseToken[] = [
    {
        symbol: "FLOW",
        name: "Flow",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.1654653399040a61.FlowToken/logo.svg",
        decimals: 8,
    },
    {
        symbol: "FUSD",
        name: "Flow USD",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.3c5959b568896393.FUSD/logo.svg",
        decimals: 8,
    },
    {
        symbol: "stFlow",
        name: "st Flow Token",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.d6f80565193ad727.stFlowToken/logo.svg",
        decimals: 8,
    },
    {
        symbol: "DUST",
        name: "Flovatar ÐUST",
        logo: "http://images.flovatar.com/logo-round.png",
        decimals: 8,
    },
    {
        symbol: "USDC",
        name: "Fiat Token",
        logo: "https://cdn.jsdelivr.net/gh/FlowFans/flow-token-list@main/token-registry/A.b19436aae4d94622.FiatToken/logo.svg",
        decimals: 8,
    },
];

export const pinataTokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NTBhNDU2NS02ZjM0LTQ1YTYtYmVmOS04ZmIxMGE0NmVlN2EiLCJlbWFpbCI6ImdhdXJhdmRoYWxsYTE0OTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk2ZmUyNTE3MTViNTU4NGE0MTk1Iiwic2NvcGVkS2V5U2VjcmV0IjoiMWM1MjFiMDRiMjUyODM5MGU4MTkwNDU0NDk4MmYyNjJlMmZkY2JkNzc0YjI1YzI2YjQxM2RjM2VjODgzNzk1YSIsImlhdCI6MTY3NzQzNTY2N30.w8elVwSZ_U62af_MVKlVcawik9dQ-eLsoUVE4osqzlc"
export const pinataApiKey = "96fe251715b5584a4195"
export const pinataApiSecret = "1c521b04b2528390e81904544982f262e2fdcbd774b25c26b413dc3ec883795a"

export const ACCESS_NODE_URLS = {
    'local': 'http://localhost:8888',
    'testnet': 'https://rest-testnet.onflow.org',
    'mainnet': 'https://rest-mainnet.onflow.org'
}

export const BLOCK_EXPLORER_URLS = {
    'testnet': 'https://testnet.flowscan.org',
    'mainnet': 'https://flowscan.org'
}

export const admin = "0xf88c87364f7f298e";
export const adminKey ="88896b6ab053cba07d4835fb1bfa7db771871da5703798a03a60f1697f0771f3";

export function getTimestamp10MinutesAfterCurrentTime(): number {
    const currentTime = new Date();
    const tenMinutesLater = new Date(currentTime.getTime() + 10 * 60 * 1000); // Adding 10 minutes in milliseconds
    return Math.floor(tenMinutesLater.getTime() / 1000); // Converting to UNIX timestamp (seconds since epoch)
  }