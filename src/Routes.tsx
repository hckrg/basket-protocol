import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExploreDashboard from './pages/ExploreDashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/'
                Component={ExploreDashboard}
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