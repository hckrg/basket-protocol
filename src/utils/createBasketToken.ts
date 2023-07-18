import { customTokenContract } from "./customTokenContract"
import * as fcl from "@onflow/fcl";
import { signer } from "./authz";
// @ts-ignore
import CreateToken from "../cadence/transactions/CreateToken.cdc";

export const tokenData: Record<string, any> = {
    "A.e45c64ecfe31e465.stFlowToken.Vault": {
        receiver: "/public/stFlowTokenReceiver",
        storage: "/storage/stFlowTokenVault",
        balance: "/public/stFlowTokenBalance"
    },
    "A.a983fecbed621163.FiatToken.Vault": {
        receiver: "/public/USDCVaultReceiver",
        storage:  "/storage/USDCVault",
        balance: "/public/USDCVaultBalance",
    }
}

const createBasketToken = async () => {
    const name = "DFI"
    const underlyingTokens = '["A.e45c64ecfe31e465.stFlowToken.Vault", "A.a983fecbed621163.FiatToken.Vault"]'
    const contractCode = customTokenContract(name, "0x9a0766d93b6608b7", underlyingTokens)

     const transactionId = await fcl.mutate({
            cadence: CreateToken,
            limit: 9999,
            args: (arg, t) => [
                arg(name, t.String),
                arg(Buffer.from(contractCode, "utf-8").toString("hex"), t.String),
            ],
            // @ts-ignore-next-line
            payer: signer,
            proposer: signer,
            authorizations: [signer],
        })

    console.log(transactionId)
    //subscribeTxStatus(transactionId)
}
