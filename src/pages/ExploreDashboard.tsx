import { useState } from "react";
import Dashboard_Navbar from "../components/Dashboard_Navbar";

import book from "../images/book.svg";
import token from "../images/token.svg";

import { allTokens, getTokenBySymbol } from "../utils/getTokenDetails";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
const investmentThemes = [
  {
    title: "Fungible Token Sets",
    subTitle: "Invest in FT Token sets",
    id: 1,
  },
  {
    title: "NFT Sets",
    subTitle: "Coming soon",
    id: 2,
  },
];

type TokenDetails = {
  name: string;
  underlyingTokens: string[];
  symbol: string;
  image: string;
  supply: string;
  company: string;
};
function ExploreDashboard() {
  const [selectedId, setSelectedId] = useState(1);
  return (
    <div className="flex flex-col items-center bg-custom-400">
      <Dashboard_Navbar navbarShadow />
      <div className="flex flex-col items-center w-4/6 mt-40">
        <div className="text-custom-600 mb-14 font-semibold text-2xl ">
          Explore Baskets and Products created on Basket Protocol
        </div>
        <div className="flex w-full text-sm gap-8 m-auto">
          {investmentThemes.map((theme) => (
            <ThemeCard
              {...theme}
              onClick={(id: number) => setSelectedId(id)}
              selected={theme.id == selectedId}
            />
          ))}
        </div>
        <div className="flex flex-col w-full bg-white border-[1px] gap-y-12 border-gray-100 bg-white-100 p-10 my-12 rounded-2xl text-sm">
          <input
            placeholder="Search token by name"
            className="rounded-full w-1/3 text-base px-6 py-4 focus:outline-none bg-gray-50 border-[1px] border-gray-200"
          />
          <div className="border-[1px] w-full border-gray-100 rounded-md">
            <div className="flex w-full p-4 text-gray-400">
              <p className="w-2/6">Name</p>
              <p className="w-2/6">Symbol</p>
              <p className="w-1/6">Supply</p>
              <p className="w-1/6">Creator</p>
            </div>
            {allTokens.map((token) => (
              <TokenDetailCard tokenDetails={token} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type ThemeCardProps = {
  title: string;
  subTitle: string;
  id: number;
  selected: boolean;
  onClick: (id: number) => void;
};

const ThemeCard = ({
  title,
  subTitle,
  id,
  selected = id == 0,
  onClick,
}: ThemeCardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={classNames(
        "border-[1px] h-[88px] w-[270px]  rounded-xl p-4 flex gap-3 cursor-pointer items-center",
        {
          "bg-white-100 border-custom-500": selected,
          "bg-gray-50 border-gray-600": !selected,
        }
      )}
    >
      <div
        className={classNames(
          "w-[54px] border-[1px] h-full flex items-center justify-center    rounded-md",
          {
            "border-custom-500 bg-custom-400": selected,
            "border-gray-600 bg-gray-50": !selected,
          }
        )}
      >
        <img src={selected ? token : book} />
      </div>
      <div
        className={classNames("flex flex-col", {
          "text-custom-500": selected,
          "text-gray-700": !selected,
        })}
      >
        <p className="font-medium text-[16px]">{title}</p>
        <p className="text-xs">{subTitle}</p>
      </div>
    </div>
  );
};

type TokenDetailCardProps = {
  tokenDetails: TokenDetails;
};

const TokenDetailCard = ({ tokenDetails }: TokenDetailCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <hr className="bg-gray-300" />
      <div className="flex w-full p-4 hover:scale-[1.01] hover:shadow-md hover:shadow-gray-200 text-gray-600" onClick={() => navigate("/basket")}>
        <div className="w-2/6 pl-2 flex gap-4">
          <img src={tokenDetails.image} className="h-10 w-10 rounded-full" />
          <p className="font-semibold text-gray-600">{tokenDetails.name}</p>
        </div>
        <div className="w-2/6 flex flex-col gap-4">
          <p className="font-semibold text-gray-600">{tokenDetails.symbol}</p>
          <div className="flex gap-2">
            {tokenDetails.underlyingTokens
              .map((symbol) => getTokenBySymbol(symbol))
              .map((token) => (
                <TokenIcon {...token} />
              ))}
          </div>
        </div>
        <p className="w-1/6">{tokenDetails.supply}</p>
        <p className="w-1/6">{tokenDetails.company}</p>
      </div>
    </>
  );
};

type TokenIconProps = {
  symbol?: string;
  logo?: string;
};

const TokenIcon = ({ logo, symbol }: TokenIconProps) => {
  return (
    <div className="flex items-center gap-1 text-xs">
      {logo && <img src={logo} className="h-4 w-4 rounded-full" />}
      {symbol && <p>{symbol}</p>}
    </div>
  );
};
export default ExploreDashboard;
