import * as fcl from "@onflow/fcl";

export const getAmountsOut = async (udTokenAmount: string[], udTokenAddress: string[]) => {
    const code = `import SwapRouter from 0x2f8af5ed05bbde0d

    pub fun main(outToken:String, exactAmountIn: [UFix64], inToken: [String]): [UFix64] {
        let amounts: [UFix64] = []
        
        for index, _ in inToken {
            let amount: UFix64 = SwapRouter.getAmountsOut(amountIn: exactAmountIn[index], tokenKeyPath: [inToken[index], outToken])[1]
            amounts.append(amount)
        } 
        
        return amounts
    }`

    const outToken = "A.7e60df042a9c0868.FlowToken"
    const data = await fcl.query({
            cadence: code,
            args: (arg, t) => [
                arg(outToken, t.String),
                arg(udTokenAmount, t.Array(t.UFix64)),
                arg(udTokenAddress, t.Array(t.String))]
    })
    console.log(data)
    return data
}
