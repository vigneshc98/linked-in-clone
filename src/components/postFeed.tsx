import React from 'react'
import { IPostDocument } from '../../mongodb/models/post'
import Post from './post'

const PostFeed = ({posts} : {posts: IPostDocument[]}) => {
  return (
    <div className="space-y-2 pb-20">
        {posts.map((post)=>(
            <Post key={post.id} post={post} />
        ))}
    </div>
  )
}

export default PostFeed