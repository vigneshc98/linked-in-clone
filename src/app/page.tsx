import PostForm from "@/components/postForm";
import UserInformation from "@/components/userInformation";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { Post } from "../../mongodb/models/post";
import connnectDB from "../../mongodb/db";
import PostFeed from "@/components/postFeed";

export default async function Home() {
  await connnectDB();
  const posts = await Post.getAllPosts();

  return (
    <div className="grid grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
        <UserInformation/>
      </section>

      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto w-full">
        <SignedIn>
          <PostForm/>
        </SignedIn>

        <PostFeed posts={posts}/>
      </section>

      <section className="hidden xl:inline justify-center col-span-2">
        
      </section>
    </div>
  );
}
