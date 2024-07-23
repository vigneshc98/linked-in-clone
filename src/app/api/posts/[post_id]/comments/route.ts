import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import connnectDB from "../../../../../../mongodb/db";
import { Post } from "../../../../../../mongodb/models/post";
import { ICommentBase } from "../../../../../../mongodb/models/comment";
import { IUser } from "../../../../../../types/user";

export async function GET(request: Request, {params} : {params : {post_id: string}}){
    try {
        await connnectDB();
        const post = await Post.findById(params.post_id);

        if(!post){
            return NextResponse.json({ error: "Post not found"}, {status: 404});
        }
        return NextResponse.json(post.getAllComments());
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}

export interface AddCommentRequestBody{
    user: IUser,
    text: string
}

export async function POST(request: Request, {params} : {params : {post_id: string}}){
    auth().protect();

    try {
        await connnectDB();
        const {user, text} : AddCommentRequestBody = await request.json();

        const post = await Post.findById(params.post_id);

        if(!post){
            return NextResponse.json({ error: "Post not found"}, {status: 404});
        }

        const comment : ICommentBase ={
            user, 
            text
        };
        await post.commentOnPost(comment);
        return NextResponse.json({message: "Comment added successfully"});
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}