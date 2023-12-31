// @ts-ignore
import * as fcl from '@onflow/fcl'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

export const subscribeTxStatus = (transactionId: string, onClose: () => void) => {
    const loaderId = toast.loading('Transaction in process...')
    console.log('Transaction ID: ', transactionId)
    fcl.tx(transactionId).subscribe((res: any) => {      
        console.log('Transaction status: ', res)    
        if (res?.statusString === "SEALED") {
            if (res?.errorMessage === "") {
                toast.dismiss(loaderId)
                toast.success('Transaction sealed')
            } else {
                toast.dismiss(loaderId)
                toast.error(res?.errorMessage)
            }
        } else if (res?.statusString === "EXECUTED") {
            if (res?.errorMessage === "") {
                toast.success('Transaction executed')
            } else {
                toast.dismiss(loaderId)
                toast.error(res?.errorMessage)
            }
        } else if (res?.statusString === "PENDING") {
            toast.success('Transaction pending')
        } else if (res?.statusString === "EXPIRED") {
            toast.error('Transaction expired')
        } 
    })
}