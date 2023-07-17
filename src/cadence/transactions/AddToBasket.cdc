import BasketTokenV2 from 0xf88c87364f7f298e

transaction (tokenIdentifier: String, 
            tokenName: String,
            tokenContratName: String,
            tokenAddress: Address,
            tokenSymbol: String,
            vaultPath: String,
            receiverPath: String,
            balancePath: String) {
    // Let's check that the account has a collection
    prepare(acct: AuthAccount) {
        let basketRef = acct.borrow<&BasketTokenV2.Admin>(from: BasketTokenV2.AdminPath) ?? panic("Admin Resource is not present")
        let token : BasketTokenV2.TokenInfo = BasketTokenV2.TokenInfo(
            tokenIdentifier: tokenIdentifier, 
            tokenName: tokenName,
            tokenContratName: tokenContratName,
            tokenAddress: tokenAddress,
            tokenSymbol: tokenSymbol,
            vaultPath: vaultPath,
            receiverPath: receiverPath,
            balancePath: balancePath
        )
        basketRef.addToken(identifier: tokenIdentifier, tokenInfo: token)
    }
}
 