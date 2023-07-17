import * as fcl from "@onflow/fcl";

export const GetUnderlyingTokens = (contractName: string) => {
return `
import ${contractName} from 0xf88c87364f7f298e

pub struct UnderLyingTokenData {
    pub let tokenIdentifier: String
    pub let amount: UFix64

    init(tokenIdentifier: String, amount: UFix64) {
      self.tokenIdentifier = tokenIdentifier
      self.amount = amount
    }
}

pub fun main(): [UnderLyingTokenData] {
    let tokens = ${contractName}.getUnderlyingTokens()
    let amounts =  ${contractName}.getUnderlyingTokensAmount()

    let data: [UnderLyingTokenData] = []
    for i, _ in tokens {
        let d = UnderLyingTokenData(tokenIdentifier :tokens[i], amount: amounts[i])
        data.append(d)
    }

    return data
}
`
}

export const getUnderlyingTokensData = async (contractName: string) => {
    const data = await fcl.query({
        cadence: GetUnderlyingTokens(contractName)
    })

    return data
}