import {useEffect, useState, useRef } from 'react';

const Dashboard_Navbar = ({ navbarShadow }: { navbarShadow: boolean }) => {
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`flex flex-row fixed top-0 ${navbarShadow ? 'shadow-md shadow-gray-200' : ''} z-10 bg-white w-full py-7 p-5 sm:px-9 justify-between items-center`}>
      <div className="flex font-bold text-[22px] space-x-2 justify-center items-center">
        <img src={""} alt="logo" className="w-7 h-7" />
        <div>Basket Protocol</div>
      </div>
      <div className="flex space-x-5">
        
        <div className="flex justify-center items-center space-x-2 hover:opacity-80 cursor-pointer transition duration-200" onClick={handleImageClick}>
          <div>
            <img src={""} alt="profile" className="w-11 h-11" />
            {showLogout && (
              <div className="absolute right-6 sm:right-56 rounded-lg shadow-lg my-1 border" ref={logoutRef}>
                <div className="flex space-x-2 px-2 sm:px-5 py-2 rounded-lg bg-white hover:bg-red-200 justify-center items-center">
                  {/* <HiOutlineLogout size={18} /> */}
                  logout
                  <div className='opacity-0 left-0 top-0 absolute sm:static sm:opacity-100' onClick={handleLogout}>Logout</div>  
                </div>
              </div>
            )}
          </div>
          <div className="text-gray-500 text-sm opacity-0 left-0 top-0 sm:pr-8 absolute sm:opacity-100 sm:static">
            anuragagarwal203@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Navbar;