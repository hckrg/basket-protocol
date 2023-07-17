import * as fcl from "@onflow/fcl";


export type FTDetailType = Record<string, {
   tokenIdentifier: string
   tokenName: string
   tokenContratName: string
   tokenstring: string
   tokenSymbol: string
   vaultPath: string
   receiverPath: string
   balancePath: string
}>

export const getFTDetails = async () => {
    const code = `
    import BasketTokenV2 from 0xf88c87364f7f298e

pub fun main(): {String: BasketTokenV2.TokenInfo} {
   let tokens =  BasketTokenV2.getTokens()
   return tokens
}
 `
    const data = await fcl.query({
        cadence: code
    })
    console.log(data)
    return data
}
