import { useCallback, useEffect, useState } from "react"
import { BasketData } from "../pages/ExploreDashboard"
import { TokenIcon } from "../pages/ExploreBasket"
import { getTokenByIdentifier } from "../utils/getTokenDetails"
import { getAmountsIn } from "../cadence/scripts/getAmountsIn"
import { debounce } from "../utils/debounce"
import { admin, adminKey, getTimestamp10MinutesAfterCurrentTime } from "../utils/constants"
import { getIssueCode } from "../cadence/transactions/IssueBasket"
import * as fcl from '@onflow/fcl'
import { singerAuth, userSign } from "../utils/authz"
import { subscribeTxStatus } from "../utils/subscribeTxStatus"

export type IssueTokenModalProps = {
    onClose: () => void,
    basketDetails?: BasketData,
    type: "issue" | "redeem"
}


function IssueTokenModal({ onClose, basketDetails, type}: IssueTokenModalProps) {
    const msg = type == "issue" ? "Buy": "Redeem"
    const [value, setValue] = useState(0)
    const [totalFlow, setTotalFlow] = useState("0")

    const udTokenAmount = basketDetails?.underlyingTokens.map(u => (Number(u.amount)*value).toFixed(2))
    const udTokenAddress = basketDetails?.underlyingTokens.map(u => u.tokenIdentifier)
    const slippage = 10 // 5%
    const adminAuth = singerAuth(admin, adminKey)
        
    const calculateFlow = async() => {
        if (udTokenAddress && udTokenAmount){
            const data = await getAmountsIn(udTokenAmount, udTokenAddress)
            const totalAmount = (data.map((d: any) => Number(d)).reduce((x: any, y: any) => x + y, 0) * (100 + slippage)) / 100
            setTotalFlow(totalAmount.toFixed(2))
        }
    }

    const delayCalculateFlow = useCallback(debounce(() => {
        calculateFlow()
    }, 2000), [value, udTokenAddress, udTokenAddress]);

    useEffect(() => {
        delayCalculateFlow()
    }, [value])

    const handleIssue = async() => {
        const deadline = getTimestamp10MinutesAfterCurrentTime()
        const issueCode = getIssueCode(basketDetails?.basketContratName!, admin)
        const txId = await fcl.mutate({
            cadence: issueCode,
            limit: 9999,
            args: (arg, t) => [
                arg(value.toFixed(2), t.UFix64),
                arg(totalFlow, t.UFix64),
                arg(udTokenAmount, t.Array(t.UFix64)),
                arg(udTokenAddress, t.Array(t.String)),
                arg(admin, t.Address),
                arg(deadline.toFixed(1), t.UFix64)
            ],
            // @ts-ignore-next-line
            payer: userSign,
            proposer: userSign,
            authorizations: [userSign, adminAuth],
        })

        console.log("Transaction Id : ", txId)
        subscribeTxStatus(txId, onClose)          
    }

    return (
        <div className="bg-white-100 w-96 mx-4 p-4 rounded-xl">
            <div className="flex justify-center flex-col items-center border-b border-gray-200 py-3" >
                <div className="flex w-full px-5 items-center justify-between">
                    <p className="text-xl font-bold text-gray-800">{msg} {basketDetails?.basketSymbol}</p>
                    <div onClick={onClose} className=" hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full" > X </div>
                </div>
            </div>
            <div className=" w-full flex items-center justify-center rounded-b-lg">
                <div className="flex flex-col items-center w-5/6 gap-2 rounded-lg">
                    <input
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        placeholder={`Add number of tokens to ${msg.toLowerCase()}`}
                        type="number"
                        className="rounded-md text-base w-full px-6 py-2 mt-8 focus:outline-none bg-gray-50 border-[1px] border-gray-200"
                    />
                    <div className="font-bold text-sm text-custom-500 cursor-pointer underline self-start mt-4">Underlying tokens value</div>
                    <div className=" flex flex-col w-full">
                        {
                            basketDetails?.underlyingTokens.map(s => ({ amount: Number(s.amount) * value , token: getTokenByIdentifier(s.tokenIdentifier)})).map((t) => (
                                <div className="flex justify-between w-full py-4">
                                    <TokenIcon logo={t.token?.logo} symbol={t.token?.name} />
                                    <p>{t.amount} {t.token?.symbol}</p>
                                </div>
                            ))
                        }
                        <div className="flex justify-between w-full pt-6 ">
                            <p>Total Flow required</p>
                            <p>{totalFlow ?? 0} FLOW</p>
                        </div>
                    </div>
                    <button onClick={handleIssue} className="bg-custom-500 text-white-100 font-bold py-2 my-2 px-6 rounded-lg cursor-pointer w-full">{msg}</button>
                </div>
            </div>
        </div>
    )
}

export default IssueTokenModal