import FungibleToken from 0x9a0766d93b6608b7

pub contract BasketTokenV2 {

  access(self) let tokens: {String: TokenInfo}
  pub let AdminPath: StoragePath

  pub struct TokenInfo {
    pub let tokenIdentifier: String
    pub let tokenName: String
    pub let tokenContratName: String
    pub let tokenAddress: Address
    pub let tokenSymbol: String
    pub let vaultPath: StoragePath
    pub let receiverPath: PublicPath
    pub let balancePath: PublicPath
   

    init(tokenIdentifier: String, tokenName: String, tokenContratName: String, tokenAddress: Address, tokenSymbol: String, vaultPath: String, receiverPath: String, balancePath: String) {
      self.tokenIdentifier = tokenIdentifier
      self.tokenName = tokenName
      self.tokenContratName = tokenContratName
      self.tokenAddress = tokenAddress
      self.tokenSymbol = tokenSymbol
      self.vaultPath = StoragePath(identifier: vaultPath)!
      self.receiverPath = PublicPath(identifier: receiverPath)!
      self.balancePath = PublicPath(identifier: balancePath)!
    }
  }


  pub resource Admin {
    pub fun addToken(identifier: String, tokenInfo: TokenInfo) {
      BasketTokenV2.tokens[identifier] = tokenInfo
    }

    pub fun removeToken(identifier: String) {
      BasketTokenV2.tokens.remove(key: identifier)
    }
  }

  pub fun getTokenInfo(identifier:String): TokenInfo? {
    return self.tokens[identifier]
  }

  pub fun getTokenInfoFromSymbol(symbol: String): TokenInfo? {
    for info in self.tokens.values {
      if info.tokenSymbol == symbol {
        return info
      }
    }
    return nil
  }

  pub fun getTokens(): {String: TokenInfo} {
    return self.tokens
  }

  init() {
    self.tokens = {}
    self.AdminPath = /storage/BasketTokenV2AdminPath
    self.account.save(<- create Admin(), to: self.AdminPath)
  }
}