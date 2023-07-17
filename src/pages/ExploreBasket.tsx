import Dashboard_Navbar from "../components/Dashboard_Navbar"
import logo from '../assets/react.svg'
import { allTokens, getTokenBySymbol } from "../utils/getTokenDetails";
import { useNavigate } from "react-router-dom";
import { TokenDetails } from "./ExploreDashboard";
import { useState } from "react";
import IssueTokenModal from "../components/IssueModal";

function ExploreBasket() {
    const [showIssueModal, setShowIssueModal] = useState(false)
    const [showRedeemModal, setShowRedeemModal] = useState(false)

    const navigate = useNavigate()
    const data = allTokens[0]
    return (
        <>
        <div className="flex flex-col items-center  bg-custom-400">
            <Dashboard_Navbar navbarShadow />
            <div className="flex flex-col w-2/3 mt-40 h-screen bg-custom-400">
                <div onClick={() => navigate("/")} className="font-semibold text-base cursor-pointer mb-7 px-1 text-gray-400">{"<"} Back to explore</div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <img className="h-[50px] w-[50px] rounded-full mr-4" src={data.image} />
                        <div className="flex flex-col">
                            <p className="text-4xl font-medium">{data.name}</p>
                            <p className="text-gray-400 font-semibold text-2xl">{data.symbol}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowIssueModal(true)} className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px] mt-4">Buy</button>
                        <button onClick={() => setShowRedeemModal(true)} className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px] mt-4">Redeem</button>
                    </div>
                </div>
                <div className="border-[1px] w-full border-gray-200 rounded-md my-10 bg-white-100">
                    <div className="flex justify-between w-full py-4 text-sm px-10 text-gray-400">
                        <p className="">Token</p>
                        <p className="">Quantity per basket</p>
                    </div>
                    <hr className="bg-gray-200" />
                    <div className="flex justify-between w-full py-7 px-10 ">
                        <TokenIcon logo={data.image} symbol={data.name} />
                    </div>
                    <div className="py-2 px-10 bg-custom-300 text-sm font-semibold text-gray-500">
                        Underlying Tokens
                    </div>
                    {
                        data.underlyingTokens.map(s => getTokenBySymbol(s)).map((token) => (
                            <div className="flex justify-between w-full py-6 px-10 ">
                                <TokenIcon logo={token?.logo} symbol={token?.name} />
                                <p>10 {token?.symbol}</p>
                            </div>
                        ))
                    }

                </div>
                <div className="flex-col">
                    <div className="text-black-100 font-medium text-2xl mt-4">About</div>
                    <div className="w-full h-[1px] bg-gray-400 my-4"></div>
                    <p className="text-gray-500">
                        DEFI has ventured into new L2 lands! Inspired by our Layer 1 based Blue Chip & Innovation Index, this product focuses on a diversified Polygon-native asset portfolio. All DEFI portfolios are discretionarily traded using a blend of technical analysis swing trading indicators and fundamental driven factors alongside the specific token inclusion criterias for each portfolio theme.
                        Dive deeper into the methodology by visiting the official DEFI website. DEFI has ventured into new L2 lands! Inspired by our Layer 1 based Blue Chip & Innovation Index, this product focuses on a diversified Polygon-native asset portfolio. All DEFI portfolios are discretionarily traded using a blend of technical analysis swing trading indicators and fundamental driven factors alongside the specific token inclusion criterias for each portfolio theme.
                        Dive deeper into the methodology by visiting the official DEFI website
                    </p>
                </div>
            </div>
        </div>
        {showIssueModal && (
                <div>
                    <div
                        onClick={() => setShowIssueModal(false)}
                        className="absolute top-0 left-0 w-screen h-screen bg-gray-600 opacity-50"
                    ></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <IssueTokenModal type="issue" tokenDetails={data} onClose={() => setShowIssueModal(false)} />
                    </div>
                </div>
            )}
            {showRedeemModal && (
                <div>
                    <div
                        onClick={() => setShowRedeemModal(false)}
                        className="absolute top-0 left-0 w-screen h-screen bg-gray-600 opacity-50"
                    ></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <IssueTokenModal tokenDetails={data} type="redeem" onClose={() => setShowRedeemModal(false)} />
                    </div>
                </div>
            )}
        </>
    )
}


type TokenDetailCardProps = {
    tokenDetails: TokenDetails
}

const TokenDetailCard = ({ tokenDetails }: TokenDetailCardProps) => {
    return (
        <>
            <hr className="bg-gray-300" />
            <div className="flex w-full p-4 hover:scale-[1.01] hover:shadow-md hover:shadow-gray-200 text-gray-600">
                <div className="w-1/4 flex gap-4">
                    <img src={logo} className="h-6 w-6 rounded-full" />
                    <p className="font-semibold text-gray-600">{tokenDetails.name}</p>
                </div>
                <div className="w-1/4 flex flex-col gap-4">
                    <p className="font-semibold text-gray-600">{tokenDetails.symbol}</p>
                    <div className="flex gap-2 text-xs">
                        <img src={logo} className="h-2 w-2 rounded-full" />
                        <p>BTC</p>
                        <img src={logo} className="h-2 w-2 rounded-full" />
                        <p>BTC</p>
                        + 3 more
                    </div>
                </div>
                <p className="w-1/4">{tokenDetails.supply}</p>
                <p className="w-1/4">{tokenDetails.company}</p>
            </div>
        </>
    )
}

type TokenIconProps = {
    symbol?: string,
    logo?: string
}

export const TokenIcon = ({ logo, symbol }: TokenIconProps) => {
    return <div className="flex items-center gap-4 font-medium">
        {logo && <img src={logo} className="h-7 w-7 rounded-full" />}
        {symbol && <p>{symbol}</p>}
    </div>
}

export default ExploreBasket
