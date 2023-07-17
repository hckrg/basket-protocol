import React, { useState } from 'react'
import Dashboard_Navbar from '../components/Dashboard_Navbar'
import { allTokens, getTokenBySymbol } from '../utils/getTokenDetails'
import { TokenIcon } from './ExploreBasket'
import ToggleSwitch from '../components/ToggleSwitch'

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
    const data = allTokens[0]

    const handleTokenDetailsChange = (key: keyof tokenDetails, value: string) => {
        setTokenDetails((prev) => {
            if (prev)   return {...prev, [key]: value};
            else return {[key]: value}
        })
    }

    console.log(selectedTokens, selectedTokenValues)
    
    return (
        <div className="flex flex-col min-h-screen items-center  bg-custom-400">
            <Dashboard_Navbar navbarShadow />
            <div className='flex flex-col items-center pb-10 md:w-2/3 w-5/6 bg-white-100 rounded-xl my-48 font-mono'>
                <div className='flex w-full justify-between items-center p-10'>
                    <div className='text-custom-600 text-2xl font-medium'>Create Basket</div>
                    <button onClick={() => { }} className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px]">Publish</button>
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
                    <hr className='bg-custom-600 my-8 w-5/6' />
                    <div className='text-custom-600 font-medium text-lg'>Choose Underlying Tokens</div>
                    <div className='text-gray-600 text-sm'>We source tokens from increment.fi </div>
                    <div className='flex flex-col items-center w-5/6'>
                        {
                            data.underlyingTokens.map(s => getTokenBySymbol(s)).map((token) => (
                                <div className="flex justify-between w-full py-6 px-10 ">
                                    <TokenIcon logo={token?.logo} symbol={token?.name} />
                                    <ToggleSwitch 
                                        id={token?.symbol!} 
                                        checked={selectedTokens.includes(token?.symbol!)}  
                                        onChange={() => selectedTokens.includes(token?.symbol!) ? setSelectedTokens((prev) => prev.filter(t => t!=token?.symbol)) : setSelectedTokens((prev) => [...prev, token?.symbol!])}
                                    />
                                    {
                                        selectedTokens.includes(token?.symbol!) && 
                                        <input
                                            placeholder={`${token?.symbol} value`}
                                            value={selectedTokenValues[token?.symbol!] ?? ""}
                                            onChange={(e) => setSelectedTokenValues((prev) => ({...prev, [token?.symbol!]: e.target.value}))}
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