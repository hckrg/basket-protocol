import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExploreDashboard from './pages/ExploreDashboard'
import ExploreBasket from './pages/ExploreBasket'
import CreateBasket from './pages/CreateBasket'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/'
                Component={ExploreDashboard}
            />
            <Route 
                path='/basket/:contractName'
                Component={ExploreBasket}
            />
            <Route 
                path='/create'
                Component={CreateBasket}
            />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes