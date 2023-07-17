import { config } from '@onflow/fcl'
import flowJSON from '../flow.json'
import { ACCESS_NODE_URLS } from './utils/constants'

const flowNetwork = 'testnet'

console.log('Dapp running on network:', flowNetwork)

config({
  'flow.network': flowNetwork,
  'accessNode.api': ACCESS_NODE_URLS[flowNetwork],
  'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
  'app.detail.icon': 'https://avatars.githubusercontent.com/u/50278?s=200&v=4',
  'app.detail.title': 'Twitter3'
}).load({ flowJSON })