
export type IssueTokenModalProps = {
    onClose: () => void,
    tokenDetails?: {
        name: string;
        symbol: string;
        image: string;
        underlyingTokens: string[];
        supply: string;
        company: string;
    },
    type: "issue" | "redeem"
}


function IssueTokenModal({ onClose, tokenDetails, type}: IssueTokenModalProps) {
    const msg = type == "issue" ? "Mint": "Redeem"
    return (
        <div className="bg-white-100 w-96 mx-4 p-4 rounded-xl">
            <div className="flex justify-center flex-col items-center border-b border-gray-200 py-3" >
                <div className="flex w-full px-5 items-center justify-between">
                    <p className="text-xl font-bold text-gray-800">{msg} {tokenDetails?.name}</p>
                    <div onClick={onClose} className=" hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full" > X </div>
                </div>
            </div>
            <div className=" w-full flex items-center justify-center rounded-b-lg">
                <div className="flex flex-col items-center w-5/6 gap-2 rounded-lg">
                    <input
                        placeholder={`Add number of tokens to ${msg.toLowerCase()}`}
                        type="number"
                        className="rounded-md text-base w-full px-6 py-2 mt-8 focus:outline-none bg-gray-50 border-[1px] border-gray-200"
                    />
                    {/* <div className="font-bold text-sm text-custom-500 cursor-pointer underline self-start">underlying tokens</div> */}
                    <button onClick={() => { }} className="bg-custom-500 text-white-100 font-bold py-2 my-2 px-6 rounded-lg cursor-pointer w-full">{msg}</button>
                </div>
            </div>
        </div>
    )
}

export default IssueTokenModal