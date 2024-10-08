"use client"
import Link from 'next/link';
import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygonAmoy} from 'viem/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [ polygonAmoy],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Navbar() {
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className='flex justify-between items-center min-h-20  border-b border-blue-400 w-[100%] py-1 md:px-8 px-5'>
            <div className='min-h-5 flex  justify-start items-center  '>
              <img src='/melody.png' className='flex items-center h-20 w-18 rounded-full'></img>
              <Link href='/' className='text-4xl font-bold px-1 flex flex-wrap md:flex-nowrap max-w-[30vw] text-blue-400'>Melody chain</Link>
            </div>
            <div className='flex items-center md:px-10'>
            <nav>
              <ul className="flex space-x-4 mx-2">
                <li><Link href='/Eventform' className="hover:underline text-sm md:text-base ">List your event</Link></li>
                <li><Link href='/ViewEvents' className="hover:underline text-sm md:text-base ">Book Ticket</Link></li>
                <li><Link href='/Nft_Tickets' className="hover:underline text-sm md:text-base ">Your Tickets</Link></li>
              </ul>
            </nav>
              <ConnectButton />
              <a href='./SignUp.js'>
              <div className='flex items-center ml-4'>
                <img src='https://cdn-icons-png.flaticon.com/128/3177/3177440.png' alt='Profile Logo' className='w-10 h-10 rounded-full border border-gray-300' />
              </div>
              </a>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}