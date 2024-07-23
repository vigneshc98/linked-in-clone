"use server"

import { currentUser } from "@clerk/nextjs/server"
import { IUser } from "../types/user";
import { Post } from "../mongodb/models/post";
import { revalidatePath } from "next/cache";

export default async function createPostAction(formData: FormData){
    const user = await currentUser();
    
    if(!user){
        throw new Error("User not authenticated");
    }
    const postInput = formData.get('postInput') as string;
    const image = formData.get('image') as File;
    let imageUrl: string | undefined;

    if(!postInput){
        throw new Error('post input is required');
    }

    //define user
    const userDB: IUser = {
        userId: user.id,
        userImage: user.imageUrl,
        firstName: user.firstName || "",
        lastName: user.lastName || ""
    }

    try {
        if(image.size > 0){
            //1. upload image to cloud
            //2. create a post in db with image
            const body = {
                user: userDB,
                text: postInput,
                imageUrl: "https://images.pexels.com/photos/7762974/pexels-photo-7762974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            await Post.create(body);
        }else{
            //1. create a post in db
            const body = {
                user: userDB,
                text: postInput
            }
            await Post.create(body);
        }
        revalidatePath("/");
    } catch (error: any) {
        console.log(error);
        
        throw new Error("Failed to create Post", error);
    }
}