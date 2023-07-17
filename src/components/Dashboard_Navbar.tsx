import { useEffect, useState, useRef } from 'react';
import avatar from '../images/avatar.png';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../App';
import * as fcl from '@onflow/fcl'
import { getFlowBalance } from '../cadence/scripts/getFlowBalance';
import { convertToTwoDecimalPlaces } from '../utils/constants';
import flowLogo from "../images/flow.svg";

const Dashboard_Navbar = ({ navbarShadow }: { navbarShadow: boolean }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [flowBalance, setFlowBalance] = useState<string>();

  const logoutRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)
  const isCreateBasketPage = window.location.pathname == "/create"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target as Node)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    console.log("Logging Out...");
  };

  const handleShowPrice = () => {
    console.log("Showing Prices...");
  };

  useEffect(() => {
    if(user && user.loggedIn) {
      (async () => {
        const bal = await getFlowBalance(user.addr ?? "")
        setFlowBalance(bal)
      })()
    }
  }, [user])

  return (
    <>
      <div className={`flex flex-row bg-white-100 fixed top-4 rounded-2xl !w-4/6  ${navbarShadow ? 'shadow-md shadow-gray-200' : ''} z-10 bg-white w-full py-6 p-5 sm:px-9 justify-between items-center bg-custom-400`}>
        <div className="flex font-bold text-[22px] space-x-2 justify-center items-center">
          <img src={logo} alt="logo" className="w-7 h-7" />
          <div>Basket Protocol</div>
        </div>
        <div className='flex gap-2'>
        {!isCreateBasketPage && user?.loggedIn && <button onClick={() => navigate('/create')} className="bg-gray-100 text-custom-500 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px]">Create Basket</button>}
        {
          user?.loggedIn ? 
          <button onClick={() => {}} className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px]">{user.addr}</button>
          : <button onClick={async() => await fcl.authenticate()} className="bg-custom-500 text-white-100 font-bold py-2 px-6 rounded-lg cursor-pointer min-w-[140px]">Connect Wallet</button>
        }
        </div>
      </div>
      <div className="right-1 top-9 fixed flex justify-center items-center space-x-2 hover:opacity-80 cursor-pointer transition duration-200" onClick={handleImageClick}>
        <div>
          {showLogout && (
            <div className="absolute right-6 sm:right-56 rounded-lg shadow-lg my-1 border" ref={logoutRef}>
              <div className="flex space-x-2 px-2 sm:px-5 py-2 rounded-lg bg-white hover:bg-red-200 justify-center items-center">
                <div className='opacity-0 left-0 top-0 absolute sm:static sm:opacity-100' onClick={handleLogout}>Logout</div>
              </div>
            </div>
          )}
        </div>
        {
          user?.loggedIn ? <div className="flex text-gray-500 text-sm opacity-0 items-center left-0 top-0 sm:pr-8 absolute sm:opacity-100 sm:static">
           <img src={flowLogo} className="mr-2 w-8 h-8"/><p className='text-base font-bold'>{convertToTwoDecimalPlaces(flowBalance!)}</p>
          </div> : <></>

        }
      </div>
    </>
  );
};

export default Dashboard_Navbar;