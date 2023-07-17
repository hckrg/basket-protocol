import { customTokenContract } from "./customTokenContract"

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
        cadence: `transaction() { prepare(acct: AuthAccount) {} execute { log("Hello, Flow!") } }`,
        limit: 9999,
        payer: signer,
        proposer: signer,
        authorizations: [signer],
    })

    console.log(transactionId)
    subscribeTxStatus(transactionId)
}