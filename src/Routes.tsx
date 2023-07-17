import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExploreDashboard from './pages/ExploreDashboard'
import ExploreBasket from './pages/ExploreBasket'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/'
                Component={ExploreDashboard}
            />
            <Route 
                path='/basket'
                Component={ExploreBasket}
            />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes