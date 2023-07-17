import * as fcl from "@onflow/fcl";

const code = `
      import FungibleToken from 0x9a0766d93b6608b7

      pub fun main(address: Address): UFix64 {
        let account = getAccount(address)
        let vaultRef = account.getCapability(/public/flowTokenBalance).borrow<&{FungibleToken.Balance}>()
            ?? panic("Could not borrow Balance reference")

        return vaultRef.balance
      }
`
const codeBasket = (contractName: string) => {
  return `
      import FungibleToken from 0x9a0766d93b6608b7
      import ${contractName} from 0xf88c87364f7f298e

      pub fun main(address: Address): UFix64 {
        let account = getAccount(address)
        let vaultRef = account.getCapability(/public/${contractName}Vault).borrow<&{FungibleToken.Balance}>()
            ?? panic("Could not borrow Balance reference")

        return vaultRef.balance
      }`
}

export const getFlowBalance = async (address: string) => {
    const data = await fcl.query({
        cadence: code,
        args: (arg, t) => [
          arg(address, t.Address)]
    })

    return data
}

export const getBasketBalance =  async (contractName: string, address: string) => {
  const data = await fcl.query({
      cadence: codeBasket(contractName),
      args: (arg, t) => [
        arg(address, t.Address)]
  })
  
  return data
}