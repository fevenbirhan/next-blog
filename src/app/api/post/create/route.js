import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser, auth } from '@clerk/nextjs/server';

export const POST = async (req) => {
   
   try {
     await connect();

     const { userId } = await auth();
     if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
     }
    
     const user = await currentUser();
     const data = await req.json();
     
     if (
       !user ||
       user.publicMetadata.userMongoId !== data.userMongoId ||
       user.publicMetadata.isAdmin !== true
     ) {
       return new Response('Unauthorized', {
         status: 401,
       });
     }
     const slug = data.title
       .split(' ')
       .join('-')
       .toLowerCase()
       .replace(/[^a-zA-Z0-9-]/g, '');
     const newPost = await Post.create({
       userId: user.publicMetadata.userMongoId,
       content: data.content,
       title: data.title,
       image: data.image,
       category: data.category,
       slug,
     });
     return new Response(JSON.stringify(newPost), {
       status: 200,
     });
    } catch (error) {
     console.log('Error creating post:', error);
     return new Response('Error creating post', {
       status: 500,
     });
    }
};