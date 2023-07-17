import { atom, useRecoilState } from 'recoil'
import AppRoutes from './Routes'
import { useEffect } from 'react'
import * as fcl from '@onflow/fcl'
import { FTDetailType, getFTDetails } from './cadence/scripts/GetFTDetails'

export const userAtom = atom<{loggedIn: boolean, addr?: string} | null>({
    key: 'userAtom',
    default: null
})

export const ftTokens = atom<FTDetailType>({
  key: 'ftTokens',
  default: undefined
})

function App() {
  // for any wrappers required on the entire app
  const [user, setUser] = useRecoilState(userAtom)
  const setFTTokens = useRecoilState(ftTokens)[1]

  useEffect(() => {
    (async () => {
      const data = await getFTDetails()
      setFTTokens(data)
    })()
    fcl.currentUser.subscribe(setUser)
  }, [])
  
  // TODO
  return (
      <AppRoutes />
  )
}

export default App