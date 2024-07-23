import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import connnectDB from "../../../../../../mongodb/db";
import { Post } from "../../../../../../mongodb/models/post";

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

        await post.unLikePost(user.id);

        return NextResponse.json({message: "Post unLiked successfully"});
    } catch (error) {
        return NextResponse.json(
            {error: 'An error occured while fetching posts'},
            {status: 500}
        );
    }
}