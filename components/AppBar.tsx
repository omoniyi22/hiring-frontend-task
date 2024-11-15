"use client"
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import Link from 'next/link';
import { toast } from 'react-toastify';

export const AppBar = () => {
    const { publicKey, signMessage, disconnect } = useWallet();

    async function clearSignInToken() {
        disconnect()
        localStorage.removeItem("token")
    }

    async function signAndSend() {
        if (publicKey) {
            try {
                const message = new TextEncoder().encode("Sign into mechanical turks")
                const signature = await signMessage?.(message);

                console.log({ signature, publicKey })

                const response = await axios.post(`${BACKEND_URL}/v1/user/signin`, {
                    signature,
                    publicKey: publicKey?.toString()
                })
                localStorage.setItem("token", response.data.token)
            } catch (error) {
                
                console.log({ error })
            }
        }
    }  

    useEffect(() => {
        signAndSend()
    }, [publicKey]);

    return (
        <div className='flex justify-between pb-2 pt-2 shadow-md'>
            <Link href="/"> <div className="text-2xl pl-4 ml-3 mt-2 flex justify-center font-bold">Labelfy</div></Link>
            <div className="text-xl pr-4">
                {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}
            </div>
        </div>
    )
}