import { useState } from 'react'
import Dashboard_Navbar from '../components/Dashboard_Navbar'
import { allTokens } from '../utils/getTokenDetails'
import { TokenIcon } from './ExploreBasket'
import ToggleSwitch from '../components/ToggleSwitch'
import TokenLogoUpload from '../components/TokenLogoUpload'
import { AllTokens, admin, adminKey } from '../utils/constants'
import * as fcl from "@onflow/fcl"
import { customTokenContract } from '../utils/customTokenContract'
import { singerAuth } from '../utils/authz'
import { CreateBasketCode } from '../cadence/transactions/CreateBasket'
import { subscribeTxStatus } from '../utils/subscribeTxStatus'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../App'

export type tokenDetails = {
    tokenName?: string,
    tokenSymbol?: string,
    tokenContractName?: string,
    tokenIcon?: string
}

function CreateBasket() {
    const [selectedTokens, setSelectedTokens] = useState<string[]>([])
    const [tokenDetails, setTokenDetails] = useState<tokenDetails>()
    const [selectedTokenValues, setSelectedTokenValues] = useState<Record<string, string>>({})

    const user = useRecoilValue(userAtom)

    const handleTokenDetailsChange = (key: keyof tokenDetails, value: string) => {
        setTokenDetails((prev) => {
            if (prev && Object.keys(prev).length)   return {...prev, [key]: value};
            else return {[key]: value}
        })
    }

    // createBasket(
    //     "Sai Index",
    //     "SAI",
    //     "SAI",
    //     user,
    //     "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/MERGE.png",
    //     '["A.e45c64ecfe31e465.stFlowToken", "A.e223d8a629e49c68.FUSD"]',
    //     '[100.0, 1.0]'
    // )
    const createBasket = async (
        basketName: string,
        basketContratName: string,
        basketSymbol: string,
        basketCreatorAddress: string,
        basketImage: string,
        underlyingTokens: string,
        underlyingTokensAmount: string
    ) => {
        const contractCode = customTokenContract(
            basketContratName,
            "0x9a0766d93b6608b7",
            underlyingTokens,
            underlyingTokensAmount
        );
        const adminAuth = singerAuth(admin, adminKey);

        console.log(contractCode);
        // Step -> 0 Create Smart Contract
        const transactionId = await fcl.mutate({
            cadence: CreateBasketCode,
            limit: 9999,
            args: (arg, t) => [
                arg(basketName, t.String),
                arg(basketContratName, t.String),
                arg(basketSymbol, t.String),
                arg(basketCreatorAddress, t.Address),
                arg(basketImage, t.String),
                arg(Buffer.from(contractCode, "utf-8").toString("hex"), t.String),
            ],
            // @ts-ignore-next-line
            payer: adminAuth,
            proposer: adminAuth,
            authorizations: [adminAuth],
        });

        console.log("Transaction Id : ", transactionId);
        subscribeTxStatus(transactionId);
    };

    console.log(tokenDetails?.tokenName!,
        tokenDetails?.tokenContractName!,
        tokenDetails?.tokenSymbol!,
        user?.addr!,
        tokenDetails?.tokenIcon!,
        '["' + selectedTokens.join('","') + '"]',
        '[' + Object.values(selectedTokenValues).map(v => Number(v).toFixed(2)).join(",") + ']')
    
    const handleRemoveToken = (token: string) => {
        const updatedSelectedTokens = selectedTokens.filter(t => t!=token)
        setSelectedTokens(updatedSelectedTokens)
        const updatedSelectedTokenValues: Record<string, string> = {}
        updatedSelectedTokens.forEach(t => { updatedSelectedTokenValues[t] = selectedTokenValues[t]})
        setSelectedTokenValues(updatedSelectedTokenValues)
    }

    return (
        <div className="flex flex-col min-h-screen items-center  bg-custom-400">
            <Dashboard_Navbar navbarShadow />
            <div className='flex flex-col items-center pb-10 md:w-2/3 w-5/6 bg-white-100 rounded-xl my-48 font-mono'>
                <div className='flex w-full justify-between items-center p-10'>
                    <div className='text-custom-600 text-2xl font-medium'>Create Basket</div>
                    <button 
                        onClick={() => createBasket(
                            tokenDetails?.tokenName!,
                            tokenDetails?.tokenContractName!,
                            tokenDetails?.tokenSymbol!,
                            user?.addr!,
                            tokenDetails?.tokenIcon!,
                            '["' + selectedTokens.join('","') + '"]',
                            '[' + Object.values(selectedTokenValues).map(v => Number(v).toFixed(2)).join(",") + ']'
                        )}
                        className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px]"
                    >
                        Publish
                    </button>
                </div>
                <hr className='bg-custom-400 w-5/6' />
                <div className='flex flex-col w-full gap-4 items-center'>
                    <div className='font-mono my-4 text-gray-600'>Add Details about the Index Token</div>
                    <div className='flex items-center justify-center w-5/6 gap-4'>
                        <div className='w-full'>Display Name: </div>
                        <input
                            placeholder="Token Name"
                            value={tokenDetails?.tokenName ?? ""}
                            onChange={(e) => handleTokenDetailsChange("tokenName", e.target.value)}
                            className="rounded-md w-full text-base px-6 py-4 focus:outline-none border-b-[1px] border-gray-200"
                        />
                    </div>
                    <div className='flex items-center w-5/6 gap-4'>
                        <div className='w-full'>Token Symbol (Preferably 3 letters): </div>
                        <input
                            placeholder="Token Symbol"
                            value={tokenDetails?.tokenSymbol ?? ""}
                            onChange={(e) => handleTokenDetailsChange("tokenSymbol", e.target.value)}
                            className="rounded-md w-full text-base px-6 py-4 focus:outline-none border-b-[1px] border-gray-200"
                        />
                    </div>
                    <div className='flex items-center justify-center w-5/6 gap-4'>
                        <div className='w-full'>Token Contract Name : </div>
                        <input
                            placeholder="Token Contract Name"
                            value={tokenDetails?.tokenContractName ?? ""}
                            onChange={(e) => handleTokenDetailsChange("tokenContractName", e.target.value)}
                            className="rounded-md w-full text-base px-6 py-4 focus:outline-none border-b-[1px] border-gray-200"
                        />
                    </div>
                    <div className='flex items-center justify-center w-5/6 gap-4'>
                        <div className='w-full'>Token Logo : </div>
                        <TokenLogoUpload onChange={(url) => handleTokenDetailsChange("tokenIcon", url)} />
                    </div>
                    <hr className='bg-custom-600 my-8 w-5/6' />
                    <div className='text-custom-600 font-medium text-lg'>Choose Underlying Tokens</div>
                    <div className='text-gray-600 text-sm'>We source tokens from increment.fi </div>
                    <div className='flex flex-col items-center w-5/6'>
                        {
                            Object.entries(AllTokens).map(([key, token]) => (
                                <div className="flex justify-between w-full py-6 px-10 ">
                                    <TokenIcon logo={token?.logo} symbol={token?.name} />
                                    <ToggleSwitch 
                                        id={token?.symbol!} 
                                        checked={selectedTokens.includes(key)}  
                                        onChange={() => selectedTokens.includes(key) ? handleRemoveToken(key) : setSelectedTokens((prev) => [...prev, key])}
                                    />
                                    {
                                        selectedTokens.includes(key) && 
                                        <input
                                            placeholder={`${token?.symbol} value`}
                                            value={selectedTokenValues[key] ?? ""}
                                            onChange={(e) => setSelectedTokenValues((prev) => ({...prev, [key]: e.target.value}))}
                                            className="rounded-md text-base px-2 focus:outline-none border-b-[1px] border-gray-200"
                                        />
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBasket