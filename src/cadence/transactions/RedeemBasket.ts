export const getRedeemCode = (contractName: string, adminAddress: string) => {
    return `import FungibleToken from 0x9a0766d93b6608b7
    import SwapRouter from 0x2f8af5ed05bbde0d
    import BasketTokenV2 from ${adminAddress}
    import ${contractName} from ${adminAddress}
    
    transaction(
        redeemToken: UFix64,
        amountOutMins: [UFix64],
        exactAmountIns: [UFix64],
        tokenIns: [String],
        to: Address,
        deadline: UFix64
    ) {
        prepare(userAccount: AuthAccount, adminAccount: AuthAccount) {
    
            let userRef = userAccount.borrow<&${contractName}.Vault>(from: ${contractName}.TokenVaultStoragePath) ?? panic("No Index Vault in User's Account!")
            let indexToken <- userRef.withdraw(amount: redeemToken)
    
            for i, _ in exactAmountIns {
                let amountOutMin = amountOutMins[i]
                let exactAmountIn = exactAmountIns[i]
                let tokenIn = tokenIns[i]
    
                let tokenInInfo = BasketTokenV2.getTokenInfo(identifier: tokenIn) ?? panic("Token Info Not Present")
                
                let tokenInVaultPath = tokenInInfo.vaultPath
                // Will always be FLOW Token
                let tokenOutReceiverPath = /public/flowTokenReceiver
                
                let inVaultRef = adminAccount.borrow<&FungibleToken.Vault>(from: tokenInVaultPath)
                ?? panic("Could not borrow reference to the owner's in FT.Vault")
    
                let outReceiverRef = getAccount(to).getCapability(tokenOutReceiverPath).borrow<&{FungibleToken.Receiver}>()
                ?? panic("Could not borrow receiver reference to the recipient's out FT.Vault")
    
                let exactVaultIn <- inVaultRef.withdraw(amount: exactAmountIn)
    
                let vaultOut <- SwapRouter.swapExactTokensForTokens(exactVaultIn: <-exactVaultIn,
                                                                                amountOutMin: amountOutMin,
                                                                                tokenKeyPath: [tokenIn, "A.7e60df042a9c0868.FlowToken"],
                                                                                deadline: deadline)
    
                 outReceiverRef.deposit(from: <-vaultOut)
            }   
    
            let adminRef = adminAccount.borrow<&${contractName}.Minter>(from: ${contractName}.TokenMinterStoragePath) ?? panic("No Minter in admin's account!")
            adminRef.destroyToken(token: <- indexToken)
        }
    }`
    }