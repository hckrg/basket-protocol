import * as fcl from "@onflow/fcl";

export const getAmountsIn = async (udTokenAmount: string[], udTokenAddress: string[]) => {
    const code = `import SwapRouter from 0x2f8af5ed05bbde0d

    pub fun main(inToken:String, exactAmountOut: [UFix64], outToken: [String]): [UFix64] {
        let amounts: [UFix64] = []
        for index, _ in outToken {
            let amount: UFix64 = SwapRouter.getAmountsIn(amountOut: exactAmountOut[index], tokenKeyPath: [inToken, outToken[index]])[0]
            amounts.append(amount)
        } 
        
        return amounts
    }`
    const inToken = "A.7e60df042a9c0868.FlowToken"
    const data = await fcl.query({
            cadence: code,
            args: (arg, t) => [
                arg(inToken, t.String),
                arg(udTokenAmount, t.Array(t.UFix64)),
                arg(udTokenAddress, t.Array(t.String))]
    })
    console.log(data)
    return data
}
