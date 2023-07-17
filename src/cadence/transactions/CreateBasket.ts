export const CreateBasketCode = `import ProtocolBasket from 0xf88c87364f7f298e

transaction(basketName: String,
            basketContratName: String,
            basketSymbol: String,
            basketCreatorAddress: Address,
            basketImage: String,
            code: String) {
    prepare(acct: AuthAccount) {
        acct.contracts.add(name: basketContratName, code: code.decodeHex())
        let basketRef = acct.borrow<&ProtocolBasket.Admin>(from: ProtocolBasket.AdminPath) ?? panic("Admin Resource is not present")
        let info: ProtocolBasket.BasketInfo = ProtocolBasket.BasketInfo(
                basketName: basketName,
                basketContratName: basketContratName,
                basketSymbol: basketSymbol,
                basketCreatorAddress: basketCreatorAddress,
                basketImage: basketImage
        )
        basketRef.addBasket(basketInfo: info)
    }
}`