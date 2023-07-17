export const getIssueCode = (contractName: string, adminAddress: string) => {
    return `
    import FungibleToken from 0x9a0766d93b6608b7
    import SwapRouter from 0x2f8af5ed05bbde0d
    import BasketTokenV2 from ${adminAddress}
    import ${contractName} from ${adminAddress}
    
    transaction(
        tokenAmount: UFix64,
        amountInMax: UFix64,
        exactAmountOuts: [UFix64],
        tokensOuts: [String],
        to: Address,
        deadline: UFix64
    ) {
        prepare(userAccount: AuthAccount, adminAccount: AuthAccount) {
            if !userAccount.getCapability<&${contractName}.Vault{FungibleToken.Receiver}>(/public/${contractName}Vault).check() {
                let vault <- ${contractName}.createEmptyVault()
                userAccount.save(<-vault, to: /storage/${contractName}Vault)
                userAccount.link<&${contractName}.Vault{FungibleToken.Receiver}>(/public/${contractName}Vault, target: /storage/${contractName}Vault)
                userAccount.link<&${contractName}.Vault{FungibleToken.Balance}>(/public/${contractName}Vault, target: /storage/${contractName}Vault)
            }
    
            for i, _ in exactAmountOuts {
                let exactAmountOut = exactAmountOuts[i]
                let tokensOut = tokensOuts[i]
                // Token In Will Always be Flow Token 
                let tokenInVaultPath = /storage/flowTokenVault
    
                let tokenOutInfo = BasketTokenV2.getTokenInfo(identifier: tokensOut) ?? panic("Token Info Not Present")
    
                // Token Out Receiver
                let tokenOutReceiverPath = tokenOutInfo.receiverPath
                
                let inVaultRef = userAccount.borrow<&FungibleToken.Vault>(from: tokenInVaultPath)
                    ?? panic("Could not borrow reference to the owner's in FT.Vault")
                /// Note: Receiver (to) should already have out FT.Vault initialized, otherwise tx reverts.
                let outReceiverRef = getAccount(to).getCapability(tokenOutReceiverPath).borrow<&{FungibleToken.Receiver}>()
                    ?? panic("Could not borrow receiver reference to the recipient's out FT.Vault")
                    
                let vaultInMax <- inVaultRef.withdraw(amount: amountInMax)
                let swapResVault <- SwapRouter.swapTokensForExactTokens(
                    vaultInMax: <-vaultInMax,
                    exactAmountOut: exactAmountOut,
                    tokenKeyPath: ["A.7e60df042a9c0868.FlowToken", tokensOut],
                    deadline: deadline
                )
                let vaultOut <- swapResVault.removeFirst()
                let vaultInLeft <- swapResVault.removeLast()
                destroy swapResVault
                
                outReceiverRef.deposit(from: <-vaultOut)
                /// Deposit any remaining input FT back
                inVaultRef.deposit(from: <-vaultInLeft)
            }
    
            let adminRef = adminAccount.borrow<&${contractName}.Minter>(from: ${contractName}.TokenMinterStoragePath) ?? panic("No Minter in admin's account!")
            let indexToken <- adminRef.mintTokens(amount: tokenAmount)
    
            let userRef = userAccount.getCapability(${contractName}.TokenVaultPublicPath).borrow<&{FungibleToken.Receiver}>() ?? panic("User Index Token Vault Not Found")
            userRef.deposit(from: <-indexToken)
        }
    }
    `
    }