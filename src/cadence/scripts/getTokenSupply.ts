import * as fcl from "@onflow/fcl";

export const getTokenTotalSupply = async (contractName: string, adminAddress: string) => {
    const code = `
        import ${contractName} from ${adminAddress}

        pub fun main(): UFix64 {
            return ${contractName}.totalSupply
        }
    `
    const data = await fcl.query({
        cadence: code
    })

    return data
}