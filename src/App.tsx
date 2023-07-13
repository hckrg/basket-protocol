import { RecoilRoot } from 'recoil'
import AppRoutes from './Routes'

function App() {
  // for any wrappers required on the entire app
  return (
    <RecoilRoot>
      <AppRoutes />
    </RecoilRoot>
  )
}

export default App