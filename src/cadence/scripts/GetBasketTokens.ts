export const GetBasketTokens = `
   import ProtocolBasket from 0xf88c87364f7f298e

   pub fun main(): {String: ProtocolBasket.BasketInfo} {
      let baskets =  ProtocolBasket.getBaskets()
      return baskets
   }
`
