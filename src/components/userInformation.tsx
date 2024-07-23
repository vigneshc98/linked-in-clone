import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Button } from './ui/button';

const UserInformation = async () => {
    const user = await currentUser();

    const firstName = user?.firstName as string;
    const lastName = user?.lastName as string;
    const imageUrl = user?.imageUrl as string;

    return (
        <div className="flex flex-col justify-center items-center bg-white mr-6 rounded-lg border py-4">
            <Avatar className="h-16 w-16 mb-5">
                <AvatarImage src={user?.imageUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <SignedIn>
                <div className="text-center">
                    <p className="font-semibold">
                        {firstName} {lastName}
                    </p>

                    <p className="text-xs">
                        @{firstName}
                        {lastName}-{user?.id?.slice(-4)}
                    </p>
                </div>
            </SignedIn>

            <SignedOut>
                <div className="text-center space-y-2">
                    <p className="font-semibold">You are not signed in</p>

                    <Button asChild className="bg-[#0B63C4] text-white">
                        <SignInButton>Sign in</SignInButton>
                    </Button>
                </div>
            </SignedOut>

            <hr className="w-full border-gray-200 my-5" />

            <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-gray-400">Posts</p>
                <p className="text-blue-400">0</p>
            </div>

            <div className="flex justify-between w-full px-4 text-sm">
                <p className="font-semibold text-gray-400">Comments</p>
                <p className="text-blue-400">0</p>
            </div>
        </div>
    )
}

export default UserInformation