import FungibleToken from 0x9a0766d93b6608b7

pub contract ProtocolBasket {

  access(self) let baskets: {String: BasketInfo}
  pub let AdminPath: StoragePath

  pub struct BasketInfo {
    pub let basketName: String
    pub let basketContratName: String
    pub let basketSymbol: String
    pub let basketCreatorAddress: Address
    pub let basketImage: String

    init(basketName: String, basketContratName: String, basketSymbol: String, basketCreatorAddress: Address, basketImage: String) {
      self.basketName = basketName
      self.basketContratName = basketContratName
      self.basketSymbol = basketSymbol
      self.basketCreatorAddress = basketCreatorAddress
      self.basketImage = basketImage
    }
  }
  
  pub resource Admin {
    pub fun addBasket(basketInfo: BasketInfo) {
      ProtocolBasket.baskets[basketInfo.basketContratName] = basketInfo
    }

    pub fun removeBasket(contractName: String) {
      ProtocolBasket.baskets.remove(key: contractName)
    }
  }

  pub fun getBasketInfo(contractName: String): BasketInfo? {
    return self.baskets[contractName]
  }

  pub fun getBasketInfoFromSymbol(symbol: String): BasketInfo? {
    for info in self.baskets.values {
      if info.basketSymbol == symbol {
        return info
      }
    }
    return nil
  }

  pub fun getBaskets(): {String: BasketInfo} {
    return self.baskets
  }

  init() {
    self.baskets = {}
    self.AdminPath = /storage/ProtocolBasketAdminPath
    self.account.save(<- create Admin(), to: self.AdminPath)
  }
}