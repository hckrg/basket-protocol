import { baseToken } from "../globalTypes"
import { tempTokens } from "./constants"
import index1 from "../images/index-1.svg";
import index2 from "../images/index-2.png";
import index3 from "../images/index-3.svg";
import index4 from "../images/index-4.svg";
import index5 from "../images/index-5.svg";

export const allTokens = [
    {
        name: "DEFI Pulse Index",
        symbol: "DFI",
        image: index1,
        underlyingTokens: ["FUSD", "USDC", "stFlow"],
        supply: "7",
        company: "0x1d0..18d58c",
    },
    {
        name: "JPG Index",
        symbol: "JPG",
        image: index2,
        underlyingTokens: ["FUSD", "USDC"],
        supply: "10",
        company: "0xf51..f7d9bb",
    },
    {
        name: "Metaverse Backed",
        symbol: "META",
        image: index3,
        underlyingTokens: ["USDC", "stFlow"],
        supply: "3",
        company: "0x1dc..17cf8c",
    },
    {
        name: "DEFI DAO",
        symbol: "DFID",
        image: index4,
        underlyingTokens: ["FUSD", "USDC", "stFlow"],
        supply: "1",
        company: "0x1d0..18d58c",
    },
    {
        name: "Climate Preserving",
        symbol: "CLI",
        image: index5,
        underlyingTokens: ["USDC", "FUSD", "stFlow"],
        supply: "1",
        company: "0xfe1..f7d9ee",
    },
];


export const getTokenBySymbol = (symbol: string): baseToken | undefined => {
    return tempTokens.find((token) => token.symbol == symbol)
}