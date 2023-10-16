import { NextResponse } from "next/server"
import Post from "@/models/Post"
import connect from "@/utils/db"

export const GET = async (request) => {
     const url = new URL(request.url)

     const username = url.searchParams.get('username')
     try {
          await connect()

          const posts = await Post.find(username && { username })

          return new NextResponse(JSON.stringify(posts), { status: 200 })

     } catch (error) {
          return new NextResponse(error, { status: 500 })
     }

}

// add new post 

export const POST = async (request) => {
     const body = await request.json()

     const post = new Post(body)
     try {
          await connect()

          await post.save()

          return new NextResponse('New post has been created', { status: 200 })

     } catch (error) {
          return new NextResponse(error, { status: 500 })
     }

}