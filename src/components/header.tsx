import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Briefcase, HomeIcon, MessagesSquare, SearchIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';

type Props = {}

const Header = (props: Props) => {
    return (
        <div className='flex items-center p-2 max-w-6xl mx-auto'>
            <Image
                className='rounded-lg'
                src='https://links.papareact.com/b3z'
                width={40}
                height={40}
                alt='logo'
            />
            <div className='flex-1'>
                <form action="" className='flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96'>
                    <SearchIcon />
                    <input className='bg-transparent flex-1 outline-none' type="text" placeholder='search' />
                </form>
            </div>

            <div className='flex items-center space-x-4 px-6'>
                <Link href='/' className='icon'>
                    <HomeIcon className='h-5' />
                    <p>Home</p>
                </Link>
                <Link href='/' className='icon hidden md:flex'>
                    <UserIcon className='h-5' />
                    <p>Network</p>
                </Link>
                <Link href='/' className='icon hidden md:flex'>
                    <Briefcase className='h-5' />
                    <p>Jobs</p>
                </Link>
                <Link href='/' className='icon'>
                    <MessagesSquare className='h-5' />
                    <p>Messaging</p>
                </Link>
            </div>

            <SignedIn>
                <UserButton/>
            </SignedIn>

            <SignedOut>
                <Button asChild>
                    <SignInButton/>
                </Button>
            </SignedOut>
        </div>
    )
}

export default Header;