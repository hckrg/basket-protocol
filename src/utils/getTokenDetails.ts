import { baseToken } from "../globalTypes"
import { tempTokens } from "./constants"

export const getTokenBySymbol = (symbol: string): baseToken | undefined => {
    return tempTokens.find((token) => token.symbol == symbol)
}