import { NextResponse } from "next/server";
import connnectDB from "../../../../../mongodb/db";
import { Post } from "../../../../../mongodb/models/post";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request, {params} : {params : {post_id: string}}){
    try {
        await connnectDB();
        const post = await Post.findById(params.post_id);

        if(!post){
            return NextResponse.json({ error: "Post not found"}, {status: 404});
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}

export async function DELETE(request: Request, {params} : {params : {post_id: string}}){
    auth().protect();
    const user = await currentUser();
    try {
        await connnectDB();
        const post = await Post.findById(params.post_id);

        if(!post){
            return NextResponse.json({ error: "Post not found"}, {status: 404});
        }

        if(post.user.userId !== user?.id){
            return NextResponse.json({ error: "Forbidden"}, {status: 403});
        }

        await post.removePost();

        return NextResponse.json({message: "Post deleted successfully"});
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}