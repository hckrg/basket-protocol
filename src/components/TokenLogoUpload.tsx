import { useCallback, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { handleUploadFileToIPFS } from "../utils/uploadFileToIpfs";

interface TokenLogoUploadProps {
    onChange: (imageUrl: string) => void
}

function isValidUrl(url: string | undefined) {
    // Regular expression for matching a URL
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    
    if (!url) return false
    // Test if the URL matches the regex
    return urlRegex.test(url);
  }

const TokenLogoUpload: React.FC<TokenLogoUploadProps> = ({onChange}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState("https://assets.deform.cc/default/logo15.png")

    const handlePhotoUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            console.log("file", file)

            try {
                const ipfsImageHash = await handleUploadFileToIPFS(file, new Date().toTimeString())
                const url = `https://ipfs.io/ipfs/${ipfsImageHash}`
                console.log(url)
                setImageUrl(url)
                onChange(url)
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    //     event.preventDefault();
    //     const file = event.dataTransfer.files && event.dataTransfer.files[0];
    //     if (file) {
    //         setformImage(file);
    //     }
    // };

    const handleProfileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-full flex items-center" >
            <div
                className="h-20 w-20 bg-white rounded-full relative"
                // onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className={`h-20 w-20 rounded-full hover:opacity-80 overflow-hidden cursor-pointer`}>
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="h-20 w-20 rounded-full"
                        onClick={handleProfileClick}
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                />
            </div>
        </div>
    );
};

export default TokenLogoUpload;