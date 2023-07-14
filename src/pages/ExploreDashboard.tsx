import { useState } from "react"
import Dashboard_Navbar from "../components/Dashboard_Navbar"
import logo from '../assets/react.svg'
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
        underlyingTokens: ["BTC", "ETH", "+3 more"],
        supply: "2.5",
        company: "Moonrock",
    },
    {
        name: "JPG Index",
        symbol: "JPG",
        underlyingTokens: ["ETH", "LTC", "XRP"],
        supply: "1.8",
        company: "Company 2",
    },
    {
        name: "Metaverse Backed",
        symbol: "META",
        underlyingTokens: ["BTC", "ETH", "LTC"],
        supply: "3.2",
        company: "Company 3",
    },
    {
        name: "DEFI BULLS",
        symbol: "DFIB",
        underlyingTokens: ["BTC", "ETH", "XRP"],
        supply: "2.1",
        company: "Company 4",
    },
    {
        name: "Climate preserving",
        symbol: "CLI",
        underlyingTokens: ["ETH", "LTC", "+2 more"],
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
function ExploreDashboard() {
    const [selectedId, setSelectedId] = useState(1)
    return (
        <div className="flex flex-col items-center bg-green-50">
            <Dashboard_Navbar navbarShadow />
            <div className="flex flex-col items-center w-5/6 mt-40">
                <div className="flex w-full text-sm gap-8 m-auto">
                    {
                        investmentThemes.map(theme => (<ThemeCard {...theme} onClick={(id: number) => setSelectedId(id)} selected={theme.id == selectedId} />))
                    }
                </div>
                <div className="flex flex-col w-full bg-white border-[1px] border-gray-100 rounded-md px-10 py-16 my-16 text-sm">
                    <input placeholder="Search token by name" className="rounded-full w-1/3 px-6 py-4 mb-6 focus:outline-none bg-gray-100 border-[1px] border-gray-200"/>
                    <div className="border-[1px] w-full border-gray-400 rounded-md">
                        <div className="flex w-full p-4 text-gray-400">
                            <p className="flex-grow">Name</p>
                            <p className="flex-grow">Symbol</p>
                            <p className="flex-grow">Supply</p>
                            <p className="flex-grow">Manager</p>
                        </div>
                        {
                            data.map(token => (<TokenDetailCard tokenDetails={token} />))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


type ThemeCardProps = {
    title: string,
    subTitle: string,
    id: number,
    selected: boolean,
    onClick: (id: number) => void
}

const ThemeCard = ({ title, subTitle, id, selected, onClick }: ThemeCardProps) => {
    return <div onClick={() => onClick(id)} className="border-[1px] flex-grow border-gray-400 rounded-xl p-6 flex gap-3 cursor-pointer">
        <div className="h-8 w-8 border-[1px] border-gray-700 rounded-md">D</div>
        <div className="flex flex-col">
            <p className="font-medium">{title}</p>
            <p>{subTitle}</p>
        </div>
    </div>
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
export default ExploreDashboard