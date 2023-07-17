import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExploreDashboard from './pages/ExploreDashboard'
import ExploreBasket from './pages/ExploreBasket'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/'
                Component={ExploreBasket}
            />
            {/* <Route 
                path='/token/:tokenId'
                Component={TokenDetails}
            />
            <Route
                path='create'
                Component={CreateToken}
            /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes