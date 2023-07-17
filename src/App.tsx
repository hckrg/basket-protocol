import { atom, useRecoilState } from 'recoil'
import AppRoutes from './Routes'
import { useEffect } from 'react'
import * as fcl from '@onflow/fcl'

export const userAtom = atom<{loggedIn: boolean, addr?: string} | null>({
    key: 'userAtom',
    default: null
})

function App() {
  // for any wrappers required on the entire app
  const setUser = useRecoilState(userAtom)[1]

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  return (
      <AppRoutes />
  )
}

export default App