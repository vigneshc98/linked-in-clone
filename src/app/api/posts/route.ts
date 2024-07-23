import { NextResponse } from "next/server";
import connnectDB from "../../../../mongodb/db";
import { IPostBase, Post } from "../../../../mongodb/models/post";
import { auth } from "@clerk/nextjs/server";
import { IUser } from "../../../../types/user";


export async function GET(request: Request) {
    try {
        await connnectDB();
        const posts = await Post.getAllPosts();
        return NextResponse.json({posts});
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}

export interface AddPostRequestBody {
    user: IUser;
    text: string;
    imageUrl?: string | null;
}

export async function POST(request: Request) {
    auth().protect(); //protect the route with clerk authentication

    try {
        await connnectDB();
        const {user, text, imageUrl} : AddPostRequestBody = await request.json();
        
        const postData: IPostBase = {
            user,
            text,
            ...(imageUrl && {imageUrl})
        };
        const post = await Post.create(postData);
        return NextResponse.json({message: "Post created successfully", post});
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}