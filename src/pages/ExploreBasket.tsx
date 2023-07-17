import Dashboard_Navbar from "../components/Dashboard_Navbar"
import logo from '../assets/react.svg'
import { getTokenBySymbol } from "../utils/getTokenDetails";
const investmentThemes = [
    {
        title: "Thematic Exposure",
        subTitle: "Built around a single theme",
        id: 1
    },
    {
        title: "Thematic Exposure",
        subTitle: "Built around a single theme",
        id: 2
    },
    {
        title: "Thematic Exposure",
        subTitle: "Built around a single theme",
        id: 3
    }
]



const data = [
    {
        name: "DEfi Pulse Index",
        symbol: "DFI",
        underlyingTokens: ["FLOW", "FUSD", "OT", "DUST"],
        supply: "2.5",
        company: "Moonrock",
    },
    {
        name: "JPG Index",
        symbol: "JPG",
        underlyingTokens: ["FLOW", "FUSD", "OT", "DUST"],
        supply: "1.8",
        company: "Company 2",
    },
    {
        name: "Metaverse Backed",
        symbol: "META",
        underlyingTokens: ["FLOW", "FUSD", "OT", "DUST"],
        supply: "3.2",
        company: "Company 3",
    },
    {
        name: "DEFI BULLS",
        symbol: "DFIB",
        underlyingTokens: ["FLOW", "FUSD", "OT", "DUST"],
        supply: "2.1",
        company: "Company 4",
    },
    {
        name: "Climate preserving",
        symbol: "CLI",
        underlyingTokens: ["FLOW", "FUSD", "OT", "DUST"],
        supply: "1.6",
        company: "Company 5",
    },
];

type TokenDetails = {
    name: string,
    underlyingTokens: string[],
    symbol: string,
    supply: string,
    company: string
}

function ExploreBasket() {
    return (
        <div className="flex flex-col items-center">
            <Dashboard_Navbar navbarShadow />
            <div className="flex flex-col w-5/6 mt-40 px-10">
                <div className="font-semibold text-xs underline cursor-pointer mb-4 text-gray-400">{"<"} Back to explore</div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <img className="h-8 w-8 rounded-full" src={logo}/>
                        <div className="flex flex-col gap-2 text-2xl">
                            <p>Defi Pulse Index</p>
                            <p className="text-gray-400">DFI</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => {}} className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px] mt-4">Buy</button>
                        <button onClick={() => {}} className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px] mt-4">Redeem</button>
                    </div>
                </div>
                    <div className="border-[1px] w-full border-gray-400 rounded-md my-10">
                        <div className="flex justify-between w-full pb-4 pt-12 text-sm px-10 text-gray-400">
                            <p className="">Token</p>
                            <p className="">Quantity per basket</p>
                        </div>
                        <hr className="bg-gray-200"/>
                        <div className="flex justify-between w-full  p-10 ">
                            <TokenIcon logo={logo} symbol={data[0].name}/>
                        </div>
                        <div className="py-2 px-10 bg-gray-200 text-sm text-gray-800">
                            underlying tokens
                        </div>
                        {
                            data[0].underlyingTokens.map(s => getTokenBySymbol(s)).map((token) => (
                                <div className="flex justify-between w-full py-6 px-10 ">
                                    <TokenIcon logo={token?.logo} symbol={token?.name}/>
                                    <p>1321.12 {token?.symbol}</p>
                                </div>
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}


type TokenDetailCardProps = {
    tokenDetails: TokenDetails
}

const TokenDetailCard = ({tokenDetails}: TokenDetailCardProps) => {
    return (
        <>
            <hr className="bg-gray-300"/>
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

const TokenIcon = ({ logo, symbol }: TokenIconProps) => {
    return <div className="flex items-center gap-4 font-medium">
        {logo && <img src={logo} className="h-7 w-7 rounded-full" />}
        {symbol && <p>{symbol}</p>}
    </div>
}

export default ExploreBasket